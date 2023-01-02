{-# LANGUAGE TypeApplications #-}

-- | A node which is able to handle multiple head instances.
--
-- This "node" uses the existing `Hydra.Node` as a basic building block, providing
-- specific implementations of `Network` and `Chain` components to allow multiple
-- instances to coexist.
--
-- * All nodes share a single `TinyWallet` instance which is initialised upon startup,
--   with credentials that will also be shared among all heads.
-- * There is a single UDP port on which the server listens. All messages are dispatched
--   to the corresponding nodes according to peers' coordinates as provided by some
--   name resolution mechanism
module Hydra.Node.MultiHeaded where

import Control.Monad.Class.MonadAsync (Async, async, cancel, link)
import Control.Monad.Class.MonadSTM (
  modifyTVar',
  newEmptyTMVar,
  newTQueueIO,
  newTVarIO,
  putTMVar,
  readTQueue,
  readTVarIO,
  takeTMVar,
  writeTQueue,
 )
import Data.Aeson (decodeFileStrict)
import Data.ByteString (hGetLine, hPutStr)
import qualified Data.Map as Map
import Data.Text (unpack)
import Hydra.API.ClientInput (ClientInput)
import Hydra.API.Server (Server (..))
import Hydra.API.ServerOutput (ServerOutput)
import Hydra.Cardano.Api (Tx)
import Hydra.Chain (HeadId (HeadId))
import Hydra.Chain.Direct (initialChainState, loadChainContext, mkTinyWallet, withDirectChain)
import Hydra.HeadLogic (Environment (..), Event (ClientEvent, NetworkEvent), HeadState (..), defaultTTL)
import qualified Hydra.Ledger.Cardano as Ledger
import Hydra.Ledger.Cardano.Configuration (newGlobals, newLedgerEnv, protocolParametersFromJson, readJsonFileThrow, shelleyGenesisFromJson)
import Hydra.Logging (traceWith, withTracer)
import Hydra.Logging.Messages (HydraLog (DirectChain, Network, Node, NodeOptions))
import Hydra.Logging.Monitoring (withMonitoring)
import Hydra.Network (Host (Host), NetworkCallback)
import Hydra.Network.Message (Message)
import Hydra.Network.MultiHead (Enveloped (..), withMultiHead)
import Hydra.Network.UDP (PeersResolver, withUDPNetwork)
import Hydra.Node (HydraNode (..), chainCallback, createEventQueue, createNodeState, initEnvironment, putEvent, runHydraNode)
import Hydra.Options (RunOptions (..), cardanoLedgerGenesisFile, cardanoLedgerProtocolParametersFile, cardanoVerificationKeys)
import Hydra.Persistence (Persistence (..))
import Hydra.Prelude
import Network.Socket (AddrInfo (addrSocketType), AddrInfoFlag (AI_PASSIVE), Family (AF_INET), PortNumber, SocketOption (ReuseAddr), SocketType (Stream), accept, addrAddress, addrFamily, addrFlags, bind, defaultHints, defaultProtocol, getAddrInfo, listen, setSocketOption, socket, socketToHandle)
import System.FilePath ((<.>))
import Prelude (read)

data Remote = Remote
  { remoteId :: Text
  , cardanoVerificationKey :: FilePath
  , hydraVerificationKey :: FilePath
  , address :: Host
  }
  deriving stock (Eq, Show, Generic)
  deriving anyclass (ToJSON, FromJSON)

data Command
  = StartHead [Text] -- list parties
  | StopHead Text
  deriving stock (Eq, Show, Read)

data Result
  = HeadStarted HeadId
  | HeadStopped Text
  | NoSuchHead Text
  deriving stock (Eq, Show)

withNode :: RunOptions -> (TQueue IO (Command, TMVar IO Result) -> IO ()) -> IO ()
withNode opts action = do
  commandQueue <- newTQueueIO
  race_
    (runNode opts commandQueue)
    (action commandQueue)

runNode :: RunOptions -> TQueue IO (Command, TMVar IO Result) -> IO ()
runNode opts cmdQueue = do
  let RunOptions{verbosity, monitoringPort, host, port} = opts
  env@Environment{party} <- initEnvironment opts
  withTracer verbosity $ \tracer' -> do
    withMonitoring monitoringPort tracer' $ \tracer -> do
      traceWith tracer (NodeOptions opts)
      let RunOptions{hydraScriptsTxId, chainConfig} = opts
      -- create shared wallet
      wallet <- mkTinyWallet (contramap DirectChain tracer) chainConfig
      -- create heads heads state
      heads <- newTVarIO mempty
      -- create UDP network
      -- FIXME: this probably does not work?
      let resolver = resolvePeers heads
      let udp = withUDPNetwork (contramap Network tracer) (Host (show host) port) resolver
      let startNode net hid remotes inputQueue outputQueue = do
            -- TODO: should be already initialised with head state
            nodeState <- createNodeState IdleState{chainState = initialChainState}
            let chainConfig' = chainConfig{cardanoVerificationKeys = cardanoVerificationKey <$> remotes}
            chainContext <- loadChainContext chainConfig' party hydraScriptsTxId
            eq <- createEventQueue
            withDirectChain (contramap DirectChain tracer) chainConfig chainContext Nothing wallet (chainCallback nodeState eq) $ \chain -> do
              withMultiHead hid net (putEvent eq . NetworkEvent defaultTTL) $ \hn -> do
                withLocalAPIServer inputQueue outputQueue (putEvent eq . ClientEvent) $ \server -> do
                  let RunOptions{ledgerConfig} = opts
                  withCardanoLedger ledgerConfig $ \ledger ->
                    runHydraNode (contramap Node tracer) $
                      HydraNode{eq, hn, nodeState, oc = chain, server, ledger, env, persistence = noPersistence}
      udp callback $ \_net -> do
        runMultiHeadedNode heads (startNode udp) cmdQueue
 where
  withCardanoLedger ledgerConfig action = do
    globals <-
      newGlobals
        <$> readJsonFileThrow shelleyGenesisFromJson (cardanoLedgerGenesisFile ledgerConfig)

    ledgerEnv <-
      newLedgerEnv
        <$> readJsonFileThrow protocolParametersFromJson (cardanoLedgerProtocolParametersFile ledgerConfig)

    action (Ledger.cardanoLedger globals ledgerEnv)

  callback :: NetworkCallback (Enveloped (Message Tx)) IO
  callback = error "should never be used" -- NOTE: shoudl never be used?

resolvePeers :: TVar IO (Map HeadId MultiHeadState) -> PeersResolver IO (Enveloped (Message Tx))
resolvePeers heads Enveloped{headId} =
  maybe [] ((fmap address) . remotes) . Map.lookup headId <$> readTVarIO heads

data MultiHeadState = MultiHeadState
  { remotes :: [Remote]
  , node :: Async IO ()
  , inputQueue :: TQueue IO (ClientInput Tx)
  , outputQueue :: TQueue IO (ServerOutput Tx)
  }

runMultiHeadedNode ::
  TVar IO (Map HeadId MultiHeadState) ->
  (TVar IO (Maybe HeadId) -> [Remote] -> TQueue IO (ClientInput Tx) -> TQueue IO (ServerOutput Tx) -> IO ()) ->
  TQueue IO (Command, TMVar IO Result) ->
  IO ()
runMultiHeadedNode heads startNode cmdQueue = forever $ do
  atomically (readTQueue cmdQueue) >>= \(cmd, result) ->
    case cmd of
      StartHead peers -> do
        headIdVar <- newTVarIO Nothing
        remotes <- traverse readPeerFile peers
        inputQueue <- newTQueueIO
        outputQueue <- newTQueueIO
        node <- async $ startNode headIdVar remotes inputQueue outputQueue
        link node
        -- TODO: actually initialise Head posting a tx
        let headId = HeadId "1234"
        atomically $ do
          modifyTVar' heads $ \headsMap -> Map.insert headId MultiHeadState{remotes, node, inputQueue, outputQueue} headsMap
          putTMVar result (HeadStarted headId)
      StopHead hid -> do
        multiHeadState <- Map.lookup (HeadId $ encodeUtf8 hid) <$> readTVarIO heads
        case multiHeadState of
          Nothing -> atomically $ putTMVar result (NoSuchHead hid)
          Just MultiHeadState{node} -> do
            cancel node
            atomically $ putTMVar result (HeadStopped hid)

readPeerFile :: Text -> IO Remote
readPeerFile p =
  fromMaybe (error $ "cannot find peer file for " <> p) <$> decodeFileStrict (unpack p <.> "peer")

withLocalAPIServer :: TQueue IO (ClientInput Tx) -> TQueue IO (ServerOutput Tx) -> (ClientInput Tx -> IO ()) -> (Server Tx IO -> IO ()) -> IO ()
withLocalAPIServer inq outq commands k =
  withAsync (forever $ atomically (readTQueue inq) >>= commands) $ \_ ->
    k $ Server{sendOutput = atomically . writeTQueue outq}

noPersistence :: Persistence (HeadState Tx) IO
noPersistence =
  Persistence
    { save = const $ pure ()
    , load = pure Nothing
    }

-- * Interactive Server
runServer :: PortNumber -> TQueue IO (Command, TMVar IO Result) -> IO ()
runServer port queue = do
  print @Text $ "Starting command server on " <> show port
  sock <- socket AF_INET Stream defaultProtocol
  setSocketOption sock ReuseAddr 1
  let hints =
        defaultHints
          { addrFlags = [AI_PASSIVE]
          , addrSocketType = Stream
          , addrFamily = AF_INET
          }
  addr : _ <- getAddrInfo (Just hints) Nothing (Just $ show port)
  bind sock (addrAddress addr)
  listen sock 5
  forever $ do
    print @Text $ "Accepting connections on port " <> show port
    (clientSock, _) <- accept sock
    h <- socketToHandle clientSock ReadWriteMode
    hSetBuffering h NoBuffering
    client <- async $ interpretCommands h queue
    link client

interpretCommands :: Handle -> TQueue IO (Command, TMVar IO Result) -> IO ()
interpretCommands h queue = forever $ do
  cmd <- read . unpack . decodeUtf8 <$> hGetLine h
  putText $ "Executing command " <> show cmd
  res <- atomically $ do
    res <- newEmptyTMVar
    writeTQueue queue (cmd, res)
    pure res
  result <- atomically $ takeTMVar res
  hPutStr h (fromString (show result) <> "\n")
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE TypeApplications #-}
{-# OPTIONS_GHC -Wno-orphans #-}

module Hydra.Chain.Direct.Contract.Contest where

import Hydra.Cardano.Api
import Hydra.Prelude hiding (label)

import Data.Maybe (fromJust)

import Cardano.Api.UTxO as UTxO
import Hydra.Chain.Direct.Contract.Gen (genForParty, genHash, genMintedOrBurnedValue)
import Hydra.Chain.Direct.Contract.Mutation (
  Mutation (..),
  SomeMutation (..),
  addParticipationTokens,
  changeHeadOutputDatum,
  changeMintedTokens,
  replaceContestationDeadline,
  replaceContestationPeriod,
  replaceContesters,
  replaceParties,
  replacePolicyIdWith,
  replaceSnapshotNumber,
  replaceUtxoHash,
 )
import Hydra.Chain.Direct.Fixture (testNetworkId, testPolicyId)
import Hydra.Chain.Direct.Tx (ClosedThreadOutput (..), contestTx, mkHeadId, mkHeadOutput)
import Hydra.ContestationPeriod (ContestationPeriod, fromChain)
import qualified Hydra.Contract.HeadState as Head
import Hydra.Contract.HeadTokens (headPolicyId)
import Hydra.Crypto (HydraKey, MultiSignature, aggregate, sign, toPlutusSignatures)
import Hydra.Data.ContestationPeriod (posixFromUTCTime)
import qualified Hydra.Data.ContestationPeriod as OnChain
import qualified Hydra.Data.Party as OnChain
import Hydra.Ledger (hashUTxO)
import Hydra.Ledger.Cardano (genOneUTxOFor, genValue, genVerificationKey)
import Hydra.Ledger.Cardano.Evaluate (slotNoToUTCTime)
import Hydra.Party (Party, deriveParty, partyToChain)
import Hydra.Snapshot (Snapshot (..), SnapshotNumber)
import Plutus.Orphans ()
import Plutus.V2.Ledger.Api (BuiltinByteString, toBuiltin, toData)
import qualified Plutus.V2.Ledger.Api as Plutus
import Test.Hydra.Fixture (aliceSk, bobSk, carolSk)
import Test.QuickCheck (elements, listOf, oneof, suchThat, vectorOf)
import Test.QuickCheck.Gen (choose)
import Test.QuickCheck.Instances ()

--
-- ContestTx
--

-- | Healthy contest tx where the contester is the first one to contest and
-- correctly pushing out the deadline by the contestation period.
healthyContestTx :: (Tx, UTxO)
healthyContestTx =
  (tx, lookupUTxO)
 where
  tx =
    contestTx
      healthyContesterVerificationKey
      healthyContestSnapshot
      (healthySignature healthyContestSnapshotNumber)
      (healthySlotNo, slotNoToUTCTime healthySlotNo)
      closedThreadOutput
      (mkHeadId testPolicyId)
      healthyContestationPeriod

  headDatum = fromPlutusData $ toData healthyClosedState

  lookupUTxO = UTxO.singleton (healthyClosedHeadTxIn, healthyClosedHeadTxOut)

  closedThreadOutput =
    ClosedThreadOutput
      { closedThreadUTxO = (healthyClosedHeadTxIn, healthyClosedHeadTxOut, headDatum)
      , closedParties =
          healthyOnChainParties
      , closedContestationDeadline = posixFromUTCTime healthyContestationDeadline
      , closedContesters = []
      }

healthyClosedHeadTxIn :: TxIn
healthyClosedHeadTxIn = generateWith arbitrary 42

healthyClosedHeadTxOut :: TxOut CtxUTxO
healthyClosedHeadTxOut =
  mkHeadOutput testNetworkId testPolicyId headTxOutDatum
    & addParticipationTokens healthyParties
 where
  headTxOutDatum = toUTxOContext (mkTxOutDatum healthyClosedState)

healthyContestSnapshot :: Snapshot Tx
healthyContestSnapshot =
  Snapshot
    { number = healthyContestSnapshotNumber
    , utxo = healthyContestUTxO
    , confirmed = []
    }

healthyContestSnapshotNumber :: SnapshotNumber
healthyContestSnapshotNumber = 4

healthyContestUTxO :: UTxO
healthyContestUTxO =
  (genOneUTxOFor healthyContesterVerificationKey `suchThat` (/= healthyClosedUTxO))
    `generateWith` 42

healthyContestUTxOHash :: BuiltinByteString
healthyContestUTxOHash =
  toBuiltin $ hashUTxO @Tx healthyContestUTxO

healthyClosedState :: Head.State
healthyClosedState =
  Head.Closed
    { snapshotNumber = fromIntegral healthyClosedSnapshotNumber
    , utxoHash = healthyClosedUTxOHash
    , parties = healthyOnChainParties
    , contestationDeadline = posixFromUTCTime healthyContestationDeadline
    , contestationPeriod = healthyOnChainContestationPeriod
    , headId = toPlutusCurrencySymbol testPolicyId
    , contesters = []
    }

healthySlotNo :: SlotNo
healthySlotNo = arbitrary `generateWith` 42

healthyContestationDeadline :: UTCTime
healthyContestationDeadline =
  addUTCTime
    (fromInteger healthyContestationPeriodSeconds)
    (slotNoToUTCTime healthySlotNo)

healthyOnChainContestationPeriod :: OnChain.ContestationPeriod
healthyOnChainContestationPeriod = OnChain.contestationPeriodFromDiffTime $ fromInteger healthyContestationPeriodSeconds

healthyContestationPeriod :: ContestationPeriod
healthyContestationPeriod = fromChain healthyOnChainContestationPeriod

healthyContestationPeriodSeconds :: Integer
healthyContestationPeriodSeconds = 10

healthyClosedSnapshotNumber :: SnapshotNumber
healthyClosedSnapshotNumber = 3

healthyClosedUTxOHash :: BuiltinByteString
healthyClosedUTxOHash =
  toBuiltin $ hashUTxO @Tx healthyClosedUTxO

healthyClosedUTxO :: UTxO
healthyClosedUTxO =
  genOneUTxOFor healthyContesterVerificationKey `generateWith` 42

healthyContesterVerificationKey :: VerificationKey PaymentKey
healthyContesterVerificationKey = flip generateWith 42 $ do
  genForParty genVerificationKey <$> elements healthyParties

healthySigningKeys :: [SigningKey HydraKey]
healthySigningKeys = [aliceSk, bobSk, carolSk]

healthyParties :: [Party]
healthyParties = deriveParty <$> healthySigningKeys

healthyOnChainParties :: [OnChain.Party]
healthyOnChainParties = partyToChain <$> healthyParties

healthySignature :: SnapshotNumber -> MultiSignature (Snapshot Tx)
healthySignature number =
  aggregate [sign sk snapshot | sk <- healthySigningKeys]
 where
  snapshot = healthyContestSnapshot{number}

-- FIXME: Should try to mutate the 'closedAt' recorded time to something else
data ContestMutation
  = -- | Ensure signatures are actually checked.
    MutateSignatureButNotSnapshotNumber
  | -- | Ensure too old snapshot are not valid.
    MutateToNonNewerSnapshot
  | -- | Ensure that it's performed by a Head party
    MutateRequiredSigner
  | -- | Ensure output state is consistent with redeemer
    MutateContestUTxOHash
  | -- | Change parties stored in the state, causing multisig to fail
    MutateParties
  | -- | Change the validity interval of the transaction to a value greater
    -- than the contestation deadline
    MutateValidityPastDeadline
  | -- | Change the head policy id to test the head validators
    MutateHeadId
  | -- | Minting or burning of the tokens should not be possible in v_head apart from 'checkAbort' or 'checkFanout'
    MutateTokenMintingOrBurning
  | -- | Change the contesters to check if already contested
    MutateInputContesters
  | -- | Change the resulting contesters arbitrarily to see if they are checked
    MutateContesters
  | -- | See spec: 5.5. rule 6 -> value is preserved
    MutateValueInOutput
  | -- | Change the 'ContestationDeadline' in the 'Closed' output datum such that deadline is pushed away
    NotUpdateDeadlineAlthoughItShould
  | -- | Pushes the deadline although this is the last contest. Instead of
    -- creating another healthy case and mutate that one, this mutation just
    -- changes the starting situation so that everyone else already contested.
    -- Remember the 'healthyContestTx' is already pushing out the deadline.
    PushDeadlineAlthoughItShouldNot
  | -- | Change the contestation period to test parameters not changed in output.
    MutateOutputContestationPeriod
  deriving (Generic, Show, Enum, Bounded)

genContestMutation :: (Tx, UTxO) -> Gen SomeMutation
genContestMutation
  ( tx
    , _utxo
    ) =
    oneof
      [ SomeMutation (Just "signature verification failed") MutateSignatureButNotSnapshotNumber . ChangeHeadRedeemer <$> do
          mutatedSignature <- arbitrary :: Gen (MultiSignature (Snapshot Tx))
          pure $
            Head.Contest
              { signature = toPlutusSignatures mutatedSignature
              }
      , SomeMutation (Just "signature verification failed") MutateToNonNewerSnapshot <$> do
          mutatedSnapshotNumber <- choose (0, toInteger healthyClosedSnapshotNumber)
          pure $
            Changes
              [ ChangeInputHeadDatum $
                  healthyClosedState & replaceSnapshotNumber mutatedSnapshotNumber
              , ChangeHeadRedeemer $
                  Head.Contest
                    { signature =
                        toPlutusSignatures $
                          healthySignature (fromInteger mutatedSnapshotNumber)
                    }
              ]
      , SomeMutation (Just "signer is not a participant") MutateRequiredSigner <$> do
          newSigner <- verificationKeyHash <$> genVerificationKey
          pure $ ChangeRequiredSigners [newSigner]
      , SomeMutation (Just "too old snapshot") MutateContestUTxOHash . ChangeOutput 0 <$> do
          mutatedUTxOHash <- genHash `suchThat` ((/= healthyContestUTxOHash) . toBuiltin)
          pure $
            changeHeadOutputDatum
              (const $ healthyClosedState & replaceUtxoHash (toBuiltin mutatedUTxOHash))
              headTxOut
      , SomeMutation (Just "signature verification failed") MutateParties . ChangeInputHeadDatum <$> do
          mutatedParties <- arbitrary `suchThat` (/= healthyOnChainParties)
          pure $
            healthyClosedState & replaceParties mutatedParties
      , SomeMutation (Just "upper bound beyond contestation deadline") MutateValidityPastDeadline . ChangeValidityInterval <$> do
          lb <- arbitrary
          ub <- TxValidityUpperBound <$> arbitrary `suchThat` slotOverContestationDeadline
          pure (lb, ub)
      , -- REVIEW: There is no trace for this error. Fails due to `verifyEd25519Signature`
        SomeMutation Nothing MutateHeadId <$> do
          otherHeadId <- fmap headPolicyId (arbitrary `suchThat` (/= healthyClosedHeadTxIn))
          pure $
            Changes
              [ ChangeOutput 0 (replacePolicyIdWith testPolicyId otherHeadId headTxOut)
              , ChangeInput
                  healthyClosedHeadTxIn
                  (replacePolicyIdWith testPolicyId otherHeadId healthyClosedHeadTxOut)
                  (Just $ toScriptData healthyClosedState)
              ]
      , SomeMutation (Just "minting or burning is forbidden") MutateTokenMintingOrBurning
          <$> (changeMintedTokens tx =<< genMintedOrBurnedValue)
      , SomeMutation (Just "signer already contested") MutateInputContesters . ChangeInputHeadDatum <$> do
          let contester = toPlutusKeyHash (verificationKeyHash healthyContesterVerificationKey)
              contesterAndSomeOthers = do
                contesters <- listOf $ Plutus.PubKeyHash . toBuiltin <$> genHash
                pure (contester : contesters)
          mutatedContesters <-
            oneof
              [ pure [contester]
              , contesterAndSomeOthers
              ]
          pure $
            healthyClosedState & replaceContesters mutatedContesters
      , SomeMutation (Just "contester not included") MutateContesters . ChangeOutput 0 <$> do
          hashes <- listOf genHash
          let mutatedContesters = Plutus.PubKeyHash . toBuiltin <$> hashes
          pure $ changeHeadOutputDatum (replaceContesters mutatedContesters) headTxOut
      , SomeMutation (Just "head value is not preserved") MutateValueInOutput <$> do
          newValue <- genValue
          pure $ ChangeOutput 0 (headTxOut{txOutValue = newValue})
      , SomeMutation (Just "must push deadline") NotUpdateDeadlineAlthoughItShould . ChangeOutput 0 <$> do
          let deadline = posixFromUTCTime healthyContestationDeadline
          -- Here we are replacing the contestationDeadline using the previous so we are not _pushing it_ further
          pure $ headTxOut & changeHeadOutputDatum (replaceContestationDeadline deadline)
      , SomeMutation (Just "must not push deadline") PushDeadlineAlthoughItShouldNot <$> do
          alreadyContested <- vectorOf (length healthyParties - 1) $ Plutus.PubKeyHash . toBuiltin <$> genHash
          let contester = toPlutusKeyHash $ verificationKeyHash healthyContesterVerificationKey
          pure $
            Changes
              [ ChangeOutput 0 (headTxOut & changeHeadOutputDatum (replaceContesters (contester : alreadyContested)))
              , ChangeInputHeadDatum (healthyClosedState & replaceContesters alreadyContested)
              ]
      , SomeMutation (Just "changed parameters") MutateOutputContestationPeriod <$> do
          randomCP <- arbitrary `suchThat` (/= healthyOnChainContestationPeriod)
          pure $ ChangeOutput 0 (headTxOut & changeHeadOutputDatum (replaceContestationPeriod randomCP))
      ]
   where
    headTxOut = fromJust $ txOuts' tx !!? 0

    slotOverContestationDeadline slotNo =
      slotNoToUTCTime slotNo > healthyContestationDeadline

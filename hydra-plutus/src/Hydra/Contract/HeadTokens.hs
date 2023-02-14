{-# LANGUAGE PatternSynonyms #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeApplications #-}
{-# OPTIONS_GHC -fno-specialize #-}

-- | Minting policy for a single head tokens.
module Hydra.Contract.HeadTokens where

import PlutusTx.Prelude

import Hydra.Cardano.Api (PlutusScriptV2, PolicyId, TxIn, fromPlutusScript, scriptPolicyId, toPlutusTxOutRef, pattern PlutusScript)
import qualified Hydra.Cardano.Api as Api
import qualified Hydra.Contract.Head as Head
import qualified Hydra.Contract.HeadState as Head
import qualified Hydra.Contract.Initial as Initial
import Hydra.Contract.MintAction (MintAction (Burn, Mint))
import Plutus.Extras (wrapMintingPolicy)
import Plutus.V2.Ledger.Api (
  CurrencySymbol,
  Datum (getDatum),
  FromData (fromBuiltinData),
  MintingPolicy (getMintingPolicy),
  OutputDatum (..),
  Script,
  ScriptContext (ScriptContext, scriptContextTxInfo),
  TxInInfo (..),
  TxInfo (..),
  TxOut (..),
  TxOutRef,
  ValidatorHash,
  Value (getValue),
  mkMintingPolicyScript,
 )
import Plutus.V2.Ledger.Contexts (findDatum, ownCurrencySymbol, scriptOutputsAt)
import qualified PlutusTx
import qualified PlutusTx.AssocMap as Map

validate ::
  -- | Head validator
  ValidatorHash ->
  ValidatorHash ->
  TxOutRef ->
  MintAction ->
  ScriptContext ->
  Bool
validate initialValidator headValidator seedInput action context =
  case action of
    Mint -> validateTokensMinting initialValidator headValidator seedInput context
    Burn -> validateTokensBurning context
{-# INLINEABLE validate #-}

validateTokensMinting :: ValidatorHash -> ValidatorHash -> TxOutRef -> ScriptContext -> Bool
validateTokensMinting initialValidator headValidator seedInput context =
  traceIfFalse "minted wrong" $
    participationTokensAreDistributed currency initialValidator txInfo nParties
      && checkQuantities
      && assetNamesInPolicy == nParties + 1
      && seedInputIsConsumed
 where
  currency = ownCurrencySymbol context

  minted = getValue $ txInfoMint txInfo

  (checkQuantities, assetNamesInPolicy) = case Map.lookup currency minted of
    Nothing -> (False, 0)
    Just tokenMap ->
      foldr
        (\q (assertion, n) -> (assertion && q == 1, n + 1))
        (True, 0)
        tokenMap

  ScriptContext{scriptContextTxInfo = txInfo} = context

  nParties =
    case scriptOutputsAt headValidator txInfo of
      [(datum, _)] ->
        case datum of
          NoOutputDatum -> traceError "missing datum"
          OutputDatum _ -> traceError "unexpected inline datum"
          OutputDatumHash dh ->
            case findDatum dh txInfo of
              Nothing -> traceError "could not find datum"
              Just da ->
                case fromBuiltinData @Head.DatumType $ getDatum da of
                  Nothing -> traceError "expected commit datum type, got something else"
                  Just Head.Initial{Head.parties = parties} -> length parties
                  Just _ -> traceError "unexpected State in datum"
      _ -> traceError "expected single head output"

  seedInputIsConsumed = seedInput `elem` (txInInfoOutRef <$> txInfoInputs txInfo)

-- TODO: does this even make sense to check? Shouldn't we check that we are
-- doing an abort of fanout (terminal transitions) of the v_head? Or is this
-- even 'const True' as one need to be able to spend tokens to burn them. If we
-- only distribute them to v_initial on minting, that should be fine?
validateTokensBurning :: ScriptContext -> Bool
validateTokensBurning context =
  traceIfFalse "burnt wrong" checkAllPTsAreBurnt
 where
  -- we do not check the actual token names but only that all tokens pertaining
  -- to the currency scripts are burnt. This should work whether we are burning
  -- in Abort or FanOut transaction
  checkAllPTsAreBurnt =
    traceIfFalse "inconsistent quantity of head tokens burnt" $
      consumedHeadTokens == burnHeadTokens

  currency = ownCurrencySymbol context

  ScriptContext{scriptContextTxInfo = txInfo} = context

  minted = getValue $ txInfoMint txInfo

  consumedHeadTokens =
    foldr (\x acc -> acc + countOurTokens (txOutValue $ txInInfoResolved x)) 0 $ txInfoInputs txInfo

  countOurTokens v =
    maybe 0 sum (Map.lookup currency $ getValue v)

  burnHeadTokens =
    case Map.lookup currency minted of
      Nothing -> 0
      Just tokenMap -> negate $ sum tokenMap

participationTokensAreDistributed :: CurrencySymbol -> ValidatorHash -> TxInfo -> Integer -> Bool
participationTokensAreDistributed currency initialValidator txInfo nParties =
  case scriptOutputsAt initialValidator txInfo of
    [] -> traceIfFalse "no initial outputs for parties" $ nParties == (0 :: Integer)
    outs -> nParties == length outs && all hasParticipationToken outs
 where
  hasParticipationToken :: (OutputDatum, Value) -> Bool
  hasParticipationToken (_, val) =
    case Map.lookup currency (getValue val) of
      Nothing -> traceError "no PT distributed"
      (Just tokenMap) -> case Map.toList tokenMap of
        [(_, qty)] -> qty == 1
        _ -> traceError "wrong quantity of PT distributed"

mintingPolicy :: TxOutRef -> MintingPolicy
mintingPolicy txOutRef =
  mkMintingPolicyScript $
    $$(PlutusTx.compile [||\vInitial vHead ref -> wrapMintingPolicy (validate vInitial vHead ref)||])
      `PlutusTx.applyCode` PlutusTx.liftCode Initial.validatorHash
      `PlutusTx.applyCode` PlutusTx.liftCode Head.validatorHash
      `PlutusTx.applyCode` PlutusTx.liftCode txOutRef

mintingPolicyScript :: TxOutRef -> Script
mintingPolicyScript = getMintingPolicy . mintingPolicy

-- * Create PolicyId

-- | Resolve the head policy id (a.k.a headId) given a seed 'TxIn'.
headPolicyId :: TxIn -> PolicyId
headPolicyId =
  scriptPolicyId . PlutusScript . mkHeadTokenScript

-- | Get the applied head minting policy script given a seed 'TxIn'.
mkHeadTokenScript :: TxIn -> Api.PlutusScript
mkHeadTokenScript =
  fromPlutusScript @PlutusScriptV2 . mintingPolicyScript . toPlutusTxOutRef

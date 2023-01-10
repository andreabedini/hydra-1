{-# OPTIONS_GHC -fno-specialize #-}

module Hydra.Contract.Util where

import Hydra.Data.Party (Party, vkey)
import Plutus.V2.Ledger.Api (
  CurrencySymbol,
  TokenName (..),
  Value (getValue),
 )
import qualified PlutusTx.AssocMap as Map
import PlutusTx.Prelude

hydraHeadV1 :: BuiltinByteString
hydraHeadV1 = "HydraHeadV1"

-- | Checks that the output contains the ST token with the head 'CurrencySymbol'
-- and 'TokenName' of 'hydraHeadV1'
hasST :: CurrencySymbol -> Value -> Bool
hasST headPolicyId v =
  isJust $
    find
      (\(cs, tokenMap) -> cs == headPolicyId && hasHydraToken tokenMap)
      (Map.toList $ getValue v)
 where
  hasHydraToken tm =
    isJust $ find (\(tn, q) -> q == 1 && TokenName hydraHeadV1 == tn) (Map.toList tm)
{-# INLINEABLE hasST #-}

-- | Checks if all the PT tokens for list of parties containing specific
-- 'CurrencySymbol' are burnt.
mustBurnST :: Value -> CurrencySymbol -> Bool
mustBurnST val headCurrencySymbol =
  case Map.lookup headCurrencySymbol (getValue val) of
    Nothing -> True
    Just tokenMap ->
      case Map.lookup (TokenName hydraHeadV1) tokenMap of
        Nothing -> True
        Just v -> v == negate 1
{-# INLINEABLE mustBurnST #-}

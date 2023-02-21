Configurations to run hydra on the public testnets

Includes scripts to launch a recent enough `cardano-node`, `hydra-node` and
`hydra-tui`. Make sure they are in scope, e.g. by `cabal build hydra-node:exe:hydra-node` or using the `nix develop .#demo`.

Let's assume you want to run a simple scenario on the `preview` testnet with a single actor. If you have multiple parties, the fueling needs to be done for each party's `hydra-node` and configuration needs to be adapted accordingly below.

First start a cardano-node and see whether it synchronizes:

```sh
./cardano-node.sh preview
```

A minimal scenario would be a single actor running a hydra-node on the testnet.

Now, we need funds on the testnet and have them sent to an address owned by our `cardano-signing-key` in order to open a Hydra Head.

For `preview` we can use this faucet request:

```sh
curl -X POST -s "https://faucet.preview.world.dev.cardano.org/send-money/$(cat credentials/sebastian.cardano.address)?api_key=oochuyai3ku4Fei4ahth9ooch9ohth7d"
```

With these available we can now mark them as fuel and fork of some ADA to be committable into a hydra head. In this example we prepare some 500ADA (minus fees):

```sh
./fuel-testnet.sh preview credentials/sebastian.cardano.sk 500000000
```

Now we need to locate the Hydra scripts for the given testnet. For tagged &
released versions we will publish them on the respective [release
page](https://github.com/input-output-hk/hydra/releases).

You can also publish them yourselves by paying some some 50ADA and using this
command and keep:

```sh
hydra-node publish-scripts \
    --testnet-magic $(cat preview/db/protocolMagicId) \
    --node-socket "preview/node.socket" \
    --cardano-signing-key credentials/sebastian.cardano.sk
```

We sometimes store published script transaction ids for unreleased versions in the repository. For example `./preview/hydra-scripts-0.8.1-521-g5447acb3.txid` holds a transaction id with scripts from git commit `5447acb3` on the corresponding `preview` network.

For the sake of this example let's assume one:

```sh
export HYDRA_SCRIPTS_TX_ID="fd5de60b31651ed1747cf911ce6e2df43d5181c139d606e37eb58bbd9ecbbf5b"
```

Then, you need some hydra credentials as indicated by the scripts. See [the user
manual](https://hydra.family/head-protocol/docs/getting-started/quickstart#and-where-to-find-them)
on how to get these. Update the references to your credentials accordingly and
launch the `hydra-node`:

```sh
hydra-node \
  --node-id 314 \
  --node-socket "preview/node.socket" \
  --testnet-magic $(cat preview/db/protocolMagicId) \
  --hydra-scripts-tx-id ${HYDRA_SCRIPTS_TX_ID} \
  --ledger-genesis "preview/genesis/shelley.json" \
  --ledger-protocol-parameters "../hydra-cluster/config/protocol-parameters.json" \
  --hydra-signing-key "credentials/sebastian.hydra.sk" \
  --cardano-signing-key "credentials/sebastian.cardano.sk"
```

To start the `hydra-tui`:

```sh
hydra-tui \
  --connect "0.0.0.0:4001" \
  --cardano-signing-key "credentials/sebastian.cardano.sk" \
  --testnet-magic $(cat preview/db/protocolMagicId) \
  --node-socket "preview/node.socket"
```

Now we should be able to `[i]nit`, `[c]ommit` & `[c]lose` a hydra head using the interactive terminal client.

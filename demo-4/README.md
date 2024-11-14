# Scrypto 1.3.0-dev - upgraded crypto utils

* using of `scrypto::prelude::CryptoUtils::keccak256_hash`
* using of `scrypto::prelude::CryptoUtils::secp256k1_ecdsa_verify_and_key_recover`


## Scrypto&`resim` environment

1. Download Radix-DLT `develop` repo

```shell
git submodule update --remote
```

1. Install Rust as described [here](https://docs.radixdlt.com/v1/docs/getting-rust-scrypto).
1. Install Scrypto&Resim env by using

```shell
. ../scrypto/radixdlt-scrypto/install.sh
```

3. Create an account as
   described [here](https://docs.radixdlt.com/docs/learning-to-run-your-first-scrypto-project#creating-an-account)

## Local - Radix Engine Simulator

See the [`Makefile`](../scrypto/Makefile) responsible for the commands below.

## Preparing sample data & updating resim timestamp

The scripts below process the given sample data payload and return the aggregated data in the output logs. To prepare
the data, execute

```shell 
make -C ../scrypto update_data
```

1. A payload generator from [`../../../sdk/scripts/payload-generator/`](../payload-generator/index.ts) is
   used under the hood
1. The files are saved into the [`sample-data`](../scrypto/sample-data) directory
1. The function also updates the current time in the `resim` environment

## Using the PriceAdapter contract in resim

### Deploying

1. The package can be deployed and the component instantiated by using the following command:

```shell
make -C ../scrypto deploy
```

1. The deployed [`package.resim.addr`](../scrypto/price_adapter/package.resim.addr)
   and [`component.resim.addr`](../scrypto/price_adapter/package.resim.addr) hashes can be found in the
   [`price_adapter`](../scrypto/price_adapter)
   directory.

### Pull model

1. The following command can be used for processing values of [prepared sample data](../scrypto/sample-data/) in
   RedStone
   Pull model.

```shell
make -C ../scrypto get_prices
```

2. The command processes the payload for `ETH` and `BTC` prices "on-ledger".
3. The values returned by the scripts are visible under the Outputs (multiplied by `10 ** 8` as the RedStone protocol
   defines)
4. the timestamp of the processed data is also returned (Use https://www.epochconverter.com/ to decode it)

## Using the PriceAdapter contract in Enkinet

1. Install the dependencies

```shell
yarn install
```

### Deploying package

1. The package can be deployed by using the following command, defined [here](../scripts/sample_deploy.ts):

```shell
yarn sample-deploy
```

2. The deployed [`package.stokenet.addr`](../scrypto/price_adapter/package.resim.addr) address can be found in the
   [`price_adapter`](../scrypto/price_adapter)
   directory.
3. The script uses [`RadixPackageDeployer`](../scripts/RadixPackageDeployer.ts)
   with the [`@atlantis-l/radix-tool`](https://github.com/atlantis-l/Radix-Desktop-Tool) package under the hood,
   as the Radix Desktop Tool uses.

### Instantiating component

1. The component can be instantiated by using the following command, defined [here](../scripts/sample_instantiate.ts):

```shell
yarn sample-instantiate
```

### Deploying package

1. The package can be deployed by here: https://enkinet-console.rdx-works-main.extratools.works/
2. The deployed [`package.enkinet.addr`](../scrypto/price_adapter/package.enkinet.addr) address can be found in the
   [`price_adapter`](../scrypto/price_adapter)
   directory.
3. The [deploying script](../scripts/sample-deploy)
   with the [`@atlantis-l/radix-tool`](https://github.com/atlantis-l/Radix-Desktop-Tool) package under the hood,
    **is not working for ENKINET yet**,
so you can use the https://enkinet-console.rdx-works-main.extratools.works/deploy-package/ page

### Instantiating component

1. The component can be instantiated by using the following command, defined [here](../scripts/sample_instantiate.ts):

```shell
yarn sample-instantiate
```

2. The previously deployed [`component.enkinet.addr`](../scrypto/price_adapter/package.enkinet.addr) address can be found in the
   [`price_adapter`](../scrypto/price_adapter)
   directory.
3. The script uses [`PriceAdapterRadixContractDeployer`](../src/contracts/price_adapter/PriceAdapterRadixContractDeployer.ts)
4. The instantiated component can be also found in the dashboard: https://enkinet-dashboard.rdx-works-main.extratools.works/

### Sample run

1. The scenario above can be run by using the following command, defined [here](../scripts/sample_run.ts):
2. The script uses [`PriceAdapterRadixContractConnector`](../src/contracts/price_adapter/PriceAdapterRadixContractConnector.ts)

```shell
yarn sample-run
```

## Cost comparison

Below there is cost comparison of pushing 2 prices x 2 signers on Enkinet:

| Cost in in XRD                   |             1.2.0 |         1.3.0-dev |   % Change |
|----------------------------------|------------------:|------------------:|-----------:|
| **deploying component**          |            **77** |            **58** |   **-25%** |
| xrd_total_royalty_cost           |                 0 |                 0 |         0% |
| xrd_total_storage_cost           |     0.13570785289 |     0.13570785289 |         0% |
| xrd_total_tipping_cost           |                 0 |                 0 |         0% |
| xrd_total_execution_cost         |        0.62951825 |         0.2694182 |       -57% |
| xrd_total_finalization_cost      |        0.01541155 |        0.01541155 |         0% |
| execution_cost_units_consumed    |          12590365 |           5388364 |       -57% |
| finalization_cost_units_consumed |            308231 |            308231 |         0% |
| **total_cost**                   | **0.78063765289** | **0.42053760289** |   **-46%** |

### One small remark:
   * we need to have the public key uncompressed to recover the signer address then,
  but the `secp256k1_ecdsa_verify_and_key_recover` returns a compressed one, 
so the key needs to be uncompressed by using `secp256k1::PublicKey::from_slice --> serialize_uncompressed`

```rust
        let compressed_key: [u8; 33] =
            CryptoUtils::secp256k1_ecdsa_verify_and_key_recover(hash, signature).0;
        let pub_key = PublicKey::from_slice(&compressed_key)
            .unwrap_or_revert(|_| Error::CryptographicError(compressed_key.len()));

        pub_key.serialize_uncompressed()
```

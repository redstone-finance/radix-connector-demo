![diagram.svg](diagram.svg)

## Scrypto&resim environment

1. Install Rust & Scrypto toolchain as described [here](https://docs.radixdlt.com/v1/docs/getting-rust-scrypto).
1. Install `resim` - an entry point command to interact with the Radix Engine Simulator for local development purposes

```shell
cargo install --force radix-clis
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

1. A payload generator from [`../../../sdk/scripts/payload-generator/`](../../sdk/scripts/payload-generator/index.ts) is
   used under the hood
1. The files are saved into the [`sample-data`](../scrypto/sample-data) directory
1. The function also updates the current time in the `resim` environment

## Using the PriceAdapter contract

### Deploying

1. The package can be deployed and the component instantiated by using the following command:

```shell
make -C ../scrypto deploy
```

1. The deployed [`package.resim.addr`](../scrypto/price_adapter/package.resim.addr)
   and [`component.resim.addr`](../scrypto/price_adapter/package.resim.addr) hashes can be found in the
   [`price_adapter`](price_adapter)
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

### Running tests

Run

```shell
make -C ../scrypto test
```

# Stage 2

<!-- TOC -->
* [Stage 2](#stage-2)
  * [Interface changes](#interface-changes)
  * [Newly created packages/components](#newly-created-packagescomponents)
    * [MultiFeedPriceAdapter](#multifeedpriceadapter)
      * [Possible enhancements](#possible-enhancements)
    * [PriceFeed](#pricefeed-)
    * [Proxy](#proxy-)
  * [Reading from Proxy](#reading-from-proxy)
  * [Notes](#notes)
  * [Docs](#docs)
<!-- TOC -->

## Interface changes

* Each function has become 2 versions, returning price values in `Decimal` or `U256Digits` (with the `*_raw` suffix)
* The returning values for base (non `*_raw`) functions are `Decimal`s -
    the functions may fail when one of the values is overflowing the `Decimal` range `/ 10 ** 8` which is `~2 ** 165`.
* In that case you should use one `*._raw` function which returning values are encoded as `U256Digits`,
  represented each as four `u64`'s, to be properly represented in SBOR.
* Example:
  * [See in README.md](../scrypto/contracts/price_adapter/README.md#-write_prices)

## Newly created packages/components

### [MultiFeedPriceAdapter](../scrypto/contracts/multi_feed_price_adapter/src/multi_feed_price_adapter.rs)

|                       | [PriceAdapter](../scrypto/contracts/price_adapter/src/price_adapter.rs)                                | [MultiFeedPriceAdapter](../scrypto/contracts/multi_feed_price_adapter/src/multi_feed_price_adapter.rs) |
|-----------------------|---------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Storage               | `prices: HashMap<U256Digits, U256Digits>,`  | `prices: HashMap<U256Digits, PriceDataRaw>,`                                                           |
|                       | `timestamp: u64,`                           | `pub timestamp: u64` inside `PriceDataRaw`                                                             |
|                       | `latest_update_timestamp: Option<u64>,`     | `pub latest_update_timestamp: u64` inside `PriceDataRaw`                                               |
| Updates               | Data updated in batch, for all feeds        | Each feed can be updated separately                                                                    |
| Reads                 | Common timestamp for all feeds | Each feed has its own timestamps                                                                       |

* State: https://stokenet-dashboard.radixdlt.com/component/component_tdx_2_1cqf0hnqzl6j36ssrupc0nhm82sfcwwf9fjwgc7pdscxtxngzpnwv6g/state
* Blueprint: https://stokenet-dashboard.radixdlt.com/package/package_tdx_2_1ph8w7dhh287up4dglxp0qs5dhdhcx4xvfpz72y8yeccgx39qtxgnkk/blueprints

#### Possible enhancements

* Store Decimal values instead of `U256Digits` until the price exceeds the `Decimal` range.
* Create Proxy for PriceAdapter

### [PriceFeed](../scrypto/contracts/price_feed/src/price_feed.rs) 
* The contract reads the data from PriceAdapter/MultiFeedPriceAdapter by using `read_price_and_timestamp/_(_raw)` method
* Every feed has its own PriceFeed
* Sample PriceFeed for `XRD`: `component_tdx_2_1cqqlr90qv5aszjjdmpqn75hxap2v2suj4dankwaxc99kwvfq2pn3tw`
  * State: https://stokenet-dashboard.radixdlt.com/component/component_tdx_2_1cqqlr90qv5aszjjdmpqn75hxap2v2suj4dankwaxc99kwvfq2pn3tw/state
  * Blueprint: https://stokenet-dashboard.radixdlt.com/package/package_tdx_2_1phxagjjkyhx5lp7pwy9c8m5qg0l9dgw6v9f3587ku4e939h5twwwwj/blueprints

### [Proxy](../scrypto/contracts/proxy/src/proxy.rs) 

* We assume the **PriceFeed contract's ID won't change** and that's the **only recommended** way
  of getting data for the particular feed id.
* To achieve that, we've created a Proxy contract, which is based on:
  * https://raw.githubusercontent.com/radixdlt/official-examples/refs/heads/main/scrypto-design-patterns/blueprint-proxy/oracle-generic-proxy-with-global/src/lib.rs
* The proxy for `XRD` contract: `component_tdx_2_1crkgvn9yy5z8a34tx8mmx99wkqcppnlcztk5xjj7at75vdcvcx84df`
  * State: https://stokenet-dashboard.radixdlt.com/component/component_tdx_2_1crkgvn9yy5z8a34tx8mmx99wkqcppnlcztk5xjj7at75vdcvcx84df/state
  * Blueprint: https://stokenet-dashboard.radixdlt.com/package/package_tdx_2_1p4x62f2gylhl8ehuan2wf07y24ut253n9u9ktee4ewz6xnunr6x7we/blueprints

## Reading from Proxy

```shell
yarn read-XRD
```
* The price is updated when the deviation has exceeded 0.5%, as defined in the manifest
  * See recent transactions: https://stokenet-dashboard.radixdlt.com/component/component_tdx_2_1cqf0hnqzl6j36ssrupc0nhm82sfcwwf9fjwgc7pdscxtxngzpnwv6g/recent-transactions
* See comparison too: https://app.redstone.finance/app/token/XRD/

## Notes

* The always-actual component addresses are available here:
https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/on-chain-relayer/relayer-manifests-non-evm/radixStokenetMultiFeed.json
* The relayer is working on dev infrastructure without a fallback and can be restarted.
* The full TypeScript SDK will be released soon
* The Rust SDK-part is being optimized and will be released soon

## Docs

https://redstone-docs-git-radix-connector-redstone-finance.vercel.app/docs/get-started/supported-chains/

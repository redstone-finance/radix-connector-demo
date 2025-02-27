import { requestRedstonePayload } from "@redstone-finance/sdk";

const DATA_SERVICE_ID = "redstone-avalanche-prod";
const DATA_FEEDS = ["ETH", "BTC"];
const UNIQUE_SIGNER_COUNT = 2;

const scriptArgs = process.argv.slice(2);

requestRedstonePayload(
  {
    dataPackagesIds: DATA_FEEDS,
    dataServiceId: DATA_SERVICE_ID,
    uniqueSignersCount: UNIQUE_SIGNER_COUNT,
  },
  scriptArgs[0]
)
  .then((value) => console.log(value))
  .catch((e) => console.error(e));

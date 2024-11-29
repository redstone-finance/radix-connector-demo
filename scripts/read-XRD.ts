import {
  PriceFeedRadixContractConnector,
  RadixClient,
} from "@redstone-finance/radix-connector";
import {
  FEED_ID,
  loadAddress,
  NETWORK,
  PRIVATE_KEY,
  PROXY_NAME,
} from "./constants";
import { describeTimestamp } from "@redstone-finance/sdk";
import { convertValue } from "@redstone-finance/sdk";

async function main() {
  const client = new RadixClient(PRIVATE_KEY, NETWORK.id);

  const priceFeed = new PriceFeedRadixContractConnector(
    client,
    await loadAddress(`component`, PROXY_NAME, FEED_ID)
  );

  const { value, timestamp } = await (await priceFeed.getAdapter()).getPriceAndTimestamp();
  console.log(`XRD Price:  ${convertValue(value)}, last updated: ${describeTimestamp(timestamp)}`);
}


void main();

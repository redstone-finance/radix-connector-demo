import {ContractParamsProvider } from "@redstone-finance/sdk";
import { PriceAdapterRadixContractConnector, RadixClient } from "../src";
import {loadAddress, NETWORK, PRIVATE_KEY} from "./constants";
import { sampleRun } from "../src/sample-run";

async function main() {
  const paramsProvider = new ContractParamsProvider({
    dataPackagesIds: ["ETH", "BTC"],
    dataServiceId: "redstone-avalanche-prod",
    uniqueSignersCount: 1,
  });

  const client = new RadixClient(PRIVATE_KEY, NETWORK.id);

  const connector = new PriceAdapterRadixContractConnector(
    client,
    await loadAddress(`component.${NETWORK.name}.addr`)
  );

  await sampleRun(paramsProvider, connector);
}

void main();

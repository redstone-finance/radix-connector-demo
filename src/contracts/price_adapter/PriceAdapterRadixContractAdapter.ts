import {
  ContractParamsProvider,
  IPricesContractAdapter,
} from "@redstone-finance/sdk";
import { BigNumberish } from "ethers";
import { RadixContractAdapter } from "../../radix/RadixContractAdapter";
import { GetPricesRadixMethod } from "./methods/GetPricesRadixMethod";
import { WritePricesRadixMethod } from "./methods/WritePricesRadixMethod";

export class PriceAdapterRadixContractAdapter
  extends RadixContractAdapter
  implements IPricesContractAdapter
{
  async getPricesFromPayload(
    paramsProvider: ContractParamsProvider
  ): Promise<BigNumberish[]> {
    return (
      await this.client.call(
        new GetPricesRadixMethod(
          this.componentId,
          paramsProvider.getDataFeedIds(),
          await paramsProvider.getPayloadData()
        )
      )
    ).values;
  }

  async writePricesFromPayloadToContract(
    paramsProvider: ContractParamsProvider
  ): Promise<string | BigNumberish[]> {
    return (
      await this.client.call(
        new WritePricesRadixMethod(
          this.componentId,
          paramsProvider.getDataFeedIds(),
          await paramsProvider.getPayloadData()
        )
      )
    ).values;
  }

  async readPricesFromContract(
    paramsProvider: ContractParamsProvider
  ): Promise<BigNumberish[]> {
    const priceMap: { [p: string]: BigNumberish } = await this.client.readValue(
      this.componentId,
      "prices"
    );

    return paramsProvider
      .getHexlifiedFeedIds()
      .map((feedId) => priceMap[feedId]);
  }

  async readTimestampFromContract(): Promise<number> {
    return Number(await this.client.readValue(this.componentId, "timestamp"));
  }
}

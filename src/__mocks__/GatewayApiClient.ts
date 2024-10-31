import { Convert } from "@radixdlt/radix-engine-toolkit";

export const transactionCommittedDetails = jest.fn();
export const transactionSubmit = jest.fn();
export const transactionStatus = jest.fn();
export const getCurrent = jest.fn();
export const getEntityDetailsVaultAggregated = jest.fn();

jest.mock("@radixdlt/babylon-gateway-api-sdk", () => {
  return {
    GatewayApiClient: {
      initialize: jest.fn().mockImplementation(() => ({
        transaction: {
          innerClient: {
            transactionCommittedDetails,
            transactionSubmit,
            transactionStatus,
          },
        },
        status: {
          getCurrent,
        },
        state: {
          getEntityDetailsVaultAggregated,
        },
      })),
    },
  };
});

jest.spyOn(Convert.Uint8Array, "toHexString");

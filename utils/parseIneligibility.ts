import { ClaimEligibility } from "@thirdweb-dev/sdk";

export function parseIneligibility(
  reasons: ClaimEligibility[],
  quantity = 0
): string {
  if (!reasons.length) {
    return "";
  }

  const reason = reasons[0];

  if (
    reason === ClaimEligibility.Unknown ||
    reason === ClaimEligibility.NoActiveClaimPhase ||
    reason === ClaimEligibility.NoClaimConditionSet
  ) {
    return "This drop is not ready to be minted.";
  } else if (reason === ClaimEligibility.NotEnoughTokens) {
    return "You don't have enough currency to mint.";
  } else if (reason === ClaimEligibility.AddressNotAllowed) {
    if (quantity > 1) {
      return `You are not eligible to mint ${quantity} tokens.`;
    }

    return "You are not eligible to mint at this time.";
  }

  return reason;
}


import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// Initialize the SDK
const sdk = new ThirdwebSDK("sepolia", {
  clientId : '5ec9d980533be21c962580687677c0f9',
  secretKey : 't0FrTfMOHuPBNQJ0tWoQbi9vabkEcHLRlBpZJPeswtUIsuvt-GKQ68534KwM0pqkkukuiHWGAKyTjlTQoVrDhA'
});

// Fetch contract metadata
export async function getContractMetadataUtil() {
  try {
    const contract = await sdk.getContract("0x4d6F4aeDFC1f5853C9C8D1A4f59106739db2f3bC", 'nft-drop');
    const metadata = await contract.metadata.get();
    // console.log(metadata);
    return metadata
  } catch (error) {
    console.error("Error fetching contract metadata:", error);
  }
}

getContractMetadataUtil();
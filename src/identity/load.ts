import Masa from "../masa";
import { BigNumber } from "ethers";

export const loadIdentityByAddress = async (
  masa: Masa,
  address?: string
): Promise<BigNumber | undefined> => {
  address = address || (await masa.config.wallet.getAddress());

  let identityId;

  const balance =
    await masa.contracts.identity.SoulboundIdentityContract.balanceOf(address);

  if (balance.toNumber() > 0) {
    identityId =
      await masa.contracts.identity.SoulboundIdentityContract.tokenOfOwner(
        address
      );
  }

  if (!identityId) {
    console.error(`No identity for '${address}'!`);
  }

  return identityId;
};

export const loadAddressFromIdentityId = async (
  masa: Masa,
  identityId: BigNumber | number
): Promise<string | undefined> => {
  let address;

  try {
    address = await masa.contracts.identity.SoulboundIdentityContract[
      "ownerOf(uint256)"
    ](identityId);
  } catch {
    // ignore
  }

  if (!address) {
    console.error(`Identity '${identityId}' does not exist`);
  }

  return address;
};

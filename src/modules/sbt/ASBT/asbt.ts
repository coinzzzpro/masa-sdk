import { ReferenceSBTAuthority__factory } from "@masa-finance/masa-contracts-identity";

import { MasaSBTs } from "../SBT";
import { ASBTWrapper } from "./asbt-wrapper";
import { deployASBT } from "./deploy";

export class MasaASBT extends MasaSBTs {
  /**
   *
   * @param name
   * @param symbol
   * @param baseTokenUri
   * @param limit
   * @param adminAddress
   */
  public deploy = ({
    name,
    symbol,
    baseTokenUri,
    limit = 1,
    adminAddress,
  }: {
    name: string;
    symbol: string;
    baseTokenUri: string;
    limit?: number;
    adminAddress?: string;
  }) =>
    deployASBT({
      masa: this.masa,
      name,
      symbol,
      baseTokenUri,
      limit,
      adminAddress,
    });

  /**
   *
   * @param address
   */
  public connect = async (address: string) => {
    const { sbtContract } = await this.masa.contracts.asbt.connect(
      address,
      ReferenceSBTAuthority__factory
    );

    return new ASBTWrapper(this.masa, sbtContract);
  };
}
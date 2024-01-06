import type { MasaArgs, MasaConfig, MasaInterface } from "./interface";
import { SupportedNetworks } from "./collections";
import { MasaContracts } from "./contracts";
import { MasaArweave, MasaClient, getNetworkNameByChainId } from "./utils";
import {
  MasaAccount, MasaASBT, MasaCreditScore, MasaDynamicSBTBase,
  MasaDynamicSSSBT, MasaGreen, MasaIdentity, MasaSBTBase,
  MasaSession, MasaSoulName, MasaSSSBT, version
} from "./modules";

export class Masa implements MasaInterface {
  readonly config: MasaConfig;
  readonly arweave: MasaArweave;
  readonly client: MasaClient;
  readonly contracts: MasaContracts;
  readonly account: MasaAccount;
  readonly session: MasaSession;
  readonly identity: MasaIdentity;
  readonly soulName: MasaSoulName;
  readonly creditScore: MasaCreditScore;
  readonly green: MasaGreen;
  readonly sbt: MasaSBTBase;
  readonly asbt: MasaASBT;
  readonly sssbt: MasaSSSBT;
  readonly dynamicSBT: MasaDynamicSBTBase;
  readonly dynamicSSSBT: MasaDynamicSSSBT;

  constructor(masaArgs: MasaArgs) {
    this.initConfig(masaArgs);
    this.initClients(masaArgs);
    this.initModules();
  }

  private initConfig({ apiUrl, environment, networkName, signer, verbose, forceTransactions }: MasaArgs) {
    this.config = {
      apiUrl,
      environment,
      networkName,
      network: SupportedNetworks[networkName],
      signer,
      verbose,
      forceTransactions,
    };
  }

  private initClients({ cookie, apiUrl, arweave, contractOverrides }: MasaArgs) {
    this.client = new MasaClient({ masa: this, apiUrl, cookie });
    this.arweave = new MasaArweave(arweave, this.config);
    this.contracts = new MasaContracts({ masa: this, contractOverrides });
  }

  private initModules() {
    this.account = new MasaAccount(this);
    this.session = new MasaSession(this);
    this.identity = new MasaIdentity(this);
    this.soulName = new MasaSoulName(this);
    this.creditScore = new MasaCreditScore(this);
    this.green = new MasaGreen(this);
    this.sbt = new MasaSBTBase(this);
    this.asbt = new MasaASBT(this);
    this.sssbt = new MasaSSSBT(this);
    this.dynamicSBT = new MasaDynamicSBTBase(this);
    this.dynamicSSSBT = new MasaDynamicSSSBT(this);
  }

  utils = {
    version,
  };

  static async create(masaArgs: MasaArgs): Promise<Masa> {
    const network = await masaArgs.signer.provider?.getNetwork();
    const networkName = network ? getNetworkNameByChainId(network.chainId) : "ethereum";

    return new Masa({ ...masaArgs, networkName });
  }
}

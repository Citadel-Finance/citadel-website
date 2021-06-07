import BigNumber from 'bignumber.js';
import BasicSmartContract from '~/classes/BasicSmartContract';
import { Factory as FactoryAbi } from '~/abis';
import { error, output } from '~/utils/web3';

export default class Factory extends BasicSmartContract {
  constructor({
    address,
  }) {
    super({
      address,
      abi: FactoryAbi,
    });
  }

  async fetchPoolsData() {
    try {
      const [
        poolData,
        ctlToken,
      ] = await Promise.all([
        this.fetchContractData('allPools'),
        this.fetchContractData('ctlToken'),
      ]);
      this.poolData = poolData;
      this.ctlTokenAddress = ctlToken;
      const { ctlTokenAddress } = this;
      return output({
        poolData,
        ctlTokenAddress,
      });
    } catch (e) {
      console.log('fetchPoolsData error', e, this);
      return error(500, 'fetchPoolsData error', e);
    }
  }

  async createPool({
    tokenAddress,
    startTime,
    tokensPerBlock,
    apyTax,
    premiumCoeff,
  }) {
    try {
      const r = await this.inst().addPool(
        tokenAddress,
        startTime,
        tokensPerBlock,
        apyTax,
        premiumCoeff,
        true,
      );
      return output(r);
    } catch (e) {
      console.log('createPool error', e, this);
      return error(500, 'createPool error', e);
    }
  }
}

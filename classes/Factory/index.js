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

  async fetchCtlAddress() {
    try {
      const ctlToken = await this.fetchContractData('ctlToken');
      this.ctlTokenAddress = ctlToken;
      return output({
        ctlTokenAddress: ctlToken,
      });
    } catch (e) {
      console.log('fetchCtlAddress error', e, this);
      return error(500, 'fetchCtlAddress error', e);
    }
  }

  async fetchPoolsData() {
    try {
      const poolData = await this.fetchContractData('allPools');
      return output({
        poolData,
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

  async fetchTotalAvailableReward() {
    try {
      const totalAvailableReward = await this.fetchContractData('totalAvailableReward');
      console.log('totalAvailableReward', totalAvailableReward);
      return output({
        totalAvailableReward,
      });
    } catch (e) {
      console.log('fetchTotalAvailableReward error', e, this);
      return error(500, 'fetchTotalAvailableReward error', e);
    }
  }

  async claimAll() {
    try {
      const r = await this.inst().claimAllRewards();
      return output(r);
    } catch (e) {
      console.log('claimAll error', e, this);
      return error(500, 'claimAll error', e);
    }
  }
}

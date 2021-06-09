import BigNumber from 'bignumber.js';
import BasicSmartContract from '~/classes/BasicSmartContract';
import { BEP20, Factory as FactoryAbi } from '~/abis';
import {
  error, fetchContractData, getUserAddress, output,
} from '~/utils/web3';
import { shiftedBy } from '~/utils/helpers';

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
      // console.log('poolData', poolData);
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
    isEnabled,
  }) {
    try {
      const decimals = await fetchContractData('decimals', BEP20, tokenAddress);
      tokensPerBlock = shiftedBy(tokensPerBlock, +decimals);
      apyTax = shiftedBy(apyTax, +decimals);
      premiumCoeff = shiftedBy(premiumCoeff, +decimals);
      const r = await this.inst().addPool(
        tokenAddress,
        startTime,
        tokensPerBlock,
        apyTax,
        premiumCoeff,
        isEnabled,
      );
      return output(r);
    } catch (e) {
      console.log('createPool error', e, this);
      return error(500, 'createPool error', e);
    }
  }

  async fetchTotalAvailableReward() {
    try {
      const totalAvailableReward = await this.fetchContractData('totalAvailableReward', [getUserAddress()]);
      return output(totalAvailableReward);
    } catch (e) {
      console.log('fetchTotalAvailableReward error', e, this);
      return error(500, 'fetchTotalAvailableReward error', e);
    }
  }

  async fetchPoolsAvailableReward() {
    try {
      let poolsAvailableReward = await this.fetchContractData('poolsAvailableReward', [getUserAddress()]);
      // console.log('poolsAvailableReward', poolsAvailableReward);
      poolsAvailableReward = poolsAvailableReward.map((item) => ({
        ...item,
        reward: shiftedBy(item.availableReward, -item.decimals),
      }));
      return output(poolsAvailableReward);
    } catch (e) {
      console.log('fetchPoolsAvailableReward error', e, this);
      return error(500, 'fetchPoolsAvailableReward error', e);
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

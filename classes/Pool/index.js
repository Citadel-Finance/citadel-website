import BigNumber from 'bignumber.js';
import BasicSmartContract from '~/classes/BasicSmartContract';
import { Pool as PoolAbi } from '~/abis';
import { error, output } from '~/utils/web3';

export default class Pool extends BasicSmartContract {
  constructor({
    address,
  }) {
    super({
      address,
      abi: PoolAbi,
    });
  }

  async fetchCommonData() {
    try {
      const commonData = await this.fetchContractData('getCommonData');
      console.log(commonData);
      const { decimals, token, totalStaked } = commonData;
      this.decimals = decimals;
      this.childAddress = token;
      this.totalStaked = new BigNumber(totalStaked).shiftedBy(-decimals).toString();
      console.log(this);
      return output({ commonData });
    } catch (e) {
      console.log('fetchCommonData error', e, this);
      return error(500, 'fetchCommonData error', e);
    }
  }

  async fetchTotalStaked() {
    try {
      const totalStaked = await this.fetchContractData('totalStaked');
      console.log(totalStaked);
      return output({ totalStaked });
    } catch (e) {
      console.log('fetchTotalStaked error', e, this);
      return error(500, 'fetchTotalStaked error', e);
    }
  }

  async deposit(amount) {
    try {
      const r = await this.inst().deposit(amount);
      return output({ r });
    } catch (e) {
      console.log('deposit error', e, this);
      return error(500, 'deposit error', e);
    }
  }

  setChildAddress(value) {
    this.childAddress = value;
  }
}

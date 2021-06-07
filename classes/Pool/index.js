import BigNumber from 'bignumber.js';
import BasicSmartContract from '~/classes/BasicSmartContract';
import { Pool as PoolAbi } from '~/abis';
import {
  error, getUserAddress, output,
} from '~/utils/web3';
import { shiftedBy } from '~/utils/helpers';

export default class Pool extends BasicSmartContract {
  constructor({
    address,
  }) {
    super({
      address,
      abi: PoolAbi,
    });
  }

  async fetchAll() {
    await this.fetchCommonData();
    await Promise.all([
      this.fetchTop(),
      // this.fetchUserData(),
    ]);
  }

  async fetchTop() {
    try {
      let top = await this.fetchContractData('getTopProviders');
      top = top.map((item) => ({
        ...item,
        staked: shiftedBy(item.staked, -this.decimals),
      }));
      this.top = top;
      // console.log(top);
      return output({ top });
    } catch (e) {
      console.log('fetchTop error', e, this);
      return error(500, 'fetchTop error', e);
    }
  }

  async fetchCommonData() {
    try {
      const commonData = await this.fetchContractData('getCommonData');
      const {
        decimals, token, totalStaked, symbol, apyTax,
      } = commonData;
      // console.log('commonData', commonData);
      this.decimals = decimals;
      this.symbol = symbol;
      this.childAddress = token;
      this.apyTax = shiftedBy(apyTax, -decimals);
      this.totalStaked = shiftedBy(totalStaked, -decimals);
      return output({ commonData });
    } catch (e) {
      console.log('fetchCommonData error', e, this);
      return error(500, 'fetchCommonData error', e);
    }
  }

  async fetchUserData() {
    try {
      const userData = await this.fetchContractData('getUserData', [getUserAddress()]);
      // console.log('userData', userData);
      const { totalStaked, availableReward } = userData;
      this.availableReward = new BigNumber(availableReward).shiftedBy(-this.decimals).toString();
      this.userStaked = new BigNumber(totalStaked).shiftedBy(-this.decimals).toString();
      return output({ userData });
    } catch (e) {
      console.log('fetchUserData error', e, this);
      return error(500, 'fetchUserData error', e);
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

  async withdraw(amount) {
    try {
      const r = await this.inst().withdraw(amount);
      return output(r);
    } catch (e) {
      console.log('withdraw error', e, this);
      return error(500, 'withdraw error', e);
    }
  }

  eventCallback(item) {
    return {
      amount: new BigNumber(item.returnValues.amount).shiftedBy(-this.decimals).toString(),
      ...item,
    };
  }

  subscribeEvents(eventName, callback = () => {}) {
    super.subscribeEvents(eventName, (r) => {
      callback(this.eventCallback(r));
    });
  }
}

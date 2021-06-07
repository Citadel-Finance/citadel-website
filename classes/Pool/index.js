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
    await Promise.all([
      this.fetchCommonData(),
      this.fetchTop(),
    ]);
  }

  getTop() {
    return (JSON.parse(this.top)).map((item) => ({
      ...item,
      staked: shiftedBy(item.staked, -this.decimals),
    }));
  }

  async fetchTop() {
    try {
      let top = await this.fetchContractData('getTopProviders');
      top = top.reduce((accumulator, { user, staked }) => [...accumulator, { user, staked }], []);
      this.top = JSON.stringify(top);
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
        decimals, token, totalStaked, symbol, apyTax, enabled,
      } = commonData;
      // console.log('commonData', commonData);
      this.decimals = decimals;
      this.symbol = symbol;
      this.isEnabled = enabled;
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
      const { totalStaked, availableReward, is_admin } = userData;
      this.isAdmin = is_admin;
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

  async editPool({
    apyTax,
    premiumCoeff,
    tokensPerBlock,
    isEnable,
  }) {
    try {
      const r = await this.inst().updatePool(
        apyTax,
        premiumCoeff,
        tokensPerBlock,
        isEnable,
      );
      return output(r);
    } catch (e) {
      console.log('editPool error', e, this);
      return error(500, 'editPool error', e);
    }
  }
}

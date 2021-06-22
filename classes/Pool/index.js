import BigNumber from 'bignumber.js';
import BasicSmartContract from '~/classes/BasicSmartContract';
import { Pool as PoolAbi } from '~/abis';
import {
  error, getUserAddress, output,
} from '~/utils/web3';
import { shiftedBy } from '~/utils/helpers';

const topByAddress = {};
const totalStakedByAddress = {};
const totalProfitByAddress = {};
const totalBorrowedByAddress = {};
const apyTaxByAddress = {};

const tokensPerBlockByAddress = {};
const premiumCoeffByAddress = {};
const isEnabledByAddress = {};

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
    if (!topByAddress[this.address]) {
      return [];
    }
    return (JSON.parse(topByAddress[this.address])).map((item) => ({
      ...item,
      staked: +shiftedBy(item.staked, -this.decimals || 0),
    }));
  }

  async fetchTop() {
    try {
      let top = await this.fetchContractData('getTopProviders');
      top = top.reduce((accumulator, { user, staked }) => [...accumulator, { user, staked }], []);
      topByAddress[this.address] = JSON.stringify(top);
      // this.top = JSON.stringify(top);
      return output({ top });
    } catch (e) {
      console.log('fetchTop error', e, this);
      return error(500, 'fetchTop error', e);
    }
  }

  getTotalStaked() {
    return totalStakedByAddress[this.address];
  }

  getTotalProfit() {
    return totalProfitByAddress[this.address];
  }

  getTotalBorrowed() {
    return totalBorrowedByAddress[this.address];
  }

  getApyTax() {
    return apyTaxByAddress[this.address];
  }

  getTokensPerBlock() {
    return tokensPerBlockByAddress[this.address];
  }

  getPremiumCoeff() {
    return premiumCoeffByAddress[this.address];
  }

  getIsEnabled() {
    return isEnabledByAddress[this.address];
  }

  async fetchCommonData() {
    try {
      const commonData = await this.fetchContractData('getCommonData');
      const {
        decimals, token, totalStaked, symbol, apyTax, enabled, tokensPerBlock, premiumCoeff, totalProfit,
      } = commonData;
      this.decimals = +decimals;
      this.symbol = symbol;
      this.childAddress = token;

      tokensPerBlockByAddress[this.address] = shiftedBy(tokensPerBlock, -decimals);
      premiumCoeffByAddress[this.address] = shiftedBy(premiumCoeff, -decimals);

      isEnabledByAddress[this.address] = enabled;
      apyTaxByAddress[this.address] = shiftedBy(apyTax, -decimals);
      totalStakedByAddress[this.address] = shiftedBy(totalStaked, -decimals);
      totalProfitByAddress[this.address] = shiftedBy(totalProfit, -decimals);

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

  subscribeEvents(eventName, callback = () => {}, filter = {}) {
    super.subscribeEvents(eventName, (r) => {
      callback(this.eventCallback(r));
    }, filter);
  }

  async editPool({
    apyTax,
    premiumCoeff,
    tokensPerBlock,
    isEnabled,
  }) {
    // console.log(apyTax,
    //   premiumCoeff,
    //   tokensPerBlock,
    //   isEnabled);
    try {
      apyTax = shiftedBy(apyTax, this.decimals);
      premiumCoeff = shiftedBy(premiumCoeff, this.decimals);
      tokensPerBlock = shiftedBy(tokensPerBlock, this.decimals);

      const r = await this.inst().updatePool(
        apyTax,
        premiumCoeff,
        tokensPerBlock,
        isEnabled,
      );
      return output(r);
    } catch (e) {
      console.log('editPool error', e, this);
      return error(500, 'editPool error', e);
    }
  }
}

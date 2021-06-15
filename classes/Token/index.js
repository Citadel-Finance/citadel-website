import BigNumber from 'bignumber.js';
import BasicSmartContract from '~/classes/BasicSmartContract';
import { BEP20 as TokenAbi } from '~/abis';
import {
  error, getUserAddress, output,
} from '~/utils/web3';

export default class Token extends BasicSmartContract {
  constructor({
    address,
  }) {
    super({
      address,
      abi: TokenAbi,
    });
  }

  setParrentAddress(value) {
    this.parrentAddress = value;
  }

  async fetchBalance() {
    try {
      let balance = await this.fetchContractData('balanceOf', [getUserAddress()]);
      balance = new BigNumber(balance).shiftedBy(-this.decimals).toString();
      this.balance = balance;
      return output({
        balance,
      });
    } catch (e) {
      console.log('fetchBalance error', e, this);
      return error(500, 'fetchBalance error', e);
    }
  }

  async fetchAll() {
    return Promise.all([
      this.fetchDecimals(),
      this.fetchSymbol(),
    ]);
  }

  async fetchDecimals() {
    try {
      const decimals = +(await this.fetchContractData('decimals'));
      this.decimals = decimals;
      return output({
        decimals,
      });
    } catch (e) {
      console.log('fetchDecimals error', e, this);
      return error(500, 'fetchDecimals error', e);
    }
  }

  async fetchTotalSupply() {
    try {
      let totalSupply = +(await this.fetchContractData('totalSupply'));
      totalSupply = new BigNumber(totalSupply).shiftedBy(-this.decimals).toString();
      this.totalSupply = totalSupply;
      return output({
        totalSupply,
      });
    } catch (e) {
      console.log('fetchDecimals error', e, this);
      return error(500, 'fetchDecimals error', e);
    }
  }

  async fetchSymbol() {
    try {
      const symbol = await this.fetchContractData('symbol');
      this.symbol = symbol;
      return output({
        symbol,
      });
    } catch (e) {
      console.log('fetchSymbol error', e, this);
      return error(500, 'fetchSymbol error', e);
    }
  }

  async allowance(recipient, owner = getUserAddress()) {
    try {
      const r = await this.fetchContractData('allowance', [
        owner, recipient,
      ]);
      const bnAmount = new BigNumber(r).shiftedBy(-this.decimals).toString();
      return output({
        allowance: bnAmount,
      });
    } catch (err) {
      console.log(err);
      return error(500, 'fetchAllowance error', err);
    }
  }

  async approve(recipient, amount) {
    try {
      const r = await this.inst().approve(recipient, amount);
      return output(r);
    } catch (e) {
      console.log(e);
      return error(500, 'approve error', e, this);
    }
  }
}

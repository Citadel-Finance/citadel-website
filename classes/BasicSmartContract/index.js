import BigNumber from 'bignumber.js';
import {
  createInst, error, fetchContractData, fetchContractDataAnon, getWeb3, output,
} from '~/utils/web3';

const insts = {};

export default class BasicSmartContract {
  constructor({
    address,
    abi,
  }) {
    this.address = address;
    this.abi = abi;
  }

  async initInst() {
    try {
      insts[this.address] = await createInst(this.abi, this.address);
      return output();
    } catch (e) {
      console.log('initInst error', e, this);
      return error(500, 'initInst error', e);
    }
  }

  inst() {
    return insts[this.address];
  }

  subscribeEvents(eventName, callback = () => {}) {
    const rand = Math.random();
    this.session = { ...this.session, [eventName]: rand };
    const session = this.session[eventName];
    const web3 = getWeb3();
    const inst = new web3.eth.Contract(this.abi, this.address);
    // console.log('subscribeEvents', eventName, this.address);
    inst.events[eventName]({
      fromBlock: 0,
      filter: {},
    }, (e, r) => {
      if (e) {
        console.log(e);
        return;
      }
      if (session !== this.session[eventName]) {
        return;
      }
      callback(r);
    });
  }

  fetchContractData(_method, _params) {
    return fetchContractDataAnon(_method, this.abi, this.address, _params);
  }

  // fetchContractDataAnon(_method, _params) {
  //   return fetchContractDataAnon(_method, this.abi, this.address, _params);
  // }
}

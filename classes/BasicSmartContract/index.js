import {
  createInst, error, fetchContractData, output,
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

  fetchContractData(_method, _params) {
    return fetchContractData(_method, this.abi, this.address, _params);
  }
}

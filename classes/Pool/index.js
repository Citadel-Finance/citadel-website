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

  async fetchTotalStaked() {
    try {
      const totalStaked = await this.fetchContractData('totalStaked');
      console.log(totalStaked);
      return output({ totalStaked });
    } catch (e) {
      console.log('deposit error', e, this);
      return error(500, 'deposit error', e);
    }
  }

  async deposit(amount) {
    try {
      const r = await this.inst().deposit('100000');
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

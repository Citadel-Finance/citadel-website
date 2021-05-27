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

  async fetchPoolsData() {
    try {
      // equal
      // this.poolData = await this.inst().allPools();
      this.poolData = await this.fetchContractData('allPools');
      return output({
        poolData: this.poolData,
      });
    } catch (e) {
      console.log('fetchPoolsData error', e, this);
      return error(500, 'fetchPoolsData error', e);
    }
  }
}

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

  // async fetchPoolsData() {
  //   try {
  //     // equal
  //     // this.poolData = await this.inst().allPools();
  //     this.poolData = await this.fetchContractData('allPools');
  //     return output({
  //       poolData: this.poolData,
  //     });
  //   } catch (e) {
  //     console.log('fetchPoolsData error', e, this);
  //     return error(500, 'fetchPoolsData error', e);
  //   }
  // }
}

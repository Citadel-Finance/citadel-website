import { createAbstractions, createInsts, initWeb3Provider } from '~/utils/web3';
import Factory from '~/classes/Factory';
import Token from '~/classes/Token';
import Pool from '~/classes/Pool';

export default {
  async connectWallet({ dispatch }) {
    const r = await initWeb3Provider();
    console.log(r);
    if (!r.ok) {
      return;
    }
    await dispatch('initFactory');
    await dispatch('initTokensAndPools');
  },
  async initFactory({ commit }) {
    const factory = new Factory({
      address: '0x58B2Eb581BDEF51086d100B0fBF3FDc0201AF79F', // TODO remove to env
    });
    await factory.initInst();
    const r = await factory.fetchPoolsData();
    if (!r.ok) {
      return;
    }
    commit('setFactory', factory);
  },
  async initTokensAndPools({ getters }) {
    const { poolData } = getters.getFactory;
    console.log('poolData', poolData);

    const tokensAddresses = poolData.map((pair) => pair.token);
    const tokens = tokensAddresses.map((address) => new Token({ address }));
    await Promise.all([...tokens.map((token) => token.initInst())]);
    await Promise.all([...tokens.map((token) => token.fetchAll())]);
    console.log('tokens', tokens);

    const poolsAddresses = poolData.map((pair) => pair.pool);
    const pools = poolsAddresses.map((address) => new Pool({ address }));
    await Promise.all([...pools.map((pool) => pool.initInst())]);
    console.log('pools', pools);
  },
};

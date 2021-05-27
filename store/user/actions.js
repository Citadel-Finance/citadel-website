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
    await dispatch('initPoolsAndTokens');
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
  async initPoolsAndTokens({ getters }) {
    const { poolData } = getters.getFactory;
    const tokensAddresses = poolData.map((pair) => pair.token);
    const poolsAddresses = poolData.map((pair) => pair.pool);
    const tokens = tokensAddresses.map((address) => new Token({ address }));
    const pools = poolsAddresses.map((address) => new Pool({ address }));

    pools.forEach((pool, i) => {
      pool.setChildAddress(tokensAddresses[i]);
    });
    tokens.forEach((token, i) => {
      token.setParrentAddress(poolsAddresses[i]);
    });
    await Promise.all([...tokens.map((token) => token.initInst()), ...pools.map((pool) => pool.initInst())]);
    await Promise.all([...tokens.map((token) => token.fetchAll())]);
    console.log('tokens', tokens);
    console.log('pools', pools);
    console.log('DONE');
    // TODO setChild

    // const r = await pools[0].deposit();
    // console.log('deposit', r);
  },
};

import { initWeb3Provider } from '~/utils/web3';
import Factory from '~/classes/Factory';
import Token from '~/classes/Token';
import Pool from '~/classes/Pool';

export default {
  async connectWallet({ dispatch }) {
    const r = await initWeb3Provider();
    console.log(r);
    if (!r.ok) {
      // TODO show modal
      // await dispatch('modals/show', {
      //   //
      // }, { root: true });

      return r;
    }
    await dispatch('initFactory');
    await dispatch('initPoolsAndTokens');
    return r;
  },
  async initFactory({ commit }) {
    const factory = new Factory({
      address: '0x35d3763CA5d3Db55D363354aD08cb125eCE502b3', // TODO remove to env
    });
    await factory.initInst();
    const r = await factory.fetchPoolsData();
    if (!r.ok) {
      return;
    }
    commit('setFactory', factory);
  },
  async initPoolsAndTokens({ getters, commit }) {
    const { poolData } = getters.getFactory;
    const tokensAddresses = poolData.map((pair) => pair.token);
    const poolsAddresses = poolData.map((pair) => pair.pool);
    const tokens = tokensAddresses.map((address) => new Token({ address }));
    const pools = poolsAddresses.map((address) => new Pool({ address }));

    // pools.forEach((pool, i) => {
    //   pool.setChildAddress(tokensAddresses[i]);
    // });
    tokens.forEach((token, i) => {
      token.setParrentAddress(poolsAddresses[i]);
    });
    await Promise.all([...tokens.map((token) => token.initInst()), ...pools.map((pool) => pool.initInst())]);
    await Promise.all([...tokens.map((token) => token.fetchAll()), ...pools.map((pool) => pool.fetchCommonData())]);
    console.log('tokens', tokens);
    console.log('pools', pools);
    // console.log('DONE');

    const poolsMap = {};
    pools.forEach((pool) => {
      poolsMap[pool.address] = pool;
    });

    const tokensMap = {};
    tokens.forEach((token) => {
      tokensMap[token.address] = token;
    });

    commit('setPoolsMap', poolsMap);
    commit('setTokensMap', tokensMap);

    // const r = await pools[0].deposit();
    // console.log('deposit', r);
  },
};

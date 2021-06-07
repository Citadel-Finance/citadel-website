import BigNumber from 'bignumber.js';
import { initWeb3Provider, initWeb3ProviderAnon } from '~/utils/web3';
import Factory from '~/classes/Factory';
import Token from '~/classes/Token';
import Pool from '~/classes/Pool';

export default {
  async connectAnonNode({ dispatch }) {
    const r = await initWeb3ProviderAnon();
    console.log(r);
    await dispatch('initFactory');
    await Promise.all([
      dispatch('initPoolsAndTokens'),
      dispatch('initCtlToken'),
    ]);
    return r;
  },
  async connectWallet({ dispatch, commit }) {
    const r = await initWeb3Provider();
    console.log(r);
    if (!r.ok) {
      // TODO show modal
      // await dispatch('Modals/show', {
      //   //
      // }, { root: true });

      return r;
    }
    const { userAddress } = r.result;
    commit('setUserAddress', userAddress);
    commit('setIsConnected', true);

    await Promise.all([
      dispatch('initInstsAll'),
      dispatch('fetchPoolsUserData'),
      dispatch('fetchAllBalances'),
    ]);

    dispatch('subscribeAllPools');

    return r;
  },
  async fetchAllBalances({ getters, commit }) {
    const { getTokensMap: tokensMap, getCtlToken: ctlToken } = getters;
    const r = await Promise.all([
      ...Object.keys(tokensMap).map((address) => tokensMap[address].fetchBalance()),
      ctlToken.fetchBalance(),
    ]);
    console.log(123123, r);
    commit('setTokensMap', tokensMap);
    commit('setCtlToken', ctlToken);
  },
  async fetchPoolsUserData({ getters, commit }) {
    const { getPoolsMap: poolsMap } = getters;
    await Promise.all([
      ...Object.keys(poolsMap).map((address) => poolsMap[address].fetchUserData()),
    ]);
    commit('setPoolsMap', poolsMap);
  },
  // async fetchPoolsData({ getters }) {
  //   const { getPoolsMap: poolsMap } = getters;
  //   await Promise.all([
  //     ...Object.keys(poolsMap).map((address) => poolsMap[address].fetchUserData()),
  //   ]);
  // },
  async initInstsAll({ getters }) {
    const {
      getFactory: factory,
      getPoolsMap: poolsMap,
      getTokensMap: tokensMap,
    } = getters;
    console.log(factory, poolsMap, tokensMap);

    await Promise.all([
      ...Object.keys(poolsMap).map((address) => poolsMap[address].initInst()),
      ...Object.keys(tokensMap).map((address) => tokensMap[address].initInst()),
      factory.initInst(),
    ]);
  },
  async initFactory({ commit }) {
    const factory = new Factory({
      address: process.env.ADDRESS_FACTORY,
    });
    await factory.fetchPoolsData();
    commit('setFactory', factory);
  },
  async initCtlToken({ getters, commit }) {
    const { ctlTokenAddress } = getters.getFactory;
    const ctlToken = new Token({ address: ctlTokenAddress });
    await ctlToken.fetchAll();
    await ctlToken.fetchTotalSupply();
    commit('setCtlToken', ctlToken);
  },
  async initPoolsAndTokens({ getters, commit, dispatch }) {
    const { poolData } = getters.getFactory;
    const tokensAddresses = poolData.map((pair) => pair.token);
    const poolsAddresses = poolData.map((pair) => pair.pool);
    const tokens = tokensAddresses.map((address) => new Token({ address }));
    const pools = poolsAddresses.map((address) => new Pool({ address }));

    tokens.forEach((token, i) => {
      token.setParrentAddress(poolsAddresses[i]);
    });

    const poolsMap = {};
    pools.forEach((pool) => {
      poolsMap[pool.address] = pool;
    });

    const tokensMap = {};
    tokens.forEach((token) => {
      tokensMap[token.address] = token;
    });

    await Promise.all([...tokens.map((token) => token.fetchAll()), ...pools.map((pool) => pool.fetchAll())]);
    commit('setPoolsMap', poolsMap);
    commit('setTokensMap', tokensMap);
  },

  async poolDeposit({ getters }, { amount, poolAddress }) {
    const poolsMap = getters.getPoolsMap;
    const tokensMap = getters.getTokensMap;
    const pool = poolsMap[poolAddress];
    const tokenAddress = pool.childAddress;
    const token = tokensMap[tokenAddress];
    const bnAmount = new BigNumber(amount).shiftedBy(token.decimals).toString();
    const { result } = await token.allowance(poolAddress);
    const { allowance } = result;
    console.log('allowance', allowance, amount);
    if (+allowance < +amount) {
      const approveRes = await token.approve(poolAddress, bnAmount);
      if (!approveRes.ok) {
        console.log('approve error');
        return;
      }
      console.log(approveRes);
    }
    const depositRes = await pool.deposit(bnAmount);
    console.log(depositRes);
    console.log('DONE');
  },

  async poolWithdraw({ getters }, { amount, poolAddress }) {
    const poolsMap = getters.getPoolsMap;
    const pool = poolsMap[poolAddress];
    const bnAmount = new BigNumber(amount).shiftedBy(+pool.decimals).toString();
    const withdrawRes = await pool.withdraw(bnAmount);
    console.log(withdrawRes);
    console.log('DONE');
  },

  subscribeAllPools({ getters, commit }) {
    const poolsMap = getters.getPoolsMap;
    Object.keys(poolsMap).forEach((address) => {
      const pool = poolsMap[address];
      pool.subscribeEvents('Deposited', (r) => {
        commit('pushPoolsEventsMap', {
          key: address,
          value: r,
        });
      });
      pool.subscribeEvents('Withdrew', (r) => {
        commit('pushPoolsEventsMap', {
          key: address,
          value: r,
        });
      });
    });
  },

  createPool({ getters }, payload) {
    const factory = getters.getFactory;
    factory.createPool(payload);
  },
};

import BigNumber from 'bignumber.js';
import { initWeb3Provider, initWeb3ProviderAnon, startPingingMetamask } from '~/utils/web3';
import Factory from '~/classes/Factory';
import Token from '~/classes/Token';
import Pool from '~/classes/Pool';
import modals from '~/store/modals/modals';
import { shiftedBy } from '~/utils/helpers';

const { ADDRESS_FACTORY } = process.env;

export default {
  async disconnectWallet({ commit }) {
    commit('setIsConnected', false);
    commit('setUserAddress', '');
    commit('setIsUserAdmin', false);
  },
  async connectAnonNode({ dispatch }) {
    const r = await initWeb3ProviderAnon();
    // console.log(r);
    await dispatch('initFactory');
    await Promise.all([
      dispatch('initPoolsAndTokens'),
      dispatch('initCtlToken'),
    ]);
    return r;
  },
  async connectWallet({ dispatch, commit }) {
    const r = await initWeb3Provider();
    // console.log(r);
    if (!r.ok) {
      // TODO show modal
      if (r.code === 4001) {
        await dispatch('modals/show', {
          key: modals.status,
          title: 'Error',
          status: 'error',
          text: 'User rejected the request.',
        }, { root: true });
      } else if (r.code === 1) {
        await dispatch('modals/show', {
          key: modals.status,
          title: 'Error',
          status: 'error',
          text: 'Invalid chain.',
        }, { root: true });
      }
      return r;
    }
    const { userAddress } = r.result;
    commit('setUserAddress', userAddress);
    dispatch('subscribeAllPools');

    startPingingMetamask(() => {
      dispatch('disconnectWallet');
    });

    await Promise.all([
      dispatch('initInstsAll'),
      dispatch('fetchPoolsUserData'),
      dispatch('fetchAllBalances'),
      dispatch('updateRewardData'),
      dispatch('fetchIsUserAdmin'),
    ]);
    commit('setIsConnected', true);

    return r;
  },
  async fetchIsUserAdmin({ getters, commit }) {
    const { getFactory: factory } = getters;
    const r = await factory.fetchIsUserAdmin();
    const adminStatus = r.result.isUserAdmin;
    commit('setIsUserAdmin', adminStatus);
  },
  async updatePoolsAndBalances({ dispatch }) {
    await Promise.all([
      dispatch('fetchPools'),
      dispatch('fetchAllBalances'),
    ]);
  },
  async fetchPools({ getters, commit, state }) {
    const { getPoolsMap: poolsMap } = getters;
    await Promise.all([
      ...(() => {
        if (!getters.getIsConnected) {
          return [];
        }
        return Object.keys(poolsMap).map((address) => poolsMap[address].fetchUserData());
      })(),
      ...Object.keys(poolsMap).map((address) => poolsMap[address].fetchAll()),
    ]);
    commit('setPoolsMap', poolsMap);
  },
  async fetchAllBalances({ getters, commit }) {
    const { getTokensMap: tokensMap, getCtlToken: ctlToken } = getters;
    if (!getters.getIsConnected) {
      return;
    }
    await Promise.all([
      ...Object.keys(tokensMap).map((address) => tokensMap[address].fetchBalance()),
      ctlToken.fetchBalance(),
    ]);
    commit('setTokensMap', tokensMap);
    commit('setCtlToken', {});
    commit('setCtlToken', ctlToken);
  },
  async fetchPoolsUserData({ getters, commit }) {
    const { getPoolsMap: poolsMap } = getters;
    await Promise.all([
      ...Object.keys(poolsMap).map((address) => poolsMap[address].fetchUserData()),
    ]);
    commit('setPoolsMap', poolsMap);
  },
  async initInstsAll({ getters }) {
    const {
      getFactory: factory,
      getPoolsMap: poolsMap,
      getTokensMap: tokensMap,
    } = getters;

    await Promise.all([
      ...Object.keys(poolsMap).map((address) => poolsMap[address].initInst()),
      ...Object.keys(tokensMap).map((address) => tokensMap[address].initInst()),
      factory.initInst(),
    ]);
  },
  async updatePoolsData({ commit, getters, dispatch }) {
    const { getFactory: factory, getPoolsMap: poolsMap } = getters;
    const r = await factory.fetchPoolsData();
    const { poolData } = r.result;
    // console.log('updatePoolsData', poolData);
    commit('setPoolsData', poolData);

    const poolsAddresses = Object.keys(poolsMap);
    const newAddresses = poolData.map(({ pool, token }) => ({ pool, token }));
    const missingAddresses = newAddresses.reduce((accumulator, el) => {
      if (poolsAddresses.includes(el.pool)) {
        return accumulator;
      }
      return [...accumulator, el];
    }, []);
    if (missingAddresses.length !== 0) {
      dispatch('initPoolsByAddresses', { addresses: missingAddresses });
    }
  },
  async initPoolsByAddresses({ commit, getters }, payload) {
    const { addresses } = payload;
    const { getIsConnected: isConnected } = getters;
    console.log('initPoolsByAddresses', addresses);
    const tokensAddresses = addresses.map((pair) => pair.token);
    const poolsAddresses = addresses.map((pair) => pair.pool);
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
    await Promise.all([
      ...tokens.map((token) => token.fetchAll()),
      ...pools.map((pool) => pool.fetchCommonData()),
      ...pools.map((pool) => pool.fetchTop()),
    ]);
    if (isConnected) {
      await Promise.all([
        ...pools.map((pool) => pool.initInst()),
        ...tokens.map((token) => token.initInst()),
        ...pools.map((pool) => pool.fetchUserData()),
        ...tokens.map((token) => token.fetchBalance()),
      ]);
    }
    console.log('poolsMap', poolsMap);
    console.log('tokensMap', tokensMap);
    commit('setPoolsMap', poolsMap);
    commit('setTokensMap', tokensMap);
  },
  async updateRewardData({ commit, getters }) {
    const { getFactory: factory, getCtlToken: ctlToken } = getters;
    const r = await Promise.all([
      factory.fetchTotalAvailableReward(),
      factory.fetchPoolsAvailableReward(),
    ]);
    // console.log('fetchPoolsAvailableReward', r[1].result);
    const availableCtlReward = shiftedBy(r[0].result, -ctlToken.decimals);
    commit('setAvailableCtlReward', availableCtlReward);
    commit('setAvailablePoolsReward', r[1].result);
  },
  async initFactory({ commit }) {
    const factory = new Factory({
      address: ADDRESS_FACTORY,
    });
    const r = await Promise.all([
      factory.fetchPoolsData(),
      factory.fetchCtlAddress(),
    ]);
    commit('setPoolsData', r[0].result.poolData);
    commit('setFactory', factory);
  },
  async initCtlToken({ getters, commit }) {
    const { ctlTokenAddress } = getters.getFactory;
    const ctlToken = new Token({ address: ctlTokenAddress });
    await ctlToken.fetchAll();
    await ctlToken.fetchTotalSupply();
    commit('setCtlToken', ctlToken);
  },
  async initPoolsAndTokens({ getters, commit }) {
    const { getPoolsData: poolData } = getters;
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
    await Promise.all([...tokens.map((token) => token.fetchAll()), ...pools.map((pool) => pool.fetchCommonData())]);
    await Promise.all([...pools.map((pool) => pool.fetchTop())]);
    commit('setPoolsMap', poolsMap);
    commit('setTokensMap', tokensMap);
  },

  async poolDeposit({ getters, dispatch }, { amount, poolAddress }) {
    const poolsMap = getters.getPoolsMap;
    const tokensMap = getters.getTokensMap;
    const pool = poolsMap[poolAddress];
    const tokenAddress = pool.childAddress;
    const token = tokensMap[tokenAddress];
    const bnAmount = new BigNumber(amount).shiftedBy(token.decimals).toString();
    const bnMaxApprove = new BigNumber('1000000000').shiftedBy(token.decimals).toString();
    const { result } = await token.allowance(poolAddress);
    const { allowance } = result;
    // console.log('allowance', allowance, amount);
    if (+allowance < +amount) {
      const approveRes = await token.approve(poolAddress, bnMaxApprove);
      if (!approveRes.ok) {
        if (approveRes.code === 500) {
          console.log('approve error');
          await dispatch('modals/show', {
            key: modals.status,
            title: 'Error',
            status: 'error',
            text: 'User denied transaction signature.',
          }, { root: true });
        }
        return;
      }
      console.log(approveRes);
    }
    const depositRes = await pool.deposit(bnAmount);
    if (!depositRes.ok) {
      if (depositRes.code === 500) {
        await dispatch('modals/show', {
          key: modals.status,
          title: 'Error',
          status: 'error',
          text: 'User denied transaction signature.',
        }, { root: true });
      }
      return;
    }
    await dispatch('modals/show', {
      key: modals.status,
      title: 'Success',
      status: 'success',
      text: 'Your funds are deposited.',
    }, { root: true });
    console.log(depositRes);
    console.log('DONE');
  },

  async poolWithdraw({ getters, dispatch }, { amount, poolAddress }) {
    const poolsMap = getters.getPoolsMap;
    const pool = poolsMap[poolAddress];
    const bnAmount = new BigNumber(amount).shiftedBy(+pool.decimals).toString();
    const withdrawRes = await pool.withdraw(bnAmount);
    console.log(withdrawRes);
    if (!withdrawRes.ok) {
      if (withdrawRes.code === 500) {
        console.log('withdraw error');
        await dispatch('modals/show', {
          key: modals.status,
          title: 'Error',
          status: 'error',
          text: 'User denied transaction signature.',
        }, { root: true });
        return;
      }
    }
    console.log('DONE');
    await dispatch('modals/show', {
      key: modals.status,
      title: 'Success',
      status: 'success',
      text: 'Your funds are withdrew.',
    }, { root: true });
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
      // pool.subscribeEvents('totalHistory', (r) => {
      //   console.log(r);
      // });
    });
  },
  async createPool({ getters }, payload) {
    const { getFactory: factory } = getters;
    await factory.createPool(payload);
  },
  async editPool({ getters, dispatch }, payload) {
    const { poolAddress } = payload;
    const { getPoolsMap: poolsMap } = getters;
    const pool = poolsMap[poolAddress];
    await pool.editPool(payload);
    // await dispatch('modals/show', {
    //   key: modals.status,
    //   title: 'Success',
    //   status: 'success',
    //   text: 'Pool has been edited.',
    // }, { root: true });
  },

  claimAll({ getters }) {
    const { getFactory: factory } = getters;
    return factory.claimAll();
  },
};

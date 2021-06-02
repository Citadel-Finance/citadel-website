import BigNumber from 'bignumber.js';
import { initWeb3Provider } from '~/utils/web3';
import Factory from '~/classes/Factory';
import Token from '~/classes/Token';
import Pool from '~/classes/Pool';

export default {
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
    commit('setIsConnected', true);
    await dispatch('initFactory');
    await Promise.all([
      dispatch('initPoolsAndTokens'),
      dispatch('initCtlToken'),
    ]);
    const { userAddress } = r.result;
    commit('setUserAddress', userAddress);
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
  async initCtlToken({ getters, commit }) {
    const { ctlTokenAddress } = getters.getFactory;
    console.log('ctlTokenAddress', ctlTokenAddress);
    const ctlToken = new Token({ address: ctlTokenAddress });
    await ctlToken.initInst();
    await ctlToken.fetchAll();
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
    commit('setPoolsMap', poolsMap);
    commit('setTokensMap', tokensMap);

    await Promise.all([...tokens.map((token) => token.initInst()), ...pools.map((pool) => pool.initInst())]);
    await Promise.all([...tokens.map((token) => token.fetchAll()), ...pools.map((pool) => pool.fetchAll())]);

    dispatch('subscribeAllPools');

    // dispatch('subscribeAllPools');
    // setTimeout(() => {
    //   commit('setPoolsEventsMap', {});
    //   dispatch('subscribeAllPools');
    // }, 5000);
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
  async poolWithdrawOld({ getters }, { amount, poolAddress }) {
    const poolsMap = getters.getPoolsMap;
    const tokensMap = getters.getTokensMap;
    const pool = poolsMap[poolAddress];
    const tokenAddress = pool.childAddress;
    const token = tokensMap[tokenAddress];
    const bnAmount = new BigNumber(amount).shiftedBy(token.decimals).toString();
    const { result } = await token.allowance(poolAddress);
    const { allowance } = result;
    console.log('allowance', allowance, amount);
    // if (+allowance < +amount) {
    //   const approveRes = await token.approve(poolAddress, bnAmount);
    //   if (!approveRes.ok) {
    //     console.log('approve error');
    //     return;
    //   }
    //   console.log(approveRes);
    // }
    // const depositRes = await pool.withdraw(bnAmount);
    // console.log(depositRes);
    // console.log('DONE');
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
};

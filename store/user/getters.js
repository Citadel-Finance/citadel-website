export default {
  getIsConnected: (state) => state.isConnected,
  getUserAddress: (state) => state.userAddress,
  getFactory: (state) => state.factory,
  getPoolsMap: (state) => state.poolsMap,
  getTokensMap: (state) => state.tokensMap,
  getCtlToken: (state) => state.ctlToken,
  getPoolsEventsMap: (state) => state.poolsEventsMap,
  getPoolsEventsAll: ({ poolsEventsMap }) => {
    const r = Object.keys(poolsEventsMap).reduce((accumulator, address) => [
      ...accumulator,
      ...poolsEventsMap[address],
    ].sort((a, b) => b.blockNumber - a.blockNumber), []);
    console.log(r);
    return r;
  },
};

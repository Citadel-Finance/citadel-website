export default {
  setIsConnected(state, payload) {
    state.isConnected = payload;
  },
  setUserAddress(state, payload) {
    state.userAddress = payload;
  },
  setFactory(state, payload) {
    state.factory = payload;
  },
  setPoolsMap(state, payload) {
    state.poolsMap = payload;
  },
  setTokensMap(state, payload) {
    state.tokensMap = payload;
  },
};

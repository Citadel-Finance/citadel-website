export default {
  setIsConnected(state, payload) {
    state.isConnected = payload;
  },
  setUserAddress(state, payload) {
    state.userAddress = payload;
  },
  setIsUserAdmin(state, payload) {
    state.isUserAdmin = payload;
  },
  setFactory(state, payload) {
    state.factory = payload;
  },
  setCtlToken(state, payload) {
    state.ctlToken = payload;
  },
  setPoolsMap(state, payload) {
    state.poolsMap = {
      ...state.poolsMap,
      ...payload,
    };
  },
  setTokensMap(state, payload) {
    state.tokensMap = {
      ...state.tokensMap,
      ...payload,
    };
  },
  setPoolsEventsMap(state, payload) {
    state.poolsEventsMap = payload;
  },
  pushPoolsEventsMap(state, payload) {
    const { poolsEventsMap } = state;
    const items = Object.keys(poolsEventsMap).reduce((accumulator, address) => [
      ...accumulator,
      ...poolsEventsMap[address],
    ], []);
    let isHashExists = false;
    items.forEach((item) => {
      isHashExists = item.transactionHash === payload.value.transactionHash;
    });
    if (isHashExists) {
      return;
    }
    let events;
    if (state.poolsEventsMap[payload.key]) {
      events = [...state.poolsEventsMap[payload.key], payload.value];
    } else {
      events = [payload.value];
    }
    state.poolsEventsMap = {
      ...state.poolsEventsMap,
      [payload.key]: events,
    };
  },
  setPoolsData(state, payload) {
    state.poolsData = payload;
  },
  setAvailableCtlReward(state, payload) {
    state.availableCtlReward = payload;
  },
  setAvailablePoolsReward(state, payload) {
    state.availablePoolsReward = payload;
  },
  setIsUserAdmin(state, payload) {
    state.isUserAdmin = payload;
  },
};

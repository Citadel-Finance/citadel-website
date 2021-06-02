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
    // TODO check hash
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
};

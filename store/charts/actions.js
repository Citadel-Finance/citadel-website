import BigNumber from 'bignumber.js';
import axios from 'axios';

export default {
  async fetchTotalDeposited({ commit }) {
    try {
      const r = await axios.get('http://192.168.88.117:3000/api/v1/graph/totalDeposited/all');
      console.log(r);
      commit('setTotalStakedData', r.data.result.data);
    } catch (e) {
      console.log(e);
    }
  },
};

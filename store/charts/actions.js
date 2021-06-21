export default {
  async fetchTotalStaked({ commit }, payload) {
    try {
      const { poolAddress, chartName, periodType } = payload;
      const r = await this.$axios.get(`/v1/graph/${poolAddress}/${chartName}/${periodType}`);
      console.log(r);
      commit('setTotalStakedData', r.data.result.data);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchTotalEarnings({ commit }, payload) {
    try {
      const { poolAddress, chartName, periodType } = payload;
      const r = await this.$axios.get(`/v1/graph/${poolAddress}/${chartName}/${periodType}`);
      console.log(r);
      commit('setTotalEarningsData', r.data.result.data);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchTotalBorrowed({ commit }, payload) {
    try {
      const { poolAddress, chartName, periodType } = payload;
      const r = await this.$axios.get(`/v1/graph/${poolAddress}/${chartName}/${periodType}`);
      console.log(r);
      commit('setTotalBorrowedData', r.data.result.data);
    } catch (e) {
      console.log(e);
    }
  },
};

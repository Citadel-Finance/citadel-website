export default {
  async fetchTotalDeposited({ commit }, payload) {
    try {
      const { chartName, periodType } = payload;
      const r = await this.$axios.get(`/v1/graph/totalDeposited/${periodType}`);
      console.log(r);
      commit('setTotalStakedData', r.data.result.data);
    } catch (e) {
      console.log(e);
    }
  },
};

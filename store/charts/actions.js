export default {
  async fetchTotalCharts({ commit }, payload) {
    try {
      const { chartName, periodType } = payload;
      const r = await this.$axios.get(`/v1/graph/${chartName}/${periodType}`);
      console.log(r);
      commit('setTotalStakedData', r.data.result.data);
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  async fetchTotalChartsData({ commit }, payload) {
    try {
      const { poolAddress, chartName, periodType } = payload;
      const r = await this.$axios.get(`/v1/graph/${poolAddress}/${chartName}/${periodType}`);
      const keys = {
        deposited: 'setTotalStakedData',
        profit: 'setTotalEarningsData',
        borrowed: 'setTotalBorrowedData',
      };
      commit(keys[chartName], r.data.result.data);
    } catch (e) {
      console.log(e);
    }
  },
};

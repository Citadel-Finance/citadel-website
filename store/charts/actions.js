export default {
  async fetchTotalChartsData({ commit }, payload) {
    try {
      const { poolAddress, chartName, periodType } = payload;
      const r = await this.$axios.get(`/v1/graph/${poolAddress}/${chartName}/${periodType}`);
      if (chartName === 'deposited') {
        commit('setTotalStakedData', r.data.result.data);
      } else if (chartName === 'profit') {
        commit('setTotalEarningsData', r.data.result.data);
      } else if (chartName === 'borrowed') {
        commit('setTotalBorrowedData', r.data.result.data);
      }

      // const keys = {
      //   deposited: 'setTotalStakedData',
      //   profit: 'setTotalEarningsData',
      //   borrowed: 'setTotalBorrowedData',
      // };
      // commit(keys[chartName], r.data.result.data);
    } catch (e) {
      console.log(e);
    }
  },
};

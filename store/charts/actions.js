import BigNumber from 'bignumber.js';

export default {
  async fetchTotalDeposited({ commit }) {
    const r = { ok: true, result: [{ date: '2021-06-15', value: '208' }, { date: '2021-06-14', value: '954' }, { date: '2021-06-13', value: '917' }, { date: '2021-06-12', value: '771' }, { date: '2021-06-11', value: '933' }, { date: '2021-06-10', value: '963' }, { date: '2021-06-09', value: '824' }, { date: '2021-06-08', value: '888' }, { date: '2021-06-07', value: '925' }, { date: '2021-06-06', value: '870' }, { date: '2021-06-05', value: '783' }, { date: '2021-06-04', value: '881' }, { date: '2021-06-03', value: '1058' }, { date: '2021-06-02', value: '1107' }] };
    // console.log('fetchTotalDeposited', r);
    commit('setTotalStakedData', r.result);
  },
};

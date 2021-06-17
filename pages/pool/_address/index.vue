<template>
  <div class="content__container">
    <Menu />
    <div class="content__charts">
      <Chart
        title="Total deposited"
        :value="`${ Floor(totalProfit) } ${ pool.symbol }`"
        :chart-data="totalStakedDataChart"
        is-active="day"
      />
      <Chart
        title="Total earnings"
        :value="`${ Floor(totalStaked) } ${ pool.symbol }`"
        :chart-data="chartData"
      />
      <Chart
        title="Total borrowed"
        :value="`- ${ pool.symbol }`"
        :chart-data="formChartData([])"
      />
    </div>
    <div class="content__main">
      <Stats
        :balance="`${Floor(balance, 4)} ${symbol}`"
        :title="`${balance}`"
      />
      <Providers />
    </div>
    <Transaction />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { shiftedBy } from '~/utils/helpers';
import Menu from '~/components/App/Menu';
import Chart from '~/components/App/Chart';
import Stats from '~/components/App/Stats';
import Providers from '~/components/App/Providers';
import Transaction from '~/components/App/Transaction';

export default {
  name: 'Pool',
  components: {
    Menu,
    Chart,
    Stats,
    Providers,
    Transaction,
  },
  data: () => ({
    balance: '',
    symbol: '',
    labels: [1620360000000, 1620446410000, 1620532810000, 1620619200000, 1620705610000, 1620792010000, 1620878410000, 1620964810000, 1621051210000, 1621137600000, 1621224010000, 1621310400000, 1621396800000, 1621483210000, 1621569610000, 1621656010000, 1621742400000, 1621828810000, 1621915200000, 1622433600000, 1622520000000, 1622606400000, 1622692800000, 1622779200000, 1622865600000, 1622952000000, 1623038400000, 1623124800000, 1623211200000, 1623297600000],
    data: [64079273.3983, 64585025.1455, 66121702.9563, 63880091.4611, 65418465.9871, 66975753.0015, 68506915.9913, 65444097.2677, 66989038.9646, 68516066.8683, 70087684.306, 66442391.304, 67984373.9482, 69513900.4724, 67372740.3647, 68908033.2291, 70042783.7205, 71576449.7653, 69361962.5405, 69719197.8156, 71293396.1984, 72450786.6569, 74070108.1144, 70958476.7309, 72569244.5604, 74179763.9885, 71395586.4449, 72969572.6211, 74244010.609, 75864311.9873],
    chartData: {
      labels: [1620360000000, 1620446410000, 1620532810000, 1620619200000, 1620705610000, 1620792010000, 1620878410000, 1620964810000, 1621051210000, 1621137600000, 1621224010000, 1621310400000, 1621396800000, 1621483210000, 1621569610000, 1621656010000, 1621742400000, 1621828810000, 1621915200000, 1622433600000, 1622520000000, 1622606400000, 1622692800000, 1622779200000, 1622865600000, 1622952000000, 1623038400000, 1623124800000, 1623211200000, 1623297600000],
      datasets: [
        {
          label: 'all',
          borderColor: '#C31433',
          data: [54079273.3983, 64585025.1455, 66121702.9563, 63880091.4611, 65418465.9871, 66975753.0015, 68506915.9913, 55444097.2677, 66989038.9646, 68516066.8683, 70087684.306, 66442391.304, 67984373.9482, 69513900.4724, 67372740.3647, 68908033.2291, 70042783.7205, 71576449.7653, 69361962.5405, 69719197.8156, 71293396.1984, 72450786.6569, 74070108.1144, 70958476.7309, 72569244.5604, 74179763.9885, 71395586.4449, 72969572.6211, 74244010.609, 75864311.9873],
          borderWidth: 2,
          fill: true,
          backgroundColor: 'rgba(195,20,51,0.05)',
          pointBackgroundColor: '#F9F8FB',
          pointBorderColor: '#C31433',
          pointBorderWidth: 1,
          pointRadius: 2,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: '#F9F8FB',
        },
      ],
    },
  }),
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
      totalStakedData: 'charts/getTotalStakedData',
      tokensMap: 'user/getTokensMap',
    }),
    poolAddress() {
      return this.$route.params?.address ?? '';
    },
    pool() {
      return this.poolsMap[this.poolAddress] || false;
    },
    totalStaked() {
      const { pool } = this;
      return pool && pool.getTotalStaked();
    },
    totalProfit() {
      const { pool } = this;
      return pool && pool.getTotalProfit();
    },
    totalStakedDataChart() {
      const { totalStakedData } = this;
      if (totalStakedData.length === 0) {
        return {};
      }
      return this.formChartData(totalStakedData);
    },
  },
  async mounted() {
    await this.fetchTotalCharts({
      periodType: 'all',
      chartName: 'total-deposited',
    });
  },
  methods: {
    ...mapActions({
      fetchTotalCharts: 'charts/fetchTotalCharts',
    }),
    formChartData(data) {
      const labels = data.map((el) => new Date(el.createdAt).getTime());
      const dataParsed = data.map((el) => shiftedBy(el.value, -18));
      return {
        labels,
        datasets: [
          {
            label: 'all',
            borderColor: '#C31433',
            data: dataParsed,
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(195,20,51,0.05)',
            pointBackgroundColor: '#F9F8FB',
            pointBorderColor: '#C31433',
            pointBorderWidth: 1,
            pointRadius: 2,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: '#F9F8FB',
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>

.content {
  &__container {
    display: grid;
    grid-gap: 30px;
    width: 100%;
    margin: auto;
    max-width: 1170px;
  }
  &__charts {
    width: 100%;
    max-width: 1170px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
  &__main {
    display: flex;
    grid-gap: 30px;
    justify-content: space-between;
    max-width: 1170px;
  }
}
</style>

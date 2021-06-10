<template>
  <div class="content__container">
    <Menu />
    <!--    <line-chart />-->
    <line-chart
      :data="chartData"
      :options="options"
    />
    <!--    <Chart />-->
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
import { mapGetters } from 'vuex';
import Menu from '~/components/App/Menu';
// import Chart from '~/components/App/Chart';
import Stats from '~/components/App/Stats';
import Providers from '~/components/App/Providers';
import Transaction from '~/components/App/Transaction';
import LineChart from '~/components/App/LineChart';

export default {
  name: 'Pool',
  components: {
    Menu,
    // Chart,
    LineChart,
    Stats,
    Providers,
    Transaction,
  },
  data: () => ({
    balance: '',
    symbol: '',
    chartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
      tokensMap: 'user/getTokensMap',
    }),
    poolAddress() {
      return this.$route.params.address;
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
  &__main {
    display: flex;
    grid-gap: 30px;
    justify-content: space-between;
    max-width: 1170px;
  }
}
</style>

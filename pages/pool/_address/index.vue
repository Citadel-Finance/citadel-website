<template>
  <div class="content__container">
    <Menu />
    <Chart />
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

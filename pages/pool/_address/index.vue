<template>
  <div class="content__container">
    <Settings />
    <Chart />
    <div class="main">
      <Deposit
        :balance="`${Floor(balance, 4)} ${symbol}`"
        :title="`${balance}`"
      />
      <Keepers />
    </div>
    <Transaction />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Settings from '~/components/App/Settings';
import Keepers from '~/components/App/Keepers';
import Deposit from '~/components/App/Deposit';
import Transaction from '~/components/App/Transaction';
import Chart from '~/components/App/Chart';

export default {
  name: 'Pool',
  components: {
    Chart,
    Settings,
    Keepers,
    Deposit,
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
}
.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin: auto;
  max-width: 1170px;
}
</style>

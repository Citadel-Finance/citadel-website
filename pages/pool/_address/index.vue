<template>
  <div>
    <Header />
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
import Header from '~/components/App/Header';
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
    Header,
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
  async mounted() {
    this.SetLoader(true);
    const r = await this.$store.dispatch('user/connectWallet');
    if (!r.ok) {
      return;
    }
    // this.poolAddress = this.$route.params.address;
    this.balance = this.poolsMap[this.poolAddress].userStaked;
    this.symbol = this.tokensMap[this.poolsMap[this.poolAddress].childAddress].symbol;
    this.SetLoader(false);
  },
};
</script>

<style lang="scss" scoped>

.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin: auto;
  max-width: 1170px;
}
</style>

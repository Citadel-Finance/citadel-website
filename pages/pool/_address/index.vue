<template>
  <div>
    <Header />
    <Settings />
    <Chart />
    <Deposit :balance="`${balance} ${symbol}`" />
    <Transaction />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '~/components/App/Header';
import Settings from '~/components/App/Settings';
import Deposit from '~/components/App/Deposit';
import Transaction from '~/components/App/Transaction';
import Chart from '~/components/App/Chart';

export default {
  name: 'Pool',
  components: {
    Chart,
    Settings,
    Header,
    Deposit,
    Transaction,
  },
  data: () => ({
    poolAddress: '',
    balance: '',
    symbol: '',
  }),
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
      tokensMap: 'user/getTokensMap',
    }),
  },
  async mounted() {
    this.SetLoader(true);
    const r = await this.$store.dispatch('user/connectWallet');
    if (!r.ok) {
      return;
    }
    this.poolAddress = this.$route.params.address;
    this.balance = this.tokensMap[this.poolsMap[this.poolAddress].childAddress].balance;
    this.symbol = this.tokensMap[this.poolsMap[this.poolAddress].childAddress].symbol;
    this.SetLoader(false);
  },
};
</script>

<style lang="scss" scoped>
.index__container {
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 1170px;
}
</style>

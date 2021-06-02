<template>
  <div>
    <Header />
    <div class="index__container">
      <Balance />
      <Keepers />
    </div>
    <!--    <button-->
    <!--      class="btn btn-primary"-->
    <!--      @click="testDeposit"-->
    <!--    >-->
    <!--      test-->
    <!--    </button>-->
    <Pools />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../components/App/Header';
import Balance from '../components/App/Balance';
import Pools from '../components/App/Pools';
import Keepers from '../components/App/Keepers';

export default {
  components: {
    Keepers,
    Header,
    Balance,
    Pools,
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
      poolsMap: 'user/getPoolsMap',
      tokensMap: 'user/getTokensMap',
      ctlToken: 'user/getCtlToken',
    }),
  },
  async mounted() {
    // console.log('DONE');
    // console.log(this.tokensMap);
    // console.log(this.poolsMap);
    // this.SetLoader(true);
    const r = await this.$store.dispatch('user/connectWallet');
    if (!r.ok) {
      return;
    }
    this.SetLoader(false);
  },
  methods: {
    async testDeposit() {
      const amount = 3;
      const poolAddress = Object.keys(this.poolsMap)[1];
      this.SetLoader(true);
      await this.$store.dispatch('user/poolDeposit', {
        amount,
        poolAddress,
      });
      this.SetLoader(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.index__container {
  display: flex;
  grid-gap: 30px;
  margin: auto;
  max-width: 1170px;
}
</style>

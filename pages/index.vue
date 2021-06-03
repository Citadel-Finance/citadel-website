<template>
  <div>
    <Header />
    <div class="index__container">
      <Balance />
    </div>
    <Pools />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../components/App/Header';
import Balance from '../components/App/Balance';
import Pools from '../components/App/Pools';

export default {
  components: {
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
    // this.SetLoader(true);
    // const r = await this.$store.dispatch('user/connectWallet');
    // if (!r.ok) {
    //   return;
    // }
    // this.SetLoader(false);
  },
};
</script>

<style lang="scss" scoped>
.index__container {
  width: 100%;
  margin: auto;
  max-width: 1170px;
}
</style>

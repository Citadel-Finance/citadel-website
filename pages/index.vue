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
import BigNumber from 'bignumber.js';
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
    }),
  },
  async mounted() {
    this.SetLoader(true);
    const r = await this.$store.dispatch('user/connectWallet');
    console.log('DONE');
    this.SetLoader(false);
  },
  methods: {
    async testDeposit() {
      const amount = 11;
      const poolAddress = Object.keys(this.poolsMap)[0];

      const pool = this.poolsMap[poolAddress];
      const tokenAddress = pool.childAddress;
      const token = this.tokensMap[tokenAddress];

      const bnAmount = new BigNumber(amount).shiftedBy(token.decimals).toString();

      const { result } = await token.allowance(poolAddress);
      const { allowance } = result;
      console.log('allowance', allowance, amount);

      if (allowance < amount) {
        const approveRes = await token.approve(poolAddress, bnAmount);
        if (!approveRes.ok) {
          console.log('approve error');
          return;
        }
        console.log(approveRes);
      }

      const depositRes = await pool.deposit(bnAmount);
      console.log(depositRes);
      console.log('DONE');
    },
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

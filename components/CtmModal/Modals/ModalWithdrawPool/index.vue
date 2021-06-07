<template>
  <ctm-modal-box title="Withdraw pool">
    <div class="ctm-modal__main main">
      <div class="main__title">
        Amount
      </div>
      <base-input
        v-model="amount"
        :placeholder="`Amount in ${symbol}`"
        :description="'MAX'"
        @handleClickBtn="setMax"
      />
      <div class="main__balance max">
        <div class="max__title">
          Max:
        </div>
        <div class="max__value">
          {{ balance + ' ' + symbol }}
        </div>
      </div>
      <div class="main__buttons">
        <base-btn
          mode="secondary"
          @click="close"
        >
          Close
        </base-btn>
        <base-btn
          mode="primary"
          @click="withdraw"
        >
          Withdraw
        </base-btn>
      </div>
    </div>
  </ctm-modal-box>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    isUnclosable: {
      type: Boolean,
      default: false,
    },
    isHeader: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    amount: '',
  }),
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
      poolsMap: 'user/getPoolsMap',
      tokensMap: 'user/getTokensMap',
    }),
    poolAddress() {
      return this.$route.params?.address ?? '';
    },
    pool() {
      return this.poolsMap[this.poolAddress];
    },
    token() {
      return this.tokensMap[this.pool.childAddress];
    },
    balance() {
      return this.token.balance;
    },
    symbol() {
      return this.token.symbol;
    },
  },
  methods: {
    setMax() {
      this.amount = this.pool.userStaked;
    },
    close() {
      this.$store.dispatch('modals/hide');
    },
    async withdraw() {
      const { amount } = this;
      const poolAddress = this.$route.params.address;
      this.SetLoader(true);
      await this.$store.dispatch('user/poolWithdraw', {
        amount,
        poolAddress,
      });
      this.close();
      this.SetLoader(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}
.main {
  padding: 20px;
  &__title {
    margin: 0 0 10px;
    color: #240A36;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 15px;
  }
}
.max {
  display: flex;
  grid-gap: 8px;
  margin-bottom: 30px;
  &__title {
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
  }
  &__value {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #240A36;
  }
}
</style>

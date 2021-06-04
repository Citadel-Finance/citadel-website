<template>
  <div class="ctm-modal__box">
    <div
      v-if="isHeader === true"
      class="ctm-modal__header"
    >
      <div class="ctm-modal__title">
        {{ title || options.title || 'Deposit' }}
      </div>
      <button
        v-if="!options.isUnclosable"
        class="ctm-modal__x"
        @click="close()"
      >
        <img
          src="~/assets/x.svg"
          alt="x"
        >
      </button>
    </div>
    <div class="deposit-modal__main">
      <div class="deposit-modal__title">
        Amount
      </div>
      <base-input
        v-model="amount"
        :placeholder="`Amount in ${symbol}`"
        :description="'MAX'"
        :max="balance"
        @handleClick="setMax()"
      />
      <div class="deposit-modal__balance balance">
        <div class="balance__title">
          Your balance:
        </div>
        <div class="balance__value">
          {{ balance }} {{ symbol }}
        </div>
      </div>
      <div class="deposit-modal__buttons">
        <base-btn
          mode="secondary"
          @click="close"
        >
          Close
        </base-btn>
        <base-btn @click="deposit">
          Deposit
        </base-btn>
      </div>
    </div>
  </div>
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

    close() {
      this.$store.dispatch('modals/hide');
    },
    async deposit() {
      const { amount } = this;
      const poolAddress = this.$route.params.address;
      this.SetLoader(true);
      await this.$store.dispatch('user/poolDeposit', {
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
.deposit-modal {
  &__main {
    padding: 20px;
  }
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
.balance {
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

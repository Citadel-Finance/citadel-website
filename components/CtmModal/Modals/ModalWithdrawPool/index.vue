<template>
  <div class="ctm-modal__box">
    <div
      v-if="isHeader === true"
      class="ctm-modal__header"
    >
      <div class="ctm-modal__title">
        {{ title || options.title || 'Withdraw pool' }}
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
    <div class="withdraw-modal__main">
      <div class="withdraw-modal__text">
        {{ depositText }}
      </div>
      <div class="withdraw-modal__title">
        Amount
      </div>
      <base-input
        v-model="amount"
        :placeholder="'Amount in ETH'"
        :description="'MAX'"
      />
      <div class="withdraw-modal__balance max">
        <div class="max__title">
          Max:
        </div>
        <div class="max__value">
          {{ balance }}
        </div>
      </div>
      <div class="withdraw-modal__buttons">
        <base-btn
          :mode="'secondary'"
          @click="close()"
        >
          Close
        </base-btn>
        <base-btn @click="withdraw">
          Withdraw
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
  data() {
    return {
      depositText: 'To withdraw ETH, you will first be asked to approve a transfer of kETH',
      balance: '23.25640000 ETH',
      amount: '',
    };
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  methods: {
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
.withdraw-modal {
  &__main {
    padding: 20px;
  }
  &__text {
    font-weight: 300;
    letter-spacing: 0.05em;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
  }
  &__title {
    margin: 30px 0 10px;
    color: #240A36;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
  }
}
.max {
  display: flex;
  justify-content: space-between;
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

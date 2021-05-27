<template>
  <div class="ctm-modal__box">
    <div
      v-if="isHeader === true"
      class="ctm-modal__header"
    >
      <div class="ctm-modal__title">
        {{ title || options.title || 'Edit Pool' }}
      </div>
      <button
        v-if="!options.isUnclosable"
        class="ctm-modal__x"
        @click="close()"
      >
        <img src="@/assets/x.svg" alt="x">
      </button>
    </div>
    <div class="deposit-modal__wrapper">
      <div class="deposit-modal__title">
        Liquidity mining reward
      </div>
      <div class="deposit-modal__subtitle">
        To deposit ETH, you will be prompted to confirm the deposit.
      </div>
      <div class="deposit-modal__input_title">Amount</div>
    <div class="deposit-modal__input">
      <input type="text" placeholder="Amount in ETH" class="deposit-modal__input">
    </div>
      <div class="deposit-modal__input_subtitle">Your balance: <b>23.25640000 ETH</b></div>
    <div class="deposit-modal__buttons">
      <button
        v-if="!options.isUnclosable"
        class="deposit-modal__buttons_close"
        @click="close()"
      >
        Close
      </button>
      <button class="deposit-modal__buttons_save">
        Deposit
      </button>
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
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  methods: {
    close() {
      this.$store.dispatch('modals/hide');
    },
  },
};
</script>
<style lang="scss">
.ctm-modal {
  @include modalKit;
}
.deposit-modal__wrapper {
  padding-left: 20px;
}
.deposit-modal__input {
  padding-left: 10px;
  width: 424px;
  max-width: 434px;
  height: 59px;
  background: #F6F5F7;
  border-radius: 10px;
  border: 0;
  margin-bottom: 20px;
}
.deposit-modal__title {
  margin: 30px 20px 20px 0;
}
.deposit-modal__subtitle {
  font-size: 16px;
  font-weight: 300;
  color: #7B6C86;
}
.deposit-modal__input_subtitle{
  text-align: right;
  margin: 20px;
}
.deposit-modal__input_title {
  font-size: 16px;
  font-weight: 500;
  color: #240A36;
  margin: 20px 0 10px;
}
.deposit-modal__buttons_close {
  height: 51px;
  width: 147px;
  background: #F6F5F7;
  border-radius: 10px;
  margin-bottom: 20px;
}
.deposit-modal__buttons_save {
  height: 51px;
  width: 267px;
  border-radius: 10px;
  background: #C31433;
  color: white;
  margin-left: 16px;
}
</style>

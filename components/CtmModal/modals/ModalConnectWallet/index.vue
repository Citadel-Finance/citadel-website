<template>
  <div class="ctm-modal__box">
    <div
      v-if="isHeader === true"
      class="ctm-modal__header"
    >
      <div class="ctm-modal__title">
        {{ title || options.title || 'Connect wallet' }}
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
    <div class="connect-modal__main">
      <div class="connect-modal__buttons">
        <base-btn
          v-for="wallet in wallets"
          :key="wallet"
          :mode="'secondary'"
          @click="handleConnectWallet"
        >
          {{ wallet }}
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
      wallets: [
        'Metamask',
        'Wallet1',
        'Wallet2',
        'Wallet3',
      ],
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
    async handleConnectWallet() {
      const r = await this.$store.dispatch('user/connectWallet');
      if (!r.ok) {
        return;
      }
      this.CloseModal();
    },
  },
};
</script>
<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}
.connect-modal {
  &__main {
    padding: 20px;
  }
  &__buttons {
    display: grid;
    grid-gap: 15px;
  }
}
</style>

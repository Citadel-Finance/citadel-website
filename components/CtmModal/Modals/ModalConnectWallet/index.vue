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
          :mode="'secondary'"
          @click="handleConnectWallet"
        >
          Metamask
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
      this.SetLoader(true);
      const r = await this.$store.dispatch('user/connectWallet');
      if (!r.ok) {
        return;
      }
      this.SetLoader(false);
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

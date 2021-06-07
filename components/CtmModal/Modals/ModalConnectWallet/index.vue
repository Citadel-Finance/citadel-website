<template>
  <ctm-modal-box title="Connect wallet">
    <div class="ctm-modal__main main">
      <div class="main__buttons">
        <base-btn
          :mode="'secondary'"
          @click="handleConnectWallet"
        >
          Metamask
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
      this.SetLoader(false);
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
.main {
  padding: 20px;
  &__buttons {
    display: grid;
    grid-gap: 15px;
  }
}
</style>

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
          src="../../../assets/x.svg"
          alt="x"
        >
      </button>
    </div>
    <button @click="handleConnectWallet">
      <slot />
    </button>
    <!--    <button>-->
    <!--      <slot />-->
    <!--    </button>-->
    <!--    <button>-->
    <!--      <slot />-->
    <!--    </button>-->
    <!--    <button>-->
    <!--      <slot />-->
    <!--    </button>-->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';
import {
  initWeb3Provider,
  createAbstractions,
  createBep20Inst, createInsts,
} from '~/utils/web3';

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
</style>

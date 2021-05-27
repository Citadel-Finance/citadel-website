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
  createBep20Inst,
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
  async mounted() {
    // await this.init();
  },
  methods: {
    close() {
      this.$store.dispatch('modals/hide');
    },
    async init() {
      await createAbstractions();
      await createBep20Inst();
    },
    async handleConnectWallet() {
      const r = await this.connectWallet();
      if (r.ok !== true) {
        let msg;
        if (r.code === 4001) {
          msg = 'Metamask connection error';
        }
        this.close();
        this.ShowModal({
          key: modals.default,
          title: msg,
          text: 'Connect to Metamask',
        });
      }
    },
    async connectWallet() {
      const r = await initWeb3Provider();
      if (r.ok === true) {
        await this.close();
        await this.init();
      }
      return r;
    },
  },
};
</script>
<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}
.ctm-modal__header {
  margin-bottom: 30px;
}
</style>

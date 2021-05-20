<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="ctm-modal"
      @mousedown.self="backgroundClick"
    >
      <ctm-modal-box
        v-if="modals.default === currentModalKey"
      >
        <div class="ctm-modal__content ctm-modal__text">
          {{ options.text }}
        </div>
      </ctm-modal-box>
      <edit-pool v-if="modals.editPool === currentModalKey"/>
      <delete-pool v-if="modals.deletePool === currentModalKey"/>
      <withdraw-pool v-if="modals.withdrawPool === currentModalKey"/>
      <add-pool v-if="modals.addPool === currentModalKey"/>
      <deposit-pool v-if="modals.depositPool === currentModalKey"/>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '@/store/modals/modals';
import EditPool from '@/components/CtmModal/EditPoolModal/index';
import deletePool from '@/components/CtmModal/DeletePoolModal/index';
import withdrawPool from '@/components/CtmModal/WithdrawPoolModal/index';
import addPool from '@/components/CtmModal/AddPoolModal/index';
import depositPool from '@/components/CtmModal/DepositPoolModal/index';

export default {
  components: {
    'edit-pool': EditPool,
    'delete-pool': deletePool,
    'withdraw-pool': withdrawPool,
    'deposit-pool': depositPool,
    'add-pool': addPool,
  },
  data: () => ({
    modals,
  }),
  computed: {
    ...mapGetters({
      isShow: 'modals/getIsShow',
      currentModalKey: 'modals/getCurrentModalKey',
      options: 'modals/getOptions',
    }),
  },
  methods: {
    backgroundClick() {
      if (!this.options.isUnclosable) {
        this.close();
      }
    },
    close() {
      this.$store.dispatch('modals/hide');
    },
  },
};
</script>
<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}
</style>

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
      <modal-add-pool v-if="modals.addPool === currentModalKey" />
      <modal-connect-wallet v-if="modals.connectWallet === currentModalKey" />
      <modal-delete-pool v-if="modals.deletePool === currentModalKey" />
      <modal-deposit-pool v-if="modals.depositPool === currentModalKey" />
      <modal-edit-pool v-if="modals.editPool === currentModalKey" />
      <modal-status v-if="modals.status === currentModalKey" />
      <modal-withdraw-pool v-if="modals.withdrawPool === currentModalKey" />
      <modal-claim-pool v-if="modals.claimPool === currentModalKey" />
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '@/store/modals/modals';
import modalAddPool from '@/components/CtmModal/modals/ModalAddPool/index';
import modalClaimPool from '@/components/CtmModal/modals/ModalClaimPool/index';
import modalConnectWallet from '@/components/CtmModal/modals/ModalConnectWallet/index';
import modalDeletePool from '@/components/CtmModal/modals/ModalDeletePool/index';
import modalDepositPool from '@/components/CtmModal/modals/ModalDepositPool/index';
import modalEditPool from '@/components/CtmModal/modals/ModalEditPool/index';
import modalStatus from '@/components/CtmModal/modals/ModalStatus/index';
import modalWithdrawPool from '@/components/CtmModal/modals/ModalWithdrawPool/index';

export default {
  components: {
    'modal-add-pool': modalAddPool,
    'modal-claim-pool': modalClaimPool,
    'modal-connect-wallet': modalConnectWallet,
    'modal-delete-pool': modalDeletePool,
    'modal-deposit-pool': modalDepositPool,
    'modal-edit-pool': modalEditPool,
    'modal-status': modalStatus,
    'modal-withdraw-pool': modalWithdrawPool,
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

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
      <modal-delete-pool v-if="modals.deletePool === currentModalKey" />
      <modal-deposit-pool v-if="modals.depositPool === currentModalKey" />
      <modal-edit-pool v-if="modals.editPool === currentModalKey" />
      <modal-withdraw-pool v-if="modals.withdrawPool === currentModalKey" />
      <!--      <claim-pool v-if="modals.claimPool === currentModalKey"/>-->
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '@/store/modals/modals';
import modalAddPool from '@/components/CtmModal/modals/ModalAddPool/index';
import modalDeletePool from '@/components/CtmModal/modals/ModalDeletePool/index';
import modalDepositPool from '@/components/CtmModal/modals/ModalDepositPool/index';
import modalEditPool from '@/components/CtmModal/modals/ModalEditPool/index';
import modalWithdrawPool from '@/components/CtmModal/modals/ModalWithdrawPool/index';
// import claimPool from '@/components/CtmModal/ClaimPoolModal/index';

export default {
  components: {
    'modal-add-pool': modalAddPool,
    'modal-delete-pool': modalDeletePool,
    'modal-deposit-pool': modalDepositPool,
    'modal-edit-pool': modalEditPool,
    'modal-withdraw-pool': modalWithdrawPool,
    // 'claim-pool': claimPool,
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

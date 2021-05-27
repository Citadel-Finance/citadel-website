<template>
  <button @click="openEditModal">
    <div class="admin__edit">
      <img src="@/assets/edit.svg" alt="edit">
    </div>
  </button>
</template>

<script>
import modals from '@/store/modals/modals';

export default {
  name: 'Edit',
  props: {
    title: {
      default: '',
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openEditModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.editPool,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin__edit {
    border-radius: 10px;
    align-items: center;
    padding: 15px;
    width: 66px;
    height: 66px;
    background: #F6F5F7;
  }
</style>

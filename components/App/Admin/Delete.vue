<template>
  <button @click="openDeleteModal">
    <div class="admin__delete">
      <img
        :src="Require('delete.svg')"
        alt="edit"
      >
    </div>
  </button>
</template>

<script>
import modals from '@/store/modals/modals';

export default {
  name: 'Delete',
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
    openDeleteModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.deletePool,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin__delete {
    border-radius: 10px;
    align-items: center;
    padding: 15px;
    width: 66px;
    height: 66px;
    background: #F6F5F7;
  }
</style>

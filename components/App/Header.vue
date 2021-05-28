<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__logo">
        <img
          src="../../assets/Logo.svg"
          alt="logo"
        >
      </div>
      <div>
        <base-btn
          @click="openModalConnect"
        >
          Connect Wallet
        </base-btn>
      </div>
    </div>
  </div>
</template>

<script>
import modals from '~/store/modals/modals';

export default {
  name: 'Header',
  methods: {
    openModalConnect() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.connectWallet,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background: #ffffff;
  height: 80px;
  margin-bottom: 30px;
}
.header__wrapper {
  max-width: 1170px;
  background: #ffffff;
  display: flex;
  margin: auto;
  justify-content: space-between;
  padding: 15px 0px 0px 0px;
}
</style>

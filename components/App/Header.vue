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
        <div
          v-if="isConnected"
          class="header__connected"
        >
          <span class="header__dot" />
          <span
            class="header__address"
            :title="userAddress"
          >
            {{ SubstrString(userAddress, 0, 6) + '...' + SubstrString(userAddress, userAddress.length - 4, 4) }}
          </span>
        </div>
        <base-btn
          v-if="!isConnected"
          @click="openModalConnect"
        >
          Connect Wallet
        </base-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      userAddress: 'user/getUserAddress',
      isConnected: 'user/getIsConnected',
    }),
  },
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
  background: #FFFFFF;
  padding: 15px;
  &__wrapper {
    max-width: 1170px;
    background: #FFFFFF;
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: space-between;
  }
  &__connected {
    background: #F6F5F7;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    grid-gap: 15px;
  }
  &__dot {
    position: relative;
    display: flex;
    align-items: center;
    &:before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #C31432;
    }
  }
  &__address {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #240B36;
  }
}
</style>

<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__header header">
        <div class="header__wrapper">
          <div class="header__logo" />
          <div class="header__btn">
            <div
              v-if="isConnected"
              class="header__connected"
            >
              <span class="header__dot icon-dot_03_m" />
              <span
                class="header__address"
                :title="userAddress"
              >
                {{ SubstrString(userAddress, 0, 6) + '...' + SubstrString(userAddress, userAddress.length - 4, 4) }}
              </span>
            </div>
            <base-btn
              v-if="!isConnected"
              mode="primary"
              @click="openModalConnect"
            >
              Connect Wallet
            </base-btn>
          </div>
        </div>
      </div>
      <div class="template__content content">
        <nuxt />
      </div>
      <ctm-modal />
      <loader-screen />
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  computed: {
    ...mapGetters({
      userAddress: 'user/getUserAddress',
      isConnected: 'user/getIsConnected',
    }),
  },
  async mounted() {
    await this.connectAnonNode();
    this.SetLoader(false);
    setInterval(() => {
      this.$store.dispatch('user/updatePoolsData');
      this.$store.dispatch('user/updatePoolsAndBalances');
    }, 15000);
  },
  methods: {
    openModalConnect() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.connectWallet,
      });
    },
    async connectAnonNode() {
      const r = await this.$store.dispatch('user/connectAnonNode');
      return r;
    },
  },
};
</script>
<style lang="scss" scoped>
.primary {
  font-family: sans-serif, 'Arial';
  font-style: normal;
  background-color: #F6F5F7;
  overflow-y: auto;
  height: 100vh;
}
.template {
  display: grid;
  grid-gap: 30px;
  margin-bottom: 30px;
  @include _767 {
    grid-gap: 16px;
    margin-bottom: 16px;
  }
}
.header {
  width: 100%;
  background: #FFFFFF;
  &__wrapper {
    @include container;
    background: #FFFFFF;
    display: flex;
    margin: auto;
    padding: 20px 0;
    align-items: center;
    justify-content: space-between;
    @include _575 {
      padding: 16px;
    }
  }
  &__logo {
    width: 116px;
    height: 37px;
    background-image: url(~assets/img/logo_big.svg);
    background-repeat: no-repeat;
    @include _480 {
      height: 48px;
      background-image: url(~assets/img/logo_small.svg);
    }
  }
  &__btn {
    width: 200px;
    height: 48px;
  }
  &__connected {
    background: #F6F5F7;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    align-items: center;
    grid-gap: 10px;
    height: 48px;
  }
  &__dot {
    &:before {
      color: #C31432;
      font-size: 24px;
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

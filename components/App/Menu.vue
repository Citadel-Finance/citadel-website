<template>
  <div class="content__menu menu">
    <n-link to="/">
      <div class="menu__back back">
        <button
          class="back__button"
        >
          <span class="icon-chevron_left" />
          <span>Back</span>
        </button>
      </div>
    </n-link>
    <div class="menu__info info">
      <div class="info__main">
        <div class="info__title">
          {{ titleRate }}
        </div>
        <div class="info__percents">
          {{ pool.apyTax }} %
        </div>
      </div>
      <base-btn
        v-if="isUserAdmin && isConnected"
        mode="icon"
        @click="openEditModal(poolAddress)"
      >
        <span class="icon-settings" />
      </base-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'Menu',
  props: {},
  data() {
    return {
      titleRate: 'Annual percentage rate',
      percents: '20.06%',
    };
  },
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
      isUserAdmin: 'user/getIsUserAdmin',
      isConnected: 'user/getIsConnected',
    }),
    poolAddress() {
      return this.$route.params.address;
    },
    pool() {
      return this.poolsMap[this.poolAddress] || {};
    },
  },
  methods: {
    openEditModal(poolAddress) {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.editPool,
        poolAddress,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
  a:hover {
    text-decoration: none;
  }
}
.back {
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  color: #240A36;
  padding: 13px 15px;
  transition: 0.3s ease-out;
  text-decoration: none;
  &__button {
    display: flex;
    align-items: center;
    grid-gap: 5px;
  }
  &:hover {
    background: #FFFFFF;
    border-radius: 10px;
    cursor: pointer;
  }
  span::before {
    font-size: 24px;
    color: #C31433;
  }
}
.info {
  display: flex;
  grid-gap: 30px;
  &__main {
    display: grid;
    text-align: right;
    width: 100%;
    min-width: 215px;
  }
  &__title {
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
  }
  &__percents {
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    letter-spacing: 0.05em;
    color: #240A36;
  }
  span::before {
    font-size: 24px;
  }
}
</style>

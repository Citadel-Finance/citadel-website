<template>
  <div class="content__menu menu">
    <div class="menu__back back">
      <n-link to="/">
        <button
          class="back__button"
        >
          <img
            :src="Require('arrow_back.svg')"
            alt="back"
            class="back__img"
          >Back
        </button>
      </n-link>
    </div>
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
        v-if="isUserAdmin"
        mode="icon"
        @click="openEditModal"
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
  name: 'Dropdown',
  props: {},
  data() {
    return {
      titleRate: 'Annual percentage rate',
      percents: '20.06%',
      options: [
        { label: 'ETH Pool 1', value: 1 },
        { label: 'ETH Pool 2', value: 2 },
        { label: 'ETH Pool 3', value: 3 },
        { label: 'ETH Pool 4', value: 4 },
      ],
      selected: 0,
    };
  },
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
      isUserAdmin: 'user/getIsUserAdmin',

    }),
    poolAddress() {
      return this.$route.params.address;
    },
    pool() {
      return this.poolsMap[this.poolAddress] || {};
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
.menu {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
}
.back {
  min-width: 180px;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  color: #240A36;
  padding: 13px 15px;
  &__button {
    display: flex;
    align-items: center;
    grid-gap: 15px;
  }
  a:hover {
    text-decoration: none;
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

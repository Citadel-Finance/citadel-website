<template>
  <div class="content__menu menu">
    <div class="menu__back back">
      <n-link to="/">
        <button
          class="back__button"
        >
          <img
            src="../../assets/arrow_back.svg"
            alt="back"
            class="back__img"
          >Back
        </button>
      </n-link>
    </div>
    <div
      v-if="isUserAdmin"
      class="menu__settings settings"
    >
      <Edit />
      <Delete />
    </div>
    <div class="menu__info info">
      <div class="info__title">
        {{ titleRate }}
      </div>
      <div class="info__percents">
        {{ percents }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Edit from './Admin/Edit';
import Delete from './Admin/Delete';

export default {
  name: 'Dropdown',
  components: {
    Edit,
    Delete,
  },
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
      isUserAdmin: 'user/getIsUserAdmin',
    }),
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
.settings {
  display: flex;
  grid-gap: 20px;
  align-items: center;
  justify-content: center;
  min-width: 180px;
}
.info {
  display: grid;
  justify-content: end;
  min-width: 180px;
  &__title {
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
    margin-bottom: 10px;
  }
  &__percents {
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    text-align: right;
    letter-spacing: 0.05em;
    color: #240A36;
  }
}
</style>

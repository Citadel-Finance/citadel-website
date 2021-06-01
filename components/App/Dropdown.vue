<template>
  <div class="dropdown__container container">
    <div class="container__back back">
      <n-link to="/">
        <button
          class="back__button"
        >
          <img
            src="../../assets/back_arrow.svg"
            alt="back"
            class="back__img"
          >
          Back
        </button>
      </n-link>
    </div>
    <div class="container__menu menu">
      <base-dropdown
        v-model="selected"
        :options="options"
        :mode="'bg-transparent'"
        class="menu__dd"
      />
      <Edit />
      <Delete />
    </div>
    <div class="container__info info">
      <div class="info__title">
        {{ titleRate }}
      </div>
      <hr class="info__line">
      <div class="info__percents">
        {{ percents }}
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
.dropdown__container {
  background: #FFFFFF;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto 30px;
  width: 100%;
  max-width: 1170px;
  border-radius: 10px;
  padding: 20px;
}
.back {
  &__img {
    margin-right: 20px;
  }
}
.menu {
  display: flex;
  grid-gap: 20px;
  justify-items: center;
  align-items: center;
}
.info {
  display: grid;
  justify-content: end;
  &__title {
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
  }
  &__line {
    width: 40px;
    margin: 20px 0 20px auto;
    border: none;
    background-color: #C31433;
    color: #C31433;
    height: 3px;
  }
  &__percents {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: right;
    color: #240B36;
  }
}
</style>

<template>
  <div
    v-click-outside="closeDropdown"
    class="base-dropdown"
  >
    <div
      class="base-dropdown__head"
      :class="classActive"
      @click="toggleDropdown()"
    >
      <img
        alt="logo"
      >
      <p class="base-dropdown__title">
        {{ options[value].label }}
      </p>
      <img
        class="base-dropdown__icon"
        alt="dropdown"
      >
    </div>
    <div
      v-if="isOptionVisible"
      class="base-dropdown__items"
    >
      <span
        v-for="(option, i) in options"
        :key="`base-dropdown__item_${i}`"
        class="base-dropdown__item"
        @click="selectOption(i)"
      >
        {{ option.label }}
      </span>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    options: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    isOptionVisible: false,
  }),
  computed: {
    classActive() {
      const {
        isOptionVisible,
      } = this;
      return [
        {
          'base-dropdown__head_active': isOptionVisible === true,
        },
      ];
    },
  },
  methods: {
    closeDropdown() {
      this.isOptionVisible = false;
    },
    selectOption(i) {
      this.$emit('input', i);
      this.isOptionVisible = false;
    },
    toggleDropdown() {
      this.isOptionVisible = !this.isOptionVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-dropdown {
  position: relative;
  width: 100%;
  font-size: 18px;
  line-height: 21px;
  color: #240A36;

  &__head {
    width: 219px;
    max-height: 66px;
    position: relative;
    display: flex;
    grid-gap: 20px;
    padding: 15px;
    align-items: center;
    background: #F6F5F7;
    border-radius: 10px;
    cursor: pointer;
    &_active .base-dropdown__icon {
      transform: rotate(180deg);
    }
  }
  &__items {
    position: absolute;
    top: 80px;
    left: -15%;
    display: flex;
    width: 100%;
    min-width: 290px;
    margin: 0 auto;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0 12px 31px rgba(0, 0, 0, 0.17);
    border-radius: 10px;
    z-index: 100;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
  }
  &__item {
    padding: 20px;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    color: #240A36;
    border-radius: 10px;
    &:hover {
      background: #F6F5F7;
    }
  }
  &__icon {
    transition: 0.2s ease-in-out;
  }
}
</style>

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
      <span
        v-for="(dot, i) of 3"
        :key="`base-dropdown__dot_${i}`"
        class="base-dropdown__dot"
      />
    </div>
    <div
      v-if="isOptionVisible"
      class="base-dropdown__items"
    >
      <span
        v-for="(option, i) in options"
        :key="`base-dropdown__item_${i}`"
        class="base-dropdown__item"
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
    toggleDropdown() {
      this.isOptionVisible = !this.isOptionVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-dropdown {
  position: relative;
  &__head {
    width: 38px;
    height: 38px;
    display: flex;
    grid-gap: 6px;
    background: #F6F5F7;
    border-radius: 10px;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
  }
  &__items {
    position: absolute;
    top: 45px;
    right: 0;
    display: flex;
    width: 100%;
    min-width: 211px;
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
  &__dot {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
      content: '';
      position: absolute;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #7B6C86;
    }
  }
}
</style>

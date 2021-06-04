<template>
  <button
    class="base-btn"
    :class="btnClass"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnClass() {
      const {
        disabled,
        mode,
      } = this;
      return [
        {
          'base-btn_disabled': disabled,
          'base-btn__secondary': mode === 'secondary',
          'base-btn__secondary_disabled': mode === 'secondary' && disabled,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.base-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 30px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  transition: 0.3s ease-out;
  border-radius: 10px;
  background: #C31433;
  color: #FFFFFF;
  &:hover {
    background: #9F0923;
  }
  &_disabled {
    background: #F3EFF3;
    color: #D4CED7;
    pointer-events: none;
  }
  &__secondary {
    background: #FDEFF2;
    color: #C31433;
    &:hover {
      background: #F3D0D7;
    }
    &_disabled {
      background: #F3EFF3;
      color: #D4CED7;
      pointer-events: none;
    }
  }
}
</style>

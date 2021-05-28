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
  height: 51px;
  max-height: 100%;
  width: 100%;
  padding: 15px 30px;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  transition: 0.2s ease-in-out;
  border-radius: 10px;
  background: #C31433;
  color: #FFFFFF;
  text-decoration: none;
  &_disabled {
    background: #E6A1AE;
    pointer-events: none;
  }
  &__secondary {
    background: #F6F5F7;
    color: #240A36;
    &_disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>

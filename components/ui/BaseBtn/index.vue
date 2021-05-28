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
          'base-btn_secondary': mode === 'secondary',
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
  padding: 15px;
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
  &_secondary {
    background: #F6F5F7;
    color: #240A36;
    &:hover {
      background: rgba(246, 245, 247, 0.75);
    }
  }
}
</style>

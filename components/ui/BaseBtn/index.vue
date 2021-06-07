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
          'base-btn_primary': mode === 'primary',
          'base-btn_secondary': mode === 'secondary',
          'base-btn_back-image': mode === 'backImg',
          'base-btn_txt-icon': mode === 'txt-icon',
          'base-btn_icon': mode === 'icon',
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
  padding: 15px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  transition: 0.3s ease-out;
  border-radius: 10px;
  color: #FFFFFF;
  &_disabled {
    background: #F3EFF3;
    color: #D4CED7;
    pointer-events: none;
  }
  &_primary {
    background: #C31433;
    &:hover {
      background: #9F0923;
    }
  }
  &_secondary {
    background: #FDEFF2;
    color: #C31433;
    &:hover {
      background: #F3D0D7;
    }
  }
  &_back-image {
    background-image: url(~assets/img/button_bg.svg);
    justify-content: start;
    align-items: start;
  }
  &_txt-icon {
    background: #FFFFFF;
    color: #240A36;
    border: 1px solid #F3EFF3;
    &:hover {
      background: #FDEFF2;
      border: 1px solid #C31433;
    }
  }
  &_icon {
    background: #FFFFFF;
    color: #C31433;
    &:hover {
      background: #C31433;
      color: #FFFFFF;
    }
  }
}
</style>

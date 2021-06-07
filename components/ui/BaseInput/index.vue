<template>
  <div class="base-input">
    <div
      class="base-input__control"
      :class="inputClass"
    >
      <input
        :value="value"
        type="text"
        class="base-input__input"
        :placeholder="placeholder"
        @input="input"
      >
      <span
        v-if="mode === 'desc'"
        class="base-input__description"
        @click="$emit('handleClickBtn')"
      >
        {{ description }}
      </span>
    </div>
    <div
      v-if="!isHideError"
      class="base-input__error"
    >
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    errorText: {
      type: String,
      default: '',
    },
    isHideError: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputClass() {
      const {
        disabled,
        mode,
      } = this;
      return [
        {
          'base-input_disabled': disabled,
          'base-input_desc': mode === 'desc',
        },
      ];
    },
  },
  methods: {
    input($event) {
      this.$emit('input', $event.target.value, $event.target);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  &__control {
    display: flex;
    width: 100%;
    height: 59px;
    padding: 20px;
    background: #F6F5F7;
    border-radius: 10px;
    font-size: 16px;
    line-height: 20px;
    transition: 0.2s ease-in-out;
    &:focus-within {
      border-color:  #C31433;
    }
  }
  &__input {
    width: 100%;
    border: none;
    background: transparent;
    color: #7B6C86;
  }
  &__description {
    font-size: 16px;
    text-align: right;
    min-width: 73px;
    color: #C31433;
    font-weight: bold;
    line-height: 18px;
    &:hover {
      cursor: pointer;
    }
  }
  &__error {
    display: flex;
    align-items: center;
    min-height: 20px;
    font-size: 12px;
    color: #EA3147;
    line-height: 100%;
  }
}
</style>

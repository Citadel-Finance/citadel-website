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
        :class="{'base-input__input_desc' : mode === 'desc'}"
        required
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
    background: #F6F5F7;
    border-radius: 10px;
    font-size: 16px;
    box-sizing: border-box;
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: normal;
    line-height: 18px;
    align-items: center;
    letter-spacing: 0.05em;
    color: #A89DAF;
    position: relative;
  }
  &__input {
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: transparent;
    border: 1px solid #F6F5F7;
    transition: 0.2s ease-in-out;
    &_desc {
      padding-right: 73px;
    }
    &:hover {
      background: #F6F5F7;
      border: 1px solid #DA7284;
    }
    &:focus-within {
      background: #FFFFFF;
      border: 1px solid #DA7284;
    }
    &:valid {
      background: #FFFFFF;
      border: 1px solid #D4CED7;
    }
  }
  &__description {
    font-size: 16px;
    text-align: right;
    min-width: 53px;
    color: #C31433;
    font-weight: bold;
    line-height: 18px;
    position: absolute;
    right: 20px;
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

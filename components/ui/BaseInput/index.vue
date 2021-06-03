<template>
  <div class="base-field">
    <div
      class="base-field__control"
    >
      <input
        :value="value"
        type="number"
        class="base-field__input"
        :placeholder="placeholder"
        @input="input"
      >
      <span
        class="base-field__description"
      >{{ description }}</span>
    </div>
    <div
      v-if="!isHideError"
      class="base-field__error"
    >
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
  },
  methods: {
    input($event) {
      this.$emit('input', $event.target.value, $event.target);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-field {
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
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    min-width: 73px;
    color: #C31433;
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

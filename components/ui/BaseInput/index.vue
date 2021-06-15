<template>
  <validation-provider
    v-slot="{ errors }"
    :rules="rules"
  >
    <div class="base-input">
      <div
        class="base-input__control"
        :class="inputClass"
      >
        <span
          v-if="errors[0]"
          class="icon-error"
        />
        <input
          :value="value"
          :type="type"
          :name="name"
          class="base-input__input"
          :placeholder="placeholder"
          :class="[
            {'base-input__input_desc' : mode === 'desc'},
            {'base-input__input_error' : errors.length},
          ]"
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
        {{ errors[0] }}
      </div>
    </div>
  </validation-provider>
</template>

<script>
export default {
  props: {
    rules: {
      type: [String, Array, Object],
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    name: {
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
    align-items: center;
    color: #A89DAF;
    position: relative;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span::before {
      font-size: 24px;
      color: #C31433;
      left: 20px;
      position: absolute;
    }
  }
  &__input {
    font-family: sans-serif, 'Arial';
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.05em;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: transparent;
    border: 1px solid #F6F5F7;
    transition: 0.2s ease-in-out;
    &_desc {
      padding-right: 73px;
    }
    &_error {
      padding-left: 50px;
      border: 1px solid #C31433 !important;
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

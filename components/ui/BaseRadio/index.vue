<template>
  <div class="base-radio">
    <b-form-radio-group
      v-model="selected"
      :options="options"
      class="radio"
      value-field="item"
      text-field="label"
      stacked
    />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    selected: '',
  }),
  watch: {
    selected(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-radio::v-deep {
  .custom-control-input:checked, .custom-control-label::before {
    border-color: #C31433;
    background-color: #FFFFFF;
    width: 21px;
    height: 21px;
  }
  .custom-radio .custom-control-input:checked ~ .custom-control-label::after {
    background-image: none;
    color: #C31433;
    margin: 4px 0 0 4px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: #C31433;
  }
  .radio {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
  }
  .custom-control-label {
    padding-left: 14px;
    padding-top: 4px;
  }
}
</style>

<template>
  <div class="base-radio">
    <b-form-radio-group
      v-model="selected"
      :options="options"
      class="radio"
      value-field="item"
      text-field="label"
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
  },
  data() {
    return {
      selected: '',
    };
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
    grid-gap: 111px;
  }
  .custom-control-label {
    padding-left: 14px;
    padding-top: 4px;
  }
}
</style>

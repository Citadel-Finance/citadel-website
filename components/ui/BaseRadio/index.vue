<template>
  <div>
    <b-form-group
      v-slot="{ ariaDescribedby }"
      class="base-radio radio"
    >
      <b-form-radio
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        class="radio__item"
        value="active"
      >
        Active
      </b-form-radio>
      <b-form-radio
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        class="radio__item"
        value="inactive"
      >
        Inactive
      </b-form-radio>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      selected: '',
    };
  },
};
</script>

<style lang="scss" scoped>

</style>

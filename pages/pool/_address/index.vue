<template>
  <div>
    {{ someValue }}
  </div>
</template>

<script>
export default {
  name: 'Pool',
  data: () => ({
    someValue: '',
  }),
  mounted() {
    this.someValue = this.$route.params.address;
  },
};
</script>

<style scoped>

</style>

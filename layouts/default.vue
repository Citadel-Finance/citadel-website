<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__content">
        <nuxt />
      </div>
    </div>
    <transition name="fade" />
    <ctm-modal />
    <loader-screen />
  </div>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>

.primary {
  font-family: Montserrat, sans-serif;
  height: 100vh;
  overflow-y: auto;
}
.template {
  min-height: 100vh;
  overflow: hidden;
  &__content {
    align-items: center;
    position: relative;
    z-index: 120;
    background-color: #F6F5F7;
    justify-content: space-between;
    height: 100%;
  }
}
</style>

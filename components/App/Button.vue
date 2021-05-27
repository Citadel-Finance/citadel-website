<template>
  <div class="header-button">
    <button
      class="header__button"
      @click="openTestModal"
    >
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      default: '',
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openTestModal() {
      this.ShowModal({
        text: 'Connect to Metamask',
      });
    },
  },
};
</script>

<style scoped>
.header__button{
  cursor: pointer;
  width: 200px;
  height: 52px;
  border: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #FFFFFF;
  background: #C31433;
}
</style>

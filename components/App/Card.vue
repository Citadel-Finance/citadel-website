<template>
  <div class="card-container">
    <div class="card-container__title">
      {{ title }}
    </div>
    <hr class="card-container__line">
    <div class="card-container__value">
      {{ number }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      default: '',
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    openTestModal() {
      this.ShowModal({
        text: 'test',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px 15px;
  min-width: 160px;
  min-height: 145px;
  background: #F6F5F7;
  border-radius: 10px;
  &__title {
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
  }
  &__line {
    width: 40px;
    margin: 51px auto 18px 0;
    border: none;
    background-color: #C31433;
    color: #C31433;
    height: 3px;
  }
  &__value {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #240B36;
  }
}
</style>

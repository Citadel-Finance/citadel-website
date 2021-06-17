<template>
  <div class="cards__wrapper">
    <div class="cards__title">
      {{ title }}
    </div>
    <hr class="cards__line">
    <div
      v-if="isDisconnected"
      class="cards__value cards__value_disc"
    >
      Wallet disconnected
    </div>
    <div
      v-else
      class="cards__value"
    >
      {{ value }}
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
    value: {
      type: String,
      default: '',
    },
    isDisconnected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  &__wrapper {
    padding: 20px 15px;
    width: 100%;
    background: #F6F5F7;
    border-radius: 10px;
  }
  &__title {
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    display: flex;
    align-items: center;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
  }
  &__line {
    width: 68px;
    margin: 35px auto 15px 0;
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
    &_disc {
      font-weight: normal;
      font-size: 16px;
      line-height: 18px;
      color: #D4CED7;
    }
  }
}
</style>

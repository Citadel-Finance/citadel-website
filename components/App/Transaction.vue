<template>
  <div>
    <div class="transaction__wrapper">
      <div class="transaction__title__wrapper">
        <div class="transaction__title">
          Transaction
        </div>
      </div>
      <b-row class="transaction__header">
        <b-col class="transaction__header_title">
          Date
        </b-col>
        <b-col class="transaction__header_title">
          Change
        </b-col>
        <b-col class="transaction__header_title">
          TX HASH
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Transaction',
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
};
</script>

<style lang="scss" scoped>
.transaction__wrapper {
  margin: auto;
  background: #FFFFFF;
  max-width: 1170px;
  height: 466px;
  border-radius: 10px;
  align-items: center;
  margin-top: 30px;
}
.transaction__title__wrapper {
  align-items: center;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.transaction__title {
  margin: 20px;
  font-size: 21px;
}
.transaction__header {
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background: #F6F5F7;
  border-radius: 10px;
  margin: 0px 20px 24px 20px;
}
.transaction__header_title {
  font-size: 10px;
  font-weight: 700;
  color: #7B6C86;
  &:last-child {
    text-align: right;
  }
}
.transaction__header__items {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 20px 20px 40px 20px;
}
.transaction__header__items_title_01 {
  font-size: 16px;
  font-weight: 400;
  color: #7B6C86;
  &:last-child {
    text-align: right;
    //margin-right: 50px;
  }
}
.transaction__header__items_title_02 {
  font-size: 16px;
  font-weight: 500;
  color: #240A36;
}
</style>

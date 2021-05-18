<template>
  <div>
    <div class="transaction__wrapper">
      <div class="transaction__title">
        Transaction
      </div>
      <b-row class="transaction__header">
        <b-col>Date</b-col>
        <b-col>Change</b-col>
        <b-col>TX HASH</b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'Pools',
  props: {
  },
};
</script>

<style scoped>
.transaction__wrapper {
  margin: auto;
  background: #FFFFFF;
  max-width: 1170px;
  height: 466px;
  border-radius: 10px;
  align-items: center;
}
.transaction__title {
  padding: 20px 0px 0px 0px;
  margin: 30px 0px 20px 20px;
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
  margin: 14px -200px 14px 20px;
}
.transaction__header__items {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 20px 20px 40px 20px;
}
</style>

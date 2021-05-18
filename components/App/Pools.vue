<template>
  <div>
    <div class="pools__wrapper">
      <div class="pools__title">
        Pools
      </div>
      <b-row class="pools__header">
        <b-col>Currency</b-col>
        <b-col>Apy</b-col>
        <b-col>Liquidity (USD)</b-col>
        <b-col>Balance</b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col>
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          > ETH
        </b-col>
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col>
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          > ETH
        </b-col>
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col>
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          > ETH
        </b-col>
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col>
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          > ETH
        </b-col>
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col>
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          > ETH
        </b-col>
        <b-col>
          15.25%
        </b-col>
        <b-col>
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
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
.pools__wrapper {
  margin: auto;
  /*display: flex;*/
  background: #FFFFFF;
  max-width: 1170px;
  /*width: 1170px;*/
  height: 466px;
  border-radius: 10px;
  align-items: center;
}
.pools__title {
  padding: 20px 0px 0px 0px;
  margin: 30px 0px 20px 20px;
  font-size: 21px;
  /*display: flex;*/
  /*align-items: center;*/
}
.pools__header {
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 1130px;
  height: 40px;
  background: #F6F5F7;
  border-radius: 10px;
  margin: 0px 20px 24px 20px;
}
.pools__header_title {
  margin: 14px 20px 14px 20px;
}
.pools__header__items {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 0px 20px 20px 20px;
}
.pools__header__img {
  margin: 0px 15px 5px 0px;
}
</style>

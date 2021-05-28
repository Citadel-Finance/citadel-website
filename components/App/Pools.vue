<template>
  <div>
    <div class="pools__wrapper">
      <div class="pools__title">
        Pools
      </div>
      <b-row class="pools__header">
        <b-col class="pools__header_title">
          Currency
        </b-col>
        <b-col class="pools__header_title">
          Apy
        </b-col>
        <b-col class="pools__header_title">
          Liquidity (USD)
        </b-col>
        <b-col class="pools__header_title">
          Balance
        </b-col>
        <b-col class="pools__header_title">
          Status
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col class="div__header__items_img">
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          >
          <div class="pools__header__items_title_01">
            ETH
          </div>
        </b-col>
        <b-col class="pools__header__items_title_02">
          15.25%
        </b-col>
        <b-col class="pools__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
        </b-col>
        <b-col>
          <span class="dot" />
          Active
        </b-col>
        <b-col class="admin__pools__menu">
          <span class="dot__menu" />
          <span class="dot__menu" />
          <span class="dot__menu" />
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col class="div__header__items_img">
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          >
          <div class="pools__header__items_title_01">
            ETH
          </div>
        </b-col>
        <b-col class="pools__header__items_title_02">
          15.25%
        </b-col>
        <b-col class="pools__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col class="div__header__items_img">
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          >
          <div class="pools__header__items_title_01">
            ETH
          </div>
        </b-col>
        <b-col class="pools__header__items_title_02">
          15.25%
        </b-col>
        <b-col class="pools__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col class="div__header__items_img">
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          >
          <div class="pools__header__items_title_01">
            ETH
          </div>
        </b-col>
        <b-col class="pools__header__items_title_02">
          15.25%
        </b-col>
        <b-col class="pools__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col>
          23 025
        </b-col>
      </b-row>
      <b-row class="pools__header__items">
        <b-col class="div__header__items_img">
          <img
            src="../../assets/Ethereum.svg"
            alt="coin"
            class="pools__header__img"
          >
          <div class="pools__header__items_title_01">
            ETH
          </div>
        </b-col>
        <b-col class="pools__header__items_title_02">
          15.25%
        </b-col>
        <b-col class="pools__header__items_title_02">
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

export default {
  name: 'Pools',
  props: {
  },
};
</script>

<style lang="scss" scoped>
.pools__wrapper {
  margin: auto;
  background: #FFFFFF;
  max-width: 1170px;
  height: 466px;
  border-radius: 10px;
  align-items: center;
}
.pools__title {
  padding: 20px 0 0 0;
  margin: 30px 0 20px 20px;
  font-size: 21px;
  display: flex;
}
.pools__header {
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 1130px;
  height: 40px;
  background: #F6F5F7;
  border-radius: 10px;
  margin: 0 30px 24px 20px;
}
.pools__header__items {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 0 20px 20px 20px;
}
.pools__header__img {
  margin: 0 15px 5px 0;
}
.pools__header_title {
  font-size: 10px;
  font-weight: 700;
  color: #7B6C86;
  /*padding-right: 100px;*/
}
.div__header__items_img {
  display: flex;
  align-items: center;
}
.pools__header__items_title_01 {
  font-size: 16px;
  font-weight: 600;
  color: #240A36;
}
.pools__header__items_title_02 {
  font-size: 16px;
  font-weight: 400;
  color: #7B6C86;
}
.dot {
  height: 8px;
  width: 8px;
  background-color: #2DCE89;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}
.dot__menu {
  height: 3px;
  width: 3px;
  background-color: #7B6C86;
  border-radius: 50%;
  display: block;
  margin-top: 3px;
}
.admin__pools__menu {
  height: 38px;
  width: 38px;
  max-width: 38px;
  background: #F6F5F7;
  border-radius: 10px;
  align-items: center;
  padding-top: 7px;
  padding-left: 18px;
}
</style>

<template>
  <div>
    <b-container>
      <div class="keepers__wrapper">
        <div class="keepers__title_wrapper">
          <div class="keepers__title">
            Top Keepers
          </div>
          <div class="keepers__title_second">
            Top Liquidity Providers
          </div>
        </div>
        <b-row class="keepers__header">
          <b-col class="keepers__header_title">
            Postion
          </b-col>
          <b-col class="keepers__header_title">
            Adress
          </b-col>
          <b-col class="keepers__header_title">
            Contributions (USD)
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col class="keepers__header__items_title_01">
            1
          </b-col>
          <b-col class="keepers__header__items_title_02">
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col class="keepers__header__items_title_03">
            $ 15 256 547
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col class="keepers__header__items_title_01">
            1
          </b-col>
          <b-col class="keepers__header__items_title_02">
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col class="keepers__header__items_title_03">
            $ 15 256 547
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col class="keepers__header__items_title_01">
            1
          </b-col>
          <b-col class="keepers__header__items_title_02">
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col class="keepers__header__items_title_03">
            $ 15 256 547
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col class="keepers__header__items_title_01">
            1
          </b-col>
          <b-col class="keepers__header__items_title_02">
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col class="keepers__header__items_title_03">
            $ 15 256 547
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col class="keepers__header__items_title_01">
            1
          </b-col>
          <b-col class="keepers__header__items_title_02">
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col class="keepers__header__items_title_03">
            $ 15 256 547
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Keepers',
  props: {
  },
};
</script>

<style lang="scss" scoped>
.keepers__wrapper {
  margin-left: 18px;
  background: #FFFFFF;
  width: 770px;
  height: 466px;
  border-radius: 10px;
}
.keepers__title {
  margin: 20px 40px 20px 20px;
  font-size: 21px;
  display: flex;
  align-items: center;
  color: #240A36;
}
.keepers__title_second {
  font-size: 18px;
  font-weight: 500;
  color: #7B6C86;
}
.keepers__title_wrapper {
  display: flex;
  font-size: 21px;
  align-items: center;
}
.keepers__header {
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 730px;
  height: 40px;
  background: #F6F5F7;
  border-radius: 10px;
  margin: 0px 20px 24px 20px;
  &:last-child {
  text-align: right;
   }
}
.keepers__header_title {
  font-size: 10px;
  font-weight: 700;
  color: #7B6C86;
  &:last-child{
    text-align: right;
  }
}
.keepers__header__items {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 38px 20px 20px 20px;
}
.keepers__header__items_title_01 {
  font-size: 16px;
  font-weight: 500;
  color: #240A36;
}
.keepers__header__items_title_02 {
  font-size: 16px;
  font-weight: 400;
  color: #7B6C86;
}
.keepers__header__items_title_03 {
  font-size: 16px;
  font-weight: 500;
  color: #C31433;
  text-align: right;
}
</style>

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
          <b-col>Postion</b-col>
          <b-col>Adress</b-col>
          <b-col>Contributions (USD)</b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col>
            1
          </b-col>
          <b-col>
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col>
            $ 15 256 547
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col>
            1
          </b-col>
          <b-col>
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col>
            $ 15 256 547
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col>
            1
          </b-col>
          <b-col>
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col>
            $ 15 256 547
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col>
            1
          </b-col>
          <b-col>
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col>
            $ 15 256 547
          </b-col>
        </b-row>
        <b-row class="keepers__header__items">
          <b-col>
            1
          </b-col>
          <b-col>
            dgdg5s6...sgsgsf465s
          </b-col>
          <b-col>
            $ 15 256 547
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

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
  margin: 14px 20px 14px 20px;
}
.keepers__header__items {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 38px 20px 20px 20px;
}
</style>

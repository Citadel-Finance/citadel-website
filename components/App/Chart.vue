<template>
  <div class="chart__wrapper">
    <div class="chart__container">
      <div class="chart__title">
        Available
      </div>
      <div class="chart__number">
        -
      </div>
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <div class="chart__dates">
        <p>3 Aug</p>
        <p>28 Sep</p>
        <p>23 Nov</p>
        <p>18 Jan</p>
        <p>15 Mar</p>
      </div>
      <div class="chart__buttons">
        <button class="chart__buttons_button">
          24h
        </button>
        <button class="chart__buttons_button">
          7d
        </button>
        <button class="chart__buttons_button">
          All
        </button>
      </div>
    </div>
    <div class="chart__container">
      <div class="chart__title">
        Available
      </div>
      <div class="chart__number">
        -
      </div>
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <div class="chart__dates">
        <p>3 Aug</p>
        <p>28 Sep</p>
        <p>23 Nov</p>
        <p>18 Jan</p>
        <p>15 Mar</p>
      </div>
      <div class="chart__buttons">
        <button class="chart__buttons_button">
          24h
        </button>
        <button class="chart__buttons_button">
          7d
        </button>
        <button class="chart__buttons_button">
          All
        </button>
      </div>
    </div>
    <div class="chart__container">
      <div class="chart__title">
        Available
      </div>
      <div class="chart__number">
        -
      </div>
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <hr class="chart__hr">
      <div class="chart__dates">
        <p>3 Aug</p>
        <p>28 Sep</p>
        <p>23 Nov</p>
        <p>18 Jan</p>
        <p>15 Mar</p>
      </div>
      <div class="chart__buttons">
        <button class="chart__buttons_button">
          24h
        </button>
        <button class="chart__buttons_button">
          7d
        </button>
        <button class="chart__buttons_button">
          All
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/App/Card';

export default {
  name: 'Chart',
  components: {
  },
  props: {},
};
</script>

<style lang="scss" scoped>
.chart__wrapper {
  align-items: center;
  justify-content: space-between;
  grid-gap: 30px;
  max-width: 1170px;
  display: flex;
}
.chart__container {
  width: 370px;
  height: 407px;
  background: #FFFFFF;
  align-items: center;
  justify-content: space-between;
  max-width: 1170px;
  border-radius: 10px;
}
.chart__title {
  font-size: 10px;
  font-weight: 700;
  padding: 20px 0px 13px 20px;
  color: #7B6C86;
}
.chart__number {
  padding: 0px 0px 14px 20px;
}
.chart__hr {
  margin: 20px 20px 40px 20px;
}
.chart__dates {
  display: flex;
  justify-content: space-between;
  margin: -30px 20px 20px 20px;
  font-size: 12px;
  font-weight: 500;
  color: #A89DAF;
}
.chart__buttons {
  display: flex;
  justify-content: space-around;
}
.chart__buttons_button {
  height: 39px;
  width: 98px;
  background: #F6F5F7;
  border-radius: 10px;
}
</style>

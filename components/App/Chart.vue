<template>
  <div class="content__chart chart">
    <!--    <div class="charts__container">-->
    <!--      <div class="charts__title">-->
    <!--        Total deposited {{ title }}-->
    <!--      </div>-->
    <!--      <div class="charts__value">-->
    <!--        {{ Floor(totalStaked) }} {{ pool.symbol }}-->
    <!--      </div>-->
    <!--      <div class="charts__btns">-->
    <!--        <base-btn mode="mini-active">-->
    <!--          24h-->
    <!--        </base-btn>-->
    <!--        <base-btn mode="mini">-->
    <!--          7d-->
    <!--        </base-btn>-->
    <!--        <base-btn mode="mini">-->
    <!--          All-->
    <!--        </base-btn>-->
    <!--      </div>-->
    <!--      <line-chart-->
    <!--        v-if="totalStakedDataChart"-->
    <!--        class="charts__chart"-->
    <!--        :chart-data="totalStakedDataChart"-->
    <!--      />-->
    <!--    </div>-->
    <div class="chart__container">
      <div class="chart__title">
        {{ title }}
      </div>
      <div class="chart__value">
        {{ value }}
      </div>
      <div class="chart__btns">
        <base-btn mode="mini">
          24h
        </base-btn>
        <base-btn mode="mini-active">
          7d
        </base-btn>
        <base-btn mode="mini">
          All
        </base-btn>
      </div>
      <line-chart
        class="chart__line-chart"
        :chart-data="chartData"
      />
    </div>
    <!--    <div class="charts__container">-->
    <!--      <div class="charts__title">-->
    <!--        Total borrowed-->
    <!--      </div>-->
    <!--      <div class="charts__value">-->
    <!--        - {{ pool.symbol }}-->
    <!--      </div>-->
    <!--      <div class="charts__btns">-->
    <!--        <base-btn mode="mini">-->
    <!--          24h-->
    <!--        </base-btn>-->
    <!--        <base-btn mode="mini">-->
    <!--          7d-->
    <!--        </base-btn>-->
    <!--        <base-btn mode="mini-active">-->
    <!--          All-->
    <!--        </base-btn>-->
    <!--      </div>-->
    <!--      <line-chart-->
    <!--        class="charts__chart"-->
    <!--        :chart-data="formChartData([])"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script>

import LineChart from '~/components/App/LineChart';

export default {
  components: {
    LineChart,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    value: {
      type: String,
      default: '',
    },
    chartData: {
      type: Object,
      default() { return {}; },
    },
    isActive: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  &__container {
    background: #FFFFFF;
    border-radius: 10px;
    max-width: 370px;
    padding: 20px;
  }
  &__title {
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
    margin-bottom: 10px;
  }
  &__value {
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #240B36;
    margin-bottom: 20px;
  }
  &__line-chart {
    max-height: 330px;
  }
  &__btns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
  }
}
</style>

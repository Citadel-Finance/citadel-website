<template>
  <div class="content__charts charts">
    <div class="charts__container">
      <div class="charts__title">
        Available
      </div>
      <div class="charts__value">
        37 411.69 ETH
      </div>
      <line-chart
        :data="chartData"
        :options="options"
      />
    </div>
    <div class="charts__container">
      <div class="charts__title">
        total earnings
      </div>
      <div class="charts__value">
        37 411.69 ETH
      </div>
      <line-chart
        :data="chartData"
        :options="options"
      />
    </div>
    <div class="charts__container">
      <div class="charts__title">
        total borrowed
      </div>
      <div class="charts__value">
        37 411.69 ETH
      </div>
      <line-chart
        :data="chartData"
        :options="options"
      />
    </div>
  </div>
</template>

<script>

import LineChart from '~/components/App/LineChart';

export default {
  components: {
    LineChart,
  },
  data: () => ({
    chartData: {
      labels: ['3 Aug', '28 Sep', '23 Nov', '18 Jan', '15 Mar'],
      datasets: [
        {
          label: 'Data One',
          borderColor: '#C31433',
          borderWidth: 2,
          data: [10, 30, 25, 45, 30],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
};
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  max-width: 1170px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
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
}
</style>

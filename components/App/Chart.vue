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
        :data="chartDataAvailable"
        :options="optionsAvailable"
      />
    </div>
    <div class="charts__container">
      <div class="charts__title">
        Total earnings
      </div>
      <div class="charts__value">
        37 411.69 ETH
      </div>
      <line-chart
        :data="chartDataEarnings"
        :options="optionsEarnings"
      />
    </div>
    <div class="charts__container">
      <div class="charts__title">
        Total borrowed
      </div>
      <div class="charts__value">
        37 411.69 ETH
      </div>
      <line-chart
        :data="chartDataBorrowed"
        :options="optionsBorrowed"
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
    chartDataAvailable: {
      labels: ['3 Aug', '28 Sep', '23 Nov', '18 Jan', '15 Mar'],
      datasets: [
        {
          label: 'Available',
          borderColor: '#C31433',
          borderWidth: 2,
          data: [10, 30, 25, 45, 5],
          fill: false,
          pointBackgroundColor: '#FFFFFF',
          pointHoverBackgroundColor: '#C31433',
          pointRadius: 5,
          pointHoverRadius: 5,
          pointHitRadius: 30,
        },
      ],
    },
    optionsAvailable: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        displayColors: false,
        bodyFontFamily: "sans-serif, 'Arial'",
        bodyFontSize: 14,
      },
    },
    chartDataEarnings: {
      labels: ['3 Aug', '28 Sep', '23 Nov', '18 Jan', '15 Mar'],
      datasets: [
        {
          label: 'Total earnings',
          borderColor: '#C31433',
          borderWidth: 2,
          data: [10, 20, 25, 25, 30],
          fill: false,
          pointBackgroundColor: '#FFFFFF',
          pointHoverBackgroundColor: '#C31433',
          pointRadius: 5,
          pointHoverRadius: 5,
          pointHitRadius: 30,
        },
      ],
    },
    optionsEarnings: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        displayColors: false,
        bodyFontFamily: "sans-serif, 'Arial'",
        bodyFontSize: 14,
      },
    },
    chartDataBorrowed: {
      labels: ['3 Aug', '28 Sep', '23 Nov', '18 Jan', '15 Mar'],
      datasets: [
        {
          label: 'Total borrowed',
          borderColor: '#C31433',
          borderWidth: 2,
          data: [20, 30, 25, 45, 30],
          fill: false,
          pointBackgroundColor: '#FFFFFF',
          pointHoverBackgroundColor: '#C31433',
          pointRadius: 5,
          pointHoverRadius: 5,
          pointHitRadius: 30,
        },
      ],
    },
    optionsBorrowed: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        displayColors: false,
        bodyFontFamily: "sans-serif, 'Arial'",
        bodyFontSize: 14,
      },
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

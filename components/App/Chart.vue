<template>
  <div class="content__charts charts">
    <div class="charts__container">
      <div class="charts__title">
        Total deposited
      </div>
      <div class="charts__value">
        37 411.69 ETH
      </div>
      <line-chart
        class="charts__chart"
        :data="chartData"
        :options="options"
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
        class="charts__chart"
        :data="chartData"
        :options="options"
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
        class="charts__chart"
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
      labels: [1620360000000, 1620446410000, 1620532810000, 1620619200000, 1620705610000, 1620792010000, 1620878410000, 1620964810000, 1621051210000, 1621137600000, 1621224010000, 1621310400000, 1621396800000, 1621483210000, 1621569610000, 1621656010000, 1621742400000, 1621828810000, 1621915200000, 1622433600000, 1622520000000, 1622606400000, 1622692800000, 1622779200000, 1622865600000, 1622952000000, 1623038400000, 1623124800000, 1623211200000, 1623297600000],
      datasets: [
        {
          label: 'all',
          borderColor: '#C31433',
          data: [54079273.3983, 64585025.1455, 66121702.9563, 63880091.4611, 65418465.9871, 66975753.0015, 68506915.9913, 55444097.2677, 66989038.9646, 68516066.8683, 70087684.306, 66442391.304, 67984373.9482, 69513900.4724, 67372740.3647, 68908033.2291, 70042783.7205, 71576449.7653, 69361962.5405, 69719197.8156, 71293396.1984, 72450786.6569, 74070108.1144, 70958476.7309, 72569244.5604, 74179763.9885, 71395586.4449, 72969572.6211, 74244010.609, 75864311.9873],
          borderWidth: 2,
          fill: true,
          backgroundColor: 'rgba(195,20,51,0.05)',
          pointBackgroundColor: '#F9F8FB',
          pointBorderColor: '#C31433',
          pointBorderWidth: 1,
          pointRadius: 2,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: '#F9F8FB',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: () => '',
          label: (item) => `${item.value} OUT`,
        },
        displayColors: false,
        titleFontSize: 14,
        bodyFontFamily: "'Roboto', sans-serif",
        bodyFontSize: 14,
        backgroundColor: 'rgba(12, 12, 20, 0.8)',
        cornerRadius: 6,
        xPadding: 10,
        yPadding: 10,
        caretSize: 6,
      },
      hover: {
        mode: 'nearest',
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                quarter: 'DD.MM',
              },
            },
            gridLines: {
              zeroLineColor: 'rgba(0, 0, 0, 0)',
            },
            ticks: {
              fontSize: 10,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              zeroLineColor: 'rgba(0, 0, 0, 0)',
            },
            ticks: {
              fontSize: 10,
            },
          },
        ],
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
  &__chart {
    max-height: 330px;
  }
}
</style>

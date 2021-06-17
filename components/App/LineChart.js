import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    symbol: {
      type: String,
      default: '',
    },
  },
  data: () => ({
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
          // title: () => '',
          title: (item) => item[0].label,
          label: (item) => `${item.value} ${this.symbol}`,
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
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};

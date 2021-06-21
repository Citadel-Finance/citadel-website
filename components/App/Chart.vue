<template>
  <div class="content__chart chart">
    <div class="chart__container">
      <div class="chart__title">
        {{ title }}
      </div>
      <div class="chart__value">
        {{ value }}
      </div>
      <div class="chart__btns">
        <base-btn
          :mode="activeBtn === 'day' ? 'mini-active' : 'mini'"
          @click="activeBtn='day'"
        >
          24h
        </base-btn>
        <base-btn
          :mode="activeBtn === 'week' ? 'mini-active' : 'mini'"
          @click="activeBtn='week'"
        >
          7d
        </base-btn>
        <base-btn
          :mode="activeBtn === 'all' ? 'mini-active' : 'mini'"
          @click="changePeriod('all')"
        >
          All
        </base-btn>
      </div>
      <line-chart
        class="chart__line-chart"
        :chart-data="chartData"
      />
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
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
    nameChart: {
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
      default: 'day',
    },
  },
  data() {
    return {
      activeBtn: this.isActive,
    };
  },
  methods: {
    ...mapActions({
      fetchTotalStaked: 'charts/fetchTotalStaked',
    }),
    async changePeriod(value) {
      await this.fetchTotalStaked({
        periodType: value,
        chartName: this.nameChart,
      });
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
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
    margin-bottom: 10px;
  }
  &__value {
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
  @include _1199 {
    &__container {
      width: 100%;
      max-width: 100%;
    }
    &__line-chart {
      width: 100%;
    }
  }
  @include _380 {
    &__line-chart {
      max-width: 300px;
      width: 100%;
    }
  }
}
</style>

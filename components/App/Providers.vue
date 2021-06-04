<template>
  <div class="main__providers providers">
    <div class="providers__wrapper">
      <div class="providers__title">
        Top liquidity providers
      </div>
      <div class="providers__table table-main">
        <div class="table-main__body">
          <div
            v-for="(provider, i) in top"
            :key="`position__item-${i}`"
            class="table-main__tr"
          >
            <div class="table-main__col position">
              {{ i + 1 }}
            </div>
            <div class="table-main__col address">
              {{ provider.user }}
            </div>
            <div class="table-main__col contribution">
              {{ provider.staked }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Keepers',
  props: {
  },
  data() {
    return {
      fields: [
        { key: 'position', label: 'Position' },
        { key: 'address', label: 'Address' },
        { key: 'contributions', label: 'Contributions (USD)' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
    }),
    poolAddress() {
      return this.$route.params.address;
    },
    pool() {
      return this.poolsMap[this.poolAddress] || {};
    },
    top() {
      return (this.pool.top || []).slice(0, 3);
    },
  },
};
</script>

<style lang="scss" scoped>
.providers {
  &__wrapper {
    background: #FFFFFF;
    width: 100%;
    max-width: 1170px;
    margin: auto;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-gap: 20px;
  }
  &__title {
    font-size: 21px;
    font-family: sans-serif, 'Conto-Medium';
    line-height: 25px;
    color: #240A36;
  }
}
.table-main {
  &__head {
    background: rgba(36, 11, 54, 0.04);
    border-radius: 10px;
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 20px;
  }
  &__th {
    padding: 14px 20px;
    border: none;
  }
  &__th:last-child {
    display: grid;
    justify-items: end;
  }
  &__tr {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 14px 0;
  }
  &__col {
    padding: 14px 20px;
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
    display: flex;
    align-items: center;
  }
}
.position {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #240A36;
}
.contribution {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  display: grid;
  justify-items: end;
  color: #C31433;
}
</style>

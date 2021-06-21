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
            <div class="table-main__col">
              <img
                :src="Require(`providers/rate_${ i + 1 }.svg`)"
                alt=""
              >
            </div>
            <div class="table-main__col address">
              <div class="address__main">
                <div class="address__title">
                  Address
                </div>
                <div
                  class="address__value"
                  :title="provider.user"
                >
                  {{ SubstrString(provider.user, 0, 6) + '...' + SubstrString(provider.user, provider.user.length - 4, 4) }}
                </div>
              </div>
            </div>
            <div class="table-main__col contribution">
              <div class="contribution__main">
                <div class="contribution__title">
                  Contributions, $
                </div>
                <div
                  class="contribution__value"
                  :title="provider.staked"
                >
                  {{ Floor(provider.staked, 6) }}
                </div>
              </div>
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
      return this.pool.getTop && this.pool.getTop().slice(0, 3);
    },
  },
};
</script>

<style lang="scss" scoped>
.providers {
  width: 100%;
  &__wrapper {
    background: #FFFFFF;
    width: 100%;
    margin: auto;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-gap: 20px;
  }
  &__title {
    color: #240A36;
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.03em;
  }
}
.table-main {
  &__body {
    display: grid;
    grid-gap: 10px;
  }
  &__tr {
    display: grid;
    grid-template-columns: 30px repeat(2, 1fr);
    grid-gap: 35px;
    background: #F6F5F7;
    border-radius: 10px;
    padding: 15px;
    height: 64px;
  }
  &__col {
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
    display: flex;
    align-items: center;
  }
  @include _1199 {
    &__tr {
      height: 111px;
    }
  }
  @include _991 {
    &__tr {
      height: 64px;
    }
  }
  @include _767 {
    &__tr {
      grid-gap: 10px;
    }
  }
}
.address {
  &__main {
    display: grid;
    grid-gap: 5px;
  }
  &__title {
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
  }
  &__value {;
    font-size: 16px;
    line-height: 18px;
    color: #240A36;
  }
}
.contribution {
  &__main {
    display: grid;
    grid-gap: 5px;
  }
  &__title {
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
  }
  &__value {;
    font-size: 16px;
    line-height: 18px;
    color: #240A36;
  }
}
</style>

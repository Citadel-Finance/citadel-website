<template>
  <div class="pools">
    <div class="pools__wrapper">
      <div class="pools__header header">
        <div class="header__title">
          Pools
        </div>
        <div class="header__button">
          <base-btn @click="openAddModal">
            Add new pool
          </base-btn>
        </div>
      </div>
      <client-only>
        <div class="pools__table table-main">
          <b-thead>
            <b-th
              v-for="(field,i) in fields"
              :key="`table__title-${i}`"
            >
              {{ field.label }}
            </b-th>
          </b-thead>
          <b-tbody>
            <nuxt-link
              v-for="(poolAddress, i) in Object.keys(poolsMap)"
              :key="`pool__item-${i}`"
              to="/pools"
              class="table-main__link"
            >
              <b-tr>
                <b-td>
                  <div class="table-main__col currency">
                    <span class="currency__img">
                      <img
                        :src="`https://bscscan.com/token/images/${tokensMap[poolsMap[poolAddress].childAddress].symbol}_32.png`"
                        alt=""
                      >
                    </span>
                    <span class="currency__value">
                      {{ tokensMap[poolsMap[poolAddress].childAddress].symbol }}
                    </span>
                  </div>
                </b-td>
                <b-td>
                  <div class="table-main__col">
                    --
                  </div>
                </b-td>
                <b-td>
                  <div class="table-main__col">
                    {{ poolsMap[poolAddress].totalStaked }}
                  </div>
                </b-td>
                <b-td>
                  <div class="table-main__col balance">
                    {{ tokensMap[poolsMap[poolAddress].childAddress].balance }}
                  </div>
                </b-td>
                <b-td>
                  <div class="table-main__col status">
                    <span
                      class="status__dot"
                      :class="{'slide__dot_active': poolsMap[poolAddress].status === true}"
                    />
                    <span>
                      Inactive
                    </span>
                  </div>
                </b-td>
              </b-tr>
            </nuxt-link>
          </b-tbody>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';
import pools from '~/pages/pools';

export default {
  name: 'Pools',
  data() {
    return {

      // poolsMapTest: {
      //   '0xBC6ae91F55af580B4C0E8c32D7910d00D3dbe54d': {
      //     abi: '....',
      //     totalStaked: 10,
      //   },
      //   '0xBC6ae91F55af580B4C0E8c32D7910d00D3db154d': {
      //     abi: '...',
      //     totalStaked: 20,
      //   },
      // },
      // // Object.keys(poolsMapTest) => []

      fields: [
        { key: 'currency', label: 'Currency' },
        { key: 'apy', label: 'APY' },
        { key: 'liquidity', label: 'Liquidity (USD)' },
        { key: 'balance', label: 'Balance' },
        { key: 'status', label: 'Status' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
      tokensMap: 'user/getTokensMap',
    }),
  },
  methods: {
    openAddModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.addPool,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pools {
  padding: 30px 0 44px;
  &__wrapper {
    margin: auto;
    background: #FFFFFF;
    max-width: 1170px;
    border-radius: 10px;
    padding: 20px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
.header {
  &__title {
    font-size: 21px;
    font-family: sans-serif, 'Conto-Medium';
    line-height: 25px;
    color: #240A36;
    display: flex;
    align-items: center;
  }
  &__button {
    .base-btn {
      font-size: 14px;
      line-height: 17px;
      padding: 10px 15px;
      max-height: 38px;
    }
  }
}
.table-main {
  margin: 20px 0 0 0;
  thead {
    background: rgba(36, 11, 54, 0.04);
    border-radius: 10px;
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
  }
  thead, tbody tr {
    display: grid;
    min-width: 1130px;
    grid-template-columns: repeat(5, 1fr);
  }
  th, td {
    padding: 14px 20px;
    vertical-align: inherit;
    border: none;
  }
  td {
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
    display: flex;
    align-items: center;
  }
  &__link {
    text-decoration: none;
  }
  &__link:hover {
    tr {
      border-radius: 10px;
      background: #F6F5F7;
    }
  }
}
.currency {
  display: flex;
  align-items: center;
  grid-gap: 15px;
  &__value {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #240A36;
  }
}
.balance {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #240A36;
}
.status {
  display: flex;
  grid-gap: 10px;
  align-items: center;
  &__dot {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #C31432;
      transition: 0.3s ease-in-out;
    }
    &_active:before {
      background: #2DCE89;
    }
  }
}
</style>

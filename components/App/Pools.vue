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
      <b-table
        class="pools__table table"
        :items="items"
        :fields="fields"
        borderless
        thead-class="table__header"
      >
        <template #head()="title">
          <div
            class="table__title"
            @click="getPools"
          >
            {{ title.label }}
          </div>
        </template>
        <template #cell(currency)="data">
          <div class="table__col currency">
            <span class="currency__img">
              <img
                src="../../assets/Ethereum.svg"
                alt=""
              >
            </span>
            <span class="currency__value">
              {{ data.value }}
            </span>
          </div>
        </template>
        <template #cell(apy)="data">
          <div class="table__col">
            {{ data.value }}
          </div>
        </template>
        <template #cell(liquidity)="data">
          <div class="table__col">
            {{ data.value }}
          </div>
        </template>
        <template #cell(balance)="data">
          <div class="table__col balance">
            {{ data.value }}
          </div>
        </template>
        <template #cell(status)="data">
          <div class="table__col">
            {{ data.value }}
          </div>
        </template>
      </b-table>
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
      fields: [
        { key: 'currency', label: 'Currency' },
        { key: 'apy', label: 'APY' },
        { key: 'liquidity', label: 'Liquidity (USD)' },
        { key: 'balance', label: 'Balance' },
        { key: 'status', label: 'Status' },
      ],
      items: [
        {
          id: 0, currency: 'ETH', apy: '15.25%', liquidity: '$ 15 256 547', balance: '23 025', status: true,
        },
        {
          id: 1, currency: 'ETH', apy: '15.25%', liquidity: '$ 15 256 547', balance: '23 025', status: true,
        },
        {
          id: 2, currency: 'ETH', apy: '15.25%', liquidity: '$ 15 256 547', balance: '23 025', status: true,
        },
        {
          id: 3, currency: 'ETH', apy: '15.25%', liquidity: '$ 15 256 547', balance: '23 025', status: true,
        },
        {
          id: 4, currency: 'ETH', apy: '15.25%', liquidity: '$ 15 256 547', balance: '23 025', status: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
    }),
  },
  methods: {
    openAddModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.addPool,
      });
    },
    getPools() {
      console.log(this.poolsMap);
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
.pools::v-deep {
  .table {
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
    th, td {
      padding: 14px 20px;
      vertical-align: inherit;
    }
    td {
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      color: #7B6C86;
    }
    th:first-child {
      border-radius: 10px 0 0 10px;
    }
    th:last-child {
      border-radius: 0 10px 10px 0;
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
</style>

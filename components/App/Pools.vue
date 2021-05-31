<template>
  <div class="pools__container">
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
        details-td-class="table__td"
      >
        <template #head()="title">
          <div class="table__title">
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
          <div class="table__col">
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

import modals from '~/store/modals/modals';

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
  &__container {
    padding: 30px 0 44px;
  }
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
.table {
  margin: 20px 0 0 0;
  &__header {
    background: rgba(36, 11, 54, 0.04);
    border-radius: 10px;
  }
  &__col {
    display: flex;
    align-items: center;
  }
  &__td {
    display: flex;
  }
}
.currency {
  grid-gap: 15px;
  &__img {

  }
  &__value {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #240A36;
  }
}
</style>

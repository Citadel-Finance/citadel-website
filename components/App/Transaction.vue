<template>
  <div class="content__transactions transactions">
    <div class="transactions__wrapper">
      <div class="transactions__title">
        Transactions ({{ txs.length }})
      </div>
      <div class="transactions__table table-main">
        <div class="table-main__head">
          <div
            v-for="(field,i) in fields"
            :key="`table__title-${i}`"
            class="table-main__th"
          >
            {{ field.label }}
          </div>
        </div>
        <div class="table-main__body">
          <div
            v-for="(event, i) in pageItems"
            :key="`position__item-${i}`"
            class="table-main__tr"
          >
            <div class="table-main__col date">
              {{ GetFormTimestamp(event.returnValues.date, format = 'LLL') }}
            </div>
            <div class="table-main__col change">
              {{ event.amount }} {{ event.event }}
            </div>
            <div class="table-main__col hash">
              {{ SubstrString(event.transactionHash, 0, 10) + '...' + SubstrString(event.transactionHash, event.transactionHash.length - 10, 10) }}
            </div>
          </div>
        </div>
        <div
          v-if="isConnected && amountOfPages > 1"
          class="transactions__pagination"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="amountOfTxs"
            :per-page="itemsPerPage"
            first-number
            last-number
            class="pagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Transaction',
  props: {
    title: {
      default: '',
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    fields: [
      { key: 'date', label: 'Date' },
      { key: 'change', label: 'Change' },
      { key: 'hash', label: 'TX Hash' },
    ],
    itemsPerPage: 10,
    currentPage: 1,
  }),
  computed: {
    ...mapGetters({
      poolsEventsAll: 'user/getPoolsEventsAll',
      poolsEventsMap: 'user/getPoolsEventsMap',
    }),
    poolAddress() {
      return this.$route.params?.address ?? '';
    },
    txs() {
      const { poolAddress, poolsEventsMap } = this;
      return [...poolsEventsMap[poolAddress] || []].sort((a, b) => a.blockNumber - b.blockNumber).reverse();
    },
    amountOfTxs() {
      return this.txs.length;
    },
    amountOfPages() {
      return Math.ceil(this.amountOfTxs / this.itemsPerPage);
    },
    pageItems() {
      const items = [];
      for (let i = 0; i < this.itemsPerPage; i += 1) {
        const index = (this.currentPage - 1) * this.itemsPerPage + i;
        if (this.txs[index]) items.push(this.txs[index]);
      }
      return items;
    },
  },
};
</script>

<style lang="scss" scoped>
.transactions {
  &__wrapper {
    margin: auto;
    background: #FFFFFF;
    padding: 20px;
    border-radius: 10px;
    display: grid;
    grid-gap: 20px;
  }
  &__title {
    font-size: 21px;
    line-height: 25px;
    color: #240A36;
  }
  &__pagination {
    display: flex;
    justify-content: flex-end;
  }
}
.table-main {
  display: grid;
  grid-gap: 10px;
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
    padding: 14px 20px;
  }
  &__th {
    border: none;
  }
  &__tr {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 22px 20px;
    &:hover {
      background: #FBFAFB;
      border-radius: 10px;
    }
  }
  &__col {
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
    display: flex;
    align-items: center;
  }
}
.date {
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #240A36;
}
.change {
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #240A36;
}
.hash {
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.05em;
  color: #7B6C86;
}
.pagination::v-deep {
  font-family: sans-serif, 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 120%;
  display: flex;
  align-items: center;
  grid-gap: 10px;
  letter-spacing: 0.05em;
  background: rgba(36, 11, 54, 0.04);
  border-radius: 10px;
  padding: 5px;
  height: 40px;
  .page-item {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #240A36;
    &:first-child,
    &:last-child {
      font-size: 24px;
    }
    &.active {
      button {
        width: 30px;
        height: 30px;
        padding: 0;
        background: #C31433;
        color: #FFFFFF;
        border-radius: 5px;
      }
    }
    .page-link {
      width: 30px;
      height: 30px;
      color: #240A36;
      border: none;
      background: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      &:focus {
        box-shadow: none;
      }
    }
  }
  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .disabled {
    .page-link {
      &:first-child,
      &:last-child {
        opacity: 0.2;
      }
    }
  }
}
</style>

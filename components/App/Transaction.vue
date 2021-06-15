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
          v-if="isConnected && txs.length"
          class="transactions__pagination pagination"
        >
          <div class="pagination__wrapper">
            <span
              class="icon-chevron_left pagination__arrow"
              :class="{'pagination__arrow_disabled': currentPage === 1}"
              @click="setPageSettings(currentPage - 1)"
            />
            <span
              v-for="i of amountOfPages"
              :key="`pools__page_${i}`"
              class="pagination__page"
              :class="{'pagination__page_active': currentPage === i}"
              @click="setPageSettings(i)"
            >{{ i }}</span>
            <span
              class="icon-chevron_right pagination__arrow"
              :class="{'pagination__arrow_disabled': currentPage === amountOfPages}"
              @click="setPageSettings(currentPage + 1)"
            />
          </div>
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
    itemsPerPage: 3,
    currentPage: 1,
    startIndex: 0,
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
      return this.txs.slice(this.startIndex, (this.itemsPerPage + this.startIndex));
    },
  },
  methods: {
    setPageSettings(i) {
      this.currentPage = i;
      this.startIndex = this.itemsPerPage * (this.currentPage - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.transactions {
  &__wrapper {
    margin: auto;
    background: #FFFFFF;
    max-width: 1170px;
    padding: 20px;
    border-radius: 10px;
    display: grid;
    grid-gap: 20px;
  }
  &__title {
    font-size: 21px;
    line-height: 25px;
    color: #240A36;
    font-family: sans-serif, 'Conto-Medium';
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
  font-family: sans-serif, 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #240A36;
}
.change {
  font-family: sans-serif, 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #240A36;
}
.hash {
  font-family: sans-serif, 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.05em;
  color: #7B6C86;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  &__wrapper {
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 120%;
    display: flex;
    align-items: center;
    grid-gap: 10px;
    letter-spacing: 0.05em;
    color: #240A36;
    width: auto;
    background: rgba(36, 11, 54, 0.04);
    border-radius: 10px;
    padding: 5px;
    height: 40px;
  }
  &__page {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease-out;
    &:hover {
      cursor: pointer;
    }
    &_active {
      background: #C31433;
      color: #FFFFFF;
    }
  }
  &__arrow {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #FFFFFF;
      color: #C31433;
      cursor: pointer;
    }
    &_disabled {
      opacity: 0.2;
      pointer-events: none;
    }
  }
  span::before {
    font-size: 24px;
    color: #C31433;
  }
}
</style>

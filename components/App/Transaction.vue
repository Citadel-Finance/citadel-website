<template>
  <div class="content__transactions transactions">
    <div class="transactions__wrapper">
      <div class="transactions__title">
        Transactions
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
            v-for="(event, i) in txs"
            :key="`position__item-${i}`"
            class="table-main__tr"
          >
            <div
              class="table-main__col date"
              @click="check(event)"
            >
              {{ GetFormTimestamp(event.returnValues.date, format = 'L') }}
            </div>
            <div class="table-main__col change">
              {{ event.amount }} {{ event.event }}
            </div>
            <div class="table-main__col hash">
              {{ SubstrString(event.transactionHash, 0, 10) + '...' + SubstrString(event.transactionHash, event.transactionHash.length - 10, 10) }}
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
      return [...poolsEventsMap[poolAddress] || []].reverse();
    },
  },
  methods: {
    check(value) {
      console.log(value);
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
</style>

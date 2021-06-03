<template>
  <div class="transactions">
    <div class="transactions__wrapper">
      <div class="transactions__title">
        Transactions
        <!--        <div>-->
        <!--          {{ poolsEventsAll.length }}-->
        <!--        </div>-->
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
        <client-only>
          <div class="table-main__body">
            <div
              v-for="(event, i) in poolsEventsAll"
              :key="`position__item-${i}`"
              class="table-main__tr"
            >
              <div class="table-main__col date">
                {{ event.amount }} {{ event.event }}
              </div>
              <div class="table-main__col change">
                -
              </div>
              <div class="table-main__col hash">
                {{ event.transactionHash }}
              </div>
            </div>
          </div>
        </client-only>
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
    }),
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.transactions {
  padding: 30px 0;
  &__wrapper {
    margin: auto;
    background: #FFFFFF;
    max-width: 1170px;
    padding: 20px;
    border-radius: 10px;
  }
  &__title {
    font-size: 21px;
    line-height: 25px;
    color: #240A36;
    font-family: sans-serif, 'Conto-Medium';
  }
}
.table-main {
  margin: 20px 0 0 0;
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
.change {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #240A36;
}
</style>

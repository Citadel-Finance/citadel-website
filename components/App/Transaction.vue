<template>
  <div>
    <div class="transaction__wrapper">
      <div class="transaction__title__wrapper">
        <div class="transaction__title">
          Transaction
        </div>
        <button
          class="admin__addpool__button"
          @click="openAddModal"
        >
          Add new Pool
        </button>
      </div>
      <b-row class="transaction__header">
        <b-col class="transaction__header_title">
          Date
        </b-col>
        <b-col class="transaction__header_title">
          Change
        </b-col>
        <b-col class="transaction__header_title">
          TX HASH
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
      <b-row class="transaction__header__items">
        <b-col class="transaction__header__items_title_01">
          15.25%
        </b-col>
        <b-col class="transaction__header__items_title_02">
          $ 15 256 547
        </b-col>
        <b-col class="transaction__header__items_title_01">
          dgdg5s6...sgsgsf465s
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import modals from '@/store/modals/modals';

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

<style lang="scss">
.transaction__wrapper {
  margin: auto;
  background: #FFFFFF;
  max-width: 1170px;
  height: 466px;
  border-radius: 10px;
  align-items: center;
  margin-top: 30px;
}
.transaction__title__wrapper {
  align-items: center;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.admin__addpool__button {
  align-items: center;
  text-align: center;
  background: #C31433;
  height: 38px;
  width: 129px;
  color: white;
  border-radius: 10px;
  margin-right: 20px;
}
.transaction__title {
  margin: 20px;
  font-size: 21px;
}
.transaction__header {
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background: #F6F5F7;
  border-radius: 10px;
  margin: 0px 20px 24px 20px;
}
.transaction__header_title {
  font-size: 10px;
  font-weight: 700;
  color: #7B6C86;
  &:last-child {
    text-align: right;
  }
}
.transaction__header__items {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 20px 20px 40px 20px;
}
.transaction__header__items_title_01 {
  font-size: 16px;
  font-weight: 400;
  color: #7B6C86;
  &:last-child {
    text-align: right;
    //margin-right: 50px;
  }
}
.transaction__header__items_title_02 {
  font-size: 16px;
  font-weight: 500;
  color: #240A36;
}
</style>

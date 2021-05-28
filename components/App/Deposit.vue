<template>
  <div class="deposit__container">
    <div class="deposit__container_cards">
      <div class="balance__card">
        Your Balance
        <hr class="balance__hr">
        <div class="balance__number">
          10.26000000 ETH
        </div>
      </div>
      <div class="balance__card">
        Your Balance
        <hr class="balance__hr">
        <div class="balance__number">
          10.26000000 ETH
        </div>
      </div>
      <div class="balance__card">
        Your Balance
        <hr class="balance__hr">
        <div class="balance__number">
          10.26000000 ETH
        </div>
      </div>
    </div>
    <div class="deposit__buttons">
      <base-btn @click="openDepositModal">
        Deposit
      </base-btn>
      <base-btn @click="openWithdrawModal">
        Withdraw
      </base-btn>
    </div>
  </div>
</template>

<script>
import modals from '@/store/modals/modals';

export default {
  name: 'Deposit',
  components: {
  },
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
    openWithdrawModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.withdrawPool,
      });
    },
    openDepositModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.depositPool,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.deposit {
  &__buttons {
    width: 100%;
    display: grid;
    grid-gap: 12px;
  }
}
.deposit__container {
  padding: 20px;
  width: 1170px;
  height: 154px;
  background: #FFFFFF;
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: auto;
  max-width: 1170px;
  border-radius: 10px;
}
.deposit__container_cards {
  margin: 0px 20px 0px 20px;
  display: flex;
}
.deposit__card {
  padding: 0px 20px;
  height: 114px;
  width: 236px;
  max-width: 236px;
}
.balance__card{
  padding-top: 20px;
  padding-left: 15px;
  font-size: 10px;
  width: 234px;
  max-width: 234px;
  height: 114px;
  background: #F6F5F7;
  border-radius: 10px;
  margin: 0px 20px 0px 0px;
}
.balance__hr {
  border: 2px solid #C31433;
  color: darkred;
  background: black;
  width: 40px;
  margin: 20px 0px 0px 0px;
}
.balance__number {
  padding: 10px 0px 10px 0px;
  font-size: 20px;
  color: #240B36;
}
</style>

<template>
  <div class="balance__container">
    <div class="balance__title">
      Balance CitaDEL
    </div>
    <div class="balance__row">
      <Card title="SUPPLY CITADEL" />
      <Card title="BALANCE CITADEL" />
      <Card title="REWARDS CITADEL" />
      <Card title="PRICE CITADEL" />
    </div>
    <div
      class="balance__btn"
      @click="openClaimModal"
    >
      Claim
    </div>
  </div>
</template>

<script>
import modals from '@/store/modals/modals';
import Card from '~/components/App/Card';

export default {
  name: 'Balance',
  components: {
    Card,
  },
  props: {
  },
  methods: {
    openClaimModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.claimPool,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.balance__row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -5px;
}
.balance__container{
  background: #FFFFFF;
  width: 370px;
  height: 466px;
  padding: 20px;
  border-radius: 10px;
}

.balance__btn {
  margin-top: 15px;
  height: 59px;
  width: 330px;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #FFFFFF;
  transition: .3s;
  background: #E6A1AE;
}
.balance__title{
  padding-bottom: 20px;
}
</style>

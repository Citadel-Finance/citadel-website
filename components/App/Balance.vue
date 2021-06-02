<template>
  <div class="balance">
    <div class="balance__title">
      {{ title }}
    </div>
    <div class="balance__card">
      <Card title="SUPPLY CITADEL" />
      <Card title="BALANCE CITADEL" />
      <Card title="REWARDS CITADEL" />
      <Card title="PRICE CITADEL" />
    </div>
    <div class="balance__button">
      <base-btn @click="openClaimModal">
        Claim
      </base-btn>
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
  data() {
    return {
      title: 'Balance CitaDEL',
    };
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
.balance {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  &__title {
    font-size: 21px;
    line-height: 25px;
    color: #240A36;
    margin-bottom: 20px;
  }
  &__card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  &__button {
    margin-top: 20px;
  }
}
</style>

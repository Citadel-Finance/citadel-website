<template>
  <div class="balance">
    <div class="balance__title">
      {{ title }}
    </div>
    <div class="balance__card">
      <div>
        supply: {{ ctlToken.totalSupply }}
      </div>
      <div>
        balance: {{ ctlToken.balance }}
      </div>
      <div>
        rewards: -
        <!--        нужен метод getAvailableRewards-->
        <!--        нужен метод claimAllPools-->
      </div>
      <div>
        price: -
      </div>
      <!--      <Card title="SUPPLY CITADEL" />-->
      <!--      <Card title="BALANCE CITADEL" />-->
      <!--      <Card title="REWARDS CITADEL" />-->
      <!--      <Card title="PRICE CITADEL" />-->
    </div>
    <div class="balance__button">
      <base-btn
        class="balance__base-btn"
        @click="openClaimModal"
      >
        Claim
      </base-btn>
    </div>
  </div>
</template>

<script>
import modals from '@/store/modals/modals';
import { mapGetters } from 'vuex';
// import Card from '~/components/App/Card';

export default {
  name: 'Balance',
  components: {
    // Card,
  },
  computed: {
    ...mapGetters({
      ctlToken: 'user/getCtlToken',
    }),
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
  margin-top: 30px;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  &__title {
    font-size: 21px;
    font-family: sans-serif, 'Conto-Medium';
    line-height: 25px;
    color: #240A36;
    margin-bottom: 20px;
  }
  &__card {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
  }
  &__button {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    margin-top: 20px;
  }
  &__base-btn {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }
}
</style>

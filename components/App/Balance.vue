<template>
  <div class="content__balance balance">
    <div class="balance__wrapper">
      <div class="balance__title">
        {{ title }}
      </div>
      <div class="balance__cards cards">
        <Card
          title="Supply CitaDEL"
          :value="`${ctlToken.totalSupply}`"
        />
        <Card
          title="Balance CitaDEL"
          :value="`${ctlToken.balance}`"
        />
        <Card
          title="Rewards CitaDEL"
          value="-"
        />
        <Card
          title="Price CitaDEL"
          value="-"
        />
        <base-btn
          class="balance__base-btn"
          mode="backImg"
          @click="openClaimModal"
        >
          Claim your tokens
          <span class="icon-sub_right" />
        </base-btn>
      </div>
    </div>
  </div>
</template>

<script>
import modals from '@/store/modals/modals';
import { mapGetters } from 'vuex';
import Card from '~/components/App/Card';

export default {
  name: 'Balance',
  components: {
    Card,
  },
  data() {
    return {
      title: 'Balance CitaDEL',
    };
  },
  computed: {
    ...mapGetters({
      ctlToken: 'user/getCtlToken',
    }),
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
  &__wrapper {
    background: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-gap: 20px;
  }
  &__title {
    font-size: 21px;
    font-family: sans-serif, 'Conto-Medium';
    line-height: 25px;
    color: #240A36;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
  }
  &__base-btn {
    width: 100%;
    span::before {
      color: #FFFFFF;
      font-size: 24px;
    }
  }
}
</style>

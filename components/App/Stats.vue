<template>
  <div class="main__deposit deposit deposit__wrapper">
    <div class="deposit__title">
      Your stats
    </div>
    <div class="deposit__balance-card balance-card">
      <div class="balance-card__container">
        <div class="balance-card__title">
          Your Deposit
        </div>
        <hr class="balance-card__line">
        <div
          class="balance-card__value"
          :title="`${pool.userStaked}`"
        >
          {{ Floor(pool.userStaked) }} {{ pool.symbol }}
        </div>
      </div>
      <div class="balance-card__container">
        <div class="balance-card__title">
          Your earnings
        </div>
        <hr class="balance-card__line">
        <div class="balance-card__value">
          {{ Floor(pool.availableReward) }} {{ pool.symbol }}
        </div>
      </div>
      <div class="balance-card__container">
        <div class="balance-card__title">
          Total borrowed
        </div>
        <hr class="balance-card__line">
        <div class="balance-card__value">
          -
        </div>
      </div>
    </div>
    <div class="deposit__buttons">
      <base-btn
        mode="primary"
        @click="openDepositModal"
      >
        Deposit
      </base-btn>
      <base-btn
        mode="primary"
        @click="openWithdrawModal"
      >
        Withdraw
      </base-btn>
    </div>
  </div>
</template>

<script>
import modals from '@/store/modals/modals';
import { mapGetters } from 'vuex';

export default {
  name: 'Deposit',
  components: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
    }),
  },
  props: {
    balance: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
      tokensMap: 'user/getTokensMap',
    }),
    poolAddress() {
      return this.$route.params.address;
    },
    pool() {
      return this.poolsMap[this.poolAddress] || {};
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
  &__wrapper {
    width: 100%;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__title {
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.03em;
    color: #240A36;
  }
  &__balance-card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
  }
  &__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    width: 100%;
    align-content: center;
  }
}
.balance-card {
  &__container {
    padding: 20px 15px;
    width: 100%;
    background: #F6F5F7;
    border-radius: 10px;
  }
  &__title {
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
  }
  &__line {
    width: 68px;
    margin: 41px auto 15px 0;
    border: none;
    background-color: #C31433;
    color: #C31433;
    height: 3px;
  }
  &__value {
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #240B36;
  }
}
</style>

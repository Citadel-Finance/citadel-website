<template>
  <div class="main__stats stats stats__wrapper">
    <div class="stats__title">
      Your stats
    </div>
    <div class="stats__balance-card balance-card">
      <div class="balance-card__container balance-card__deposit">
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
      <div class="balance-card__container balance-card__earnings">
        <div class="balance-card__title">
          Your earnings
        </div>
        <hr class="balance-card__line">
        <div class="balance-card__value">
          {{ Floor(pool.availableReward) }} {{ pool.symbol }}
        </div>
      </div>
      <div class="balance-card__container balance-card__borrowed">
        <div class="balance-card__title">
          Total borrowed
        </div>
        <hr class="balance-card__line">
        <div class="balance-card__value">
          -
        </div>
      </div>
    </div>
    <div class="stats__buttons">
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
      this.Signer(() => {
        this.ShowModal({
          text: 'WalletConnect',
          key: modals.withdrawPool,
        });
      });
    },
    openDepositModal() {
      this.Signer(() => {
        this.ShowModal({
          text: 'WalletConnect',
          key: modals.depositPool,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.stats {
  &__wrapper {
    width: 100%;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
  }
  &__title {
    color: #240A36;
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.03em;
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
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #240B36;
  }
  @include _1199 {
    grid-template-columns: repeat(2, 1fr);
    &__deposit {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    &__earnings {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    &__borrowed {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
    }
  }
  @include _991 {
    grid-template-columns: repeat(3, 1fr);
    &__deposit {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    &__earnings {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    &__borrowed {
      grid-column-start: 3;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 2;
    }
  }
  @include _575 {
    grid-template-columns: 1fr;
    &__deposit {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    &__earnings {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2;
      grid-row-end: 3;
    }
    &__borrowed {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 3;
      grid-row-end: 4;
    }
  }
}
</style>

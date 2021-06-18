<template>
  <div class="content__balance balance">
    <div class="balance__wrapper">
      <div class="balance__title">
        {{ title }}
      </div>
      <div class="balance__cards cards">
        <Card
          title="Supply CitaDEL"
          :value="`${ctlToken.totalSupply || '-'}`"
          class="cards__supply"
        />
        <Card
          title="Balance CitaDEL"
          :value="`${Floor(ctlToken.balance)}`"
          :is-disconnected="!isConnected"
          class="cards__balance"
        />
        <Card
          title="Rewards CitaDEL"
          :value="`${Floor(availableCtlReward)}`"
          :is-disconnected="!isConnected"
          class="cards__rewards"
        />
        <Card
          title="Price CitaDEL"
          value="-"
          class="cards__price"
        />
        <base-btn
          class="balance__btn claim"
          mode="backImg"
          @click="openClaimModal"
        >
          <span class="claim__top">
            Claim your tokens
          </span>
          <span class="claim__bottom">
            <span class="icon-sub_right" />
          </span>
        </base-btn>
      </div>
    </div>
  </div>
</template>

<script>
import modals from '@/store/modals/modals';
import { mapActions, mapGetters } from 'vuex';
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
      availableCtlReward: 'user/getAvailableCtlReward',
    }),
  },
  methods: {
    ...mapActions({
      // updatePoolsData: 'user/updatePoolsData',
      updateRewardData: 'user/updateRewardData',
    }),
    async openClaimModal() {
      this.Signer(async () => {
        // await this.updatePoolsData();
        this.SetLoader(true);
        await this.updateRewardData();
        this.SetLoader(false);
        this.ShowModal({
          text: 'WalletConnect',
          key: modals.claimPool,
        });
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
    line-height: 25px;
    color: #240A36;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
  }
  &__btn {
    width: 100%;
    span::before {
      color: #FFFFFF;
      font-size: 24px;
    }
  }
  @include _991 {
    .cards {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      &__supply {
        grid-column-start: 1;
        grid-column-end: 3;
      }
      &__balance {
        grid-column-start: 3;
        grid-column-end: 5;
      }
      &__rewards {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
      }
      &__price {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 2;
        grid-row-end: 3;
      }
    }
    .claim {
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 3;
    }
  }
  @include _767 {
    .cards {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      &__supply {
        grid-column-start: 1;
        grid-column-end: 2;
      }
      &__balance {
        grid-column-start: 2;
        grid-column-end: 3;
      }
      &__rewards {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
      }
      &__price {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
      }
    }
    .claim {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 3;
      grid-row-end: 4;
    }
  }
  @include _380;
}
.claim {
  transition: 0s;
  height: 127px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__bottom {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
}
</style>

<template>
  <ctm-modal-box title="Claim">
    <!--    <div class="ctm-modal__box">-->
    <div class="ctm-modal__main main">
      <div class="main__text">
        {{ claimText }}
      </div>
      <div class="main__rewards rewards">
        <div>
          <div
            v-for="(item, i) in availablePoolsRewardNoZero"
            :key="i"
          >
            {{ item.symbol }} {{ Floor(item.reward) }}
          </div>
        </div>
        <!--        <div class="rewards__titles">-->
        <!--          <span-->
        <!--            v-for="(item, i) in rewardsTitle"-->
        <!--            :key="i"-->
        <!--            class="rewards__title"-->
        <!--          >-->
        <!--            {{ item }}-->
        <!--          </span>-->
        <!--        </div>-->
        <!--        <div class="rewards__values">-->
        <!--          <span-->
        <!--            v-for="(item, i) in rewardsValues"-->
        <!--            :key="i"-->
        <!--            class="rewards__value"-->
        <!--          >-->
        <!--            {{ item }}-->
        <!--          </span>-->
        <!--        </div>-->
      </div>
      <div class="main__amount amount">
        <div class="amount__title">
          Total amount:
        </div>
        <div class="amount__value">
          {{ Floor(availableCtlReward) }} {{ ctl.symbol }}
        </div>
      </div>
      <div class="main__buttons">
        <base-btn
          :mode="'secondary'"
          @click="close()"
        >
          Close
        </base-btn>
        <base-btn
          mode="primary"
          @click="handleClaimAll"
        >
          Claim all
        </base-btn>
      </div>
    </div>
    <!--    </div>-->
  </ctm-modal-box>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    isUnclosable: {
      type: Boolean,
      default: false,
    },
    isHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      claimText: 'To deposit ETH, you will be prompted to confirm the deposit. ',
      amount: '100.26000000 ETH',
      rewardsTitle: {
        earlyRewards: 'Early rewards:',
        lp1Rewards: 'LP1 rewards:',
        lp2Rewards: 'LP2 rewards:',
        hidingGameRewards: 'Hiding game rewards:',
      },
      rewardsValues: {
        earlyRewards: '23.25640000 ETH',
        lp1Rewards: '23.25640000 ETH',
        lp2Rewards: '23.25640000 ETH',
        hidingGameRewards: '23.25640000 ETH',
      },
    };
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
      availableCtlReward: 'user/getAvailableCtlReward',
      availablePoolsReward: 'user/getAvailablePoolsReward',
      ctl: 'user/getCtlToken',
    }),
    availablePoolsRewardNoZero() {
      return this.availablePoolsReward.filter((item) => +item.reward !== 0);
    },
  },
  methods: {
    ...mapActions({
      claimAll: 'user/claimAll',
    }),
    close() {
      this.$store.dispatch('modals/hide');
    },
    async handleClaimAll() {
      await this.claimAll();
    },
  },
};
</script>
<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}
.main {
  padding: 20px;
  &__text {
    font-weight: 300;
    letter-spacing: 0.05em;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
  }
  &__title {
    margin: 30px 0 10px;
    color: #240A36;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
  }
}
.rewards {
  background: #F6F5F7;
  border-radius: 10px;
  padding: 20px 15px;
  margin: 20px 0 10px;
  display: flex;
  justify-content: space-between;
  &__titles {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
  }
  &__values {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #240A36;
  }
}
.amount {
  display: flex;
  padding: 20px 15px;
  justify-content: space-between;
  margin-bottom: 10px;
  &__title {
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
  }
  &__value {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #240B36;
  }
}
</style>

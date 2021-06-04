<template>
  <div class="ctm-modal__box">
    <div
      v-if="isHeader === true"
      class="ctm-modal__header"
    >
      <div class="ctm-modal__title">
        {{ title || options.title || 'Claim' }}
      </div>
      <button
        v-if="!options.isUnclosable"
        class="ctm-modal__x"
        @click="close()"
      >
        <img
          :src="Require('x.svg')"
          alt="x"
        >
      </button>
    </div>
    <div class="claim-modal__main">
      <div class="claim-modal__text">
        {{ claimText }}
      </div>
      <div class="claim-modal__rewards rewards">
        <div class="rewards__titles">
          <span
            v-for="(item, i) in rewardsTitle"
            :key="i"
            class="rewards__title"
          >
            {{ item }}
          </span>
        </div>
        <div class="rewards__values">
          <span
            v-for="(item, i) in rewardsValues"
            :key="i"
            class="rewards__value"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <div class="claim-modal__amount amount">
        <div class="amount__title">
          Total amount:
        </div>
        <div class="amount__value">
          {{ amount }}
        </div>
      </div>
      <div class="claim-modal__buttons">
        <base-btn
          :mode="'secondary'"
          @click="close()"
        >
          Close
        </base-btn>
        <base-btn>
          Claim all
        </base-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

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
    }),
  },
  methods: {
    close() {
      this.$store.dispatch('modals/hide');
    },
  },
};
</script>
<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}
.claim-modal {
  &__main {
    padding: 20px;
  }
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

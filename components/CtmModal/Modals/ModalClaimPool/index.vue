<template>
  <ctm-modal-box title="Claim">
    <div class="ctm-modal__main main">
      <div
        v-if="availablePoolsRewardNoZero.length === 0"
        class="main__message"
      >
        You don't have tokens for claim
      </div>
      <div class="main__rewards rewards">
        <div
          v-for="(item, i) in availablePoolsRewardNoZero"
          :key="i"
          class="main__token"
        >
          <div class="rewards__titles">
            <span class="rewards__title">
              {{ getSymbolByPool(item.pool) }}
            </span>
          </div>
          <div class="rewards__values">
            <span class="rewards__value">
              {{ Floor(item.reward) }}
            </span>
          </div>
        </div>
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
          :disabled="availablePoolsRewardNoZero.length === 0"
          @click="handleClaimAll"
        >
          Claim all
        </base-btn>
      </div>
    </div>
  </ctm-modal-box>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
      availableCtlReward: 'user/getAvailableCtlReward',
      availablePoolsReward: 'user/getAvailablePoolsReward',
      ctl: 'user/getCtlToken',
      poolsMap: 'user/getPoolsMap',
    }),
    availablePoolsRewardNoZero() {
      return this.availablePoolsReward.filter((item) => +item.reward !== 0);
    },
  },
  methods: {
    ...mapActions({
      claimAll: 'user/claimAll',
      updateRewardData: 'user/updateRewardData',
    }),
    close() {
      this.$store.dispatch('modals/hide');
    },
    getSymbolByPool(address) {
      return this.poolsMap[address].symbol;
    },
    async handleClaimAll() {
      this.SetLoader(true);
      await this.claimAll();
      await this.updateRewardData();
      this.SetLoader(false);
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
  &__message {
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
  }
  &__token {
    display: flex;
    justify-content: space-between;
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
  margin: 0 0 10px;
  display: grid;
  grid-gap: 15px;
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
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
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

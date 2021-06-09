<template>
  <ctm-modal-box title="Edit pool">
    <div class="ctm-modal__main main">
      <div class="main__title">
        Tokens per block
      </div>
      <base-input
        v-model="tokensPerBlockClone"
        :placeholder="'1000'"
        class="main__input"
      />
      <div class="main__title">
        APY tax
      </div>
      <base-input
        v-model="apyTaxClone"
        :placeholder="'0.7%'"
        class="main__input"
      />
      <div class="main__title">
        Pool rewards
      </div>
      <base-input
        v-model="premiumCoeffClone"
        :placeholder="'20.06%'"
        class="main__input"
      />
      <div class="main__title">
        Status
      </div>
      <base-radio
        v-model="isEnabledClone"
        :options="optionsRadio"
        class="main__radio"
      />
      <div class="main__buttons">
        <base-btn
          :mode="'secondary'"
          @click="close()"
        >
          Close
        </base-btn>
        <base-btn
          mode="primary"
          @click="handleEditPool"
        >
          Save
        </base-btn>
      </div>
    </div>
  </ctm-modal-box>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    optionsRadio: [
      {
        label: 'Active', item: true,
      },
      {
        label: 'Inactive', item: false,
      },
    ],
    isEnabledClone: false,
    tokensPerBlockClone: false,
    apyTaxClone: false,
    premiumCoeffClone: false,
  }),
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
      poolsMap: 'user/getPoolsMap',
    }),
    poolAddress() {
      return this.options.poolAddress;
    },
    pool() {
      return this.poolsMap[this.poolAddress];
    },
    tokensPerBlock() {
      return this.pool.getTokensPerBlock();
    },
    apyTax() {
      return this.pool.getApyTax();
    },
    premiumCoeff() {
      return this.pool.getPremiumCoeff();
    },
    isEnabled() {
      return this.pool.getIsEnabled();
    },
  },
  watch: {
    tokensPerBlock: {
      immediate: true,
      handler(value) {
        this.tokensPerBlockClone = value;
      },
    },
    apyTax: {
      immediate: true,
      handler(value) {
        this.apyTaxClone = value;
      },
    },
    premiumCoeff: {
      immediate: true,
      handler(value) {
        this.premiumCoeffClone = value;
      },
    },
    isEnabled: {
      immediate: true,
      handler(value) {
        this.isEnabledClone = value;
      },
    },
  },
  methods: {
    close() {
      this.$store.dispatch('modals/hide');
    },
    async handleEditPool() {
      // console.log(this.poolAddress, this.tokensPerBlock, this.apyTax, this.premiumCoeff, this.isEnabled);
      // console.log(this.poolAddress, this.tokensPerBlockClone, this.apyTaxClone, this.premiumCoeff, this.isEnabledClone);
      this.SetLoader(true);
      const {
        poolAddress, tokensPerBlockClone, apyTaxClone, premiumCoeffClone, isEnabledClone,
      } = this;
      await this.$store.dispatch('user/editPool', {
        poolAddress,
        tokensPerBlock: tokensPerBlockClone,
        apyTax: apyTaxClone,
        premiumCoeff: premiumCoeffClone,
        isEnabled: isEnabledClone,
      });
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
  &__title {
    margin-bottom: 10px;
    color: #240A36;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
  &__input {
    margin-bottom: 10px;
  }
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
  }
  &__radio {
    margin: 22px 0 37px;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
  }
}
</style>

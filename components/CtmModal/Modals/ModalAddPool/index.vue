<template>
  <ctm-modal-box title="Add pool">
    <div class="ctm-modal__main main">
      <div class="main__title">
        Token address
      </div>
      <base-input
        v-model="tokenAddress"
        :placeholder="'0x000000000000000000000000000000000000000O'"
        class="main__input"
      />
      <div class="main__title">
        Tokens per block
      </div>
      <base-input
        v-model="tokensPerBlock"
        :placeholder="'1000'"
        class="main__input"
      />
      <div class="main__title">
        APY tax
      </div>
      <base-input
        v-model="apyTax"
        :placeholder="'0.07%'"
        class="main__input"
      />
      <div class="main__title">
        Pool rewards
      </div>
      <base-input
        v-model="premiumCoeff"
        :placeholder="'20.06%'"
        class="main__input"
      />
      <div class="main__title">
        Status
      </div>
      <base-radio
        v-model="selected"
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
          @click="handleCreatePool"
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
  data: () => ({
    // tokenAddress: '0x4B1308749dD122844A3527704c117c3Cb9d9D30C',
    // startTime: '0',
    // tokensPerBlock: '12',
    // apyTax: '10',
    // premiumCoeff: '1',
    tokenAddress: '',
    startTime: '0',
    tokensPerBlock: '',
    apyTax: '',
    premiumCoeff: '',
    optionsRadio: [
      { label: 'Active', item: 'true', isActive: false },
      { label: 'Inactive', item: 'false', isActive: false },
    ],
    selected: '',
  }),
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  methods: {
    close() {
      this.$store.dispatch('modals/hide');
    },
    handleCreatePool() {
      console.log(this.poolAddress, this.tokensPerBlock, this.apyTax, this.premiumCoeff, this.selected);
      // const {
      //   tokenAddress, startTime, tokensPerBlock, apyTax, premiumCoeff, selected,
      // } = this;
      // this.$store.dispatch('user/createPool', {
      //   tokenAddress,
      //   startTime,
      //   tokensPerBlock,
      //   apyTax,
      //   premiumCoeff,
      //   selected,
      // });
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
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
    margin-top: 20px;
  }
}
</style>

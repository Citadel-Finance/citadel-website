<template>
  <ctm-modal-box title="Edit pool">
    <div class="ctm-modal__main main">
      <div class="main__title">
        Liquidity mining reward
      </div>
      <base-input
        :placeholder="'1000'"
        class="main__input"
      />
      <div class="main__title">
        APY tax
      </div>
      <base-input
        :placeholder="'0.7%'"
        class="main__input"
      />
      <div class="main__title">
        Status
      </div>
      <base-radio
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
      optionsRadio: [
        { label: 'Active', item: 'active', isActive: false },
        { label: 'Inactive', item: 'inactive', isActive: false },
      ],
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
    async handleEditPool() {
      await this.$store.dispatch('user/editPool', {
        poolAddress: '0x9A2b6F7943F1a212391aDe10d58548B1B9e2d868', //
        tokensPerBlock: '0',
        apyTax: '0',
        premiumCoeff: '0',
        isEnable: true,
      });
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

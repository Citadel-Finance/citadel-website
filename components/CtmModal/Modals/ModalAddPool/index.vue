<template>
  <ctm-modal-box title="Add pool">
    <div class="ctm-modal__main main">
      <div class="main__title">
        Something
      </div>
      <base-input
        :placeholder="'20.06%'"
        class="main__input"
      />
      <div class="main__buttons">
        <base-btn
          :mode="'secondary'"
          @click="close()"
        >
          Close
        </base-btn>
        <base-btn @click="handleCreatePool">
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
    tokenAddress: '0x3281b72e55d1dbe9d63395dedeae0bbe8b4dc6d9',
    tokensPerBlock: '12',
    apyTax: '10',
    premiumCoeff: '1',
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
      const {
        tokenAddress, tokensPerBlock, apyTax, premiumCoeff,
      } = this;
      this.$store.dispatch('user/createPool', {
        tokenAddress,
        startTime: '0', // always 0
        tokensPerBlock,
        apyTax,
        premiumCoeff,
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
    margin-bottom: 140px;
  }
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
  }
}
</style>

<template>
  <ctm-modal-box title="Add pool">
    <validation-observer v-slot="{ handleSubmit }">
      <form @submit.prevent>
        <div class="ctm-modal__main main">
          <div class="main__title">
            Token address
          </div>
          <base-input
            v-model="tokenAddress"
            :name="'Token address'"
            :placeholder="'0x0000000000000000000000000000000000000000'"
            rules="required|address"
            class="main__input"
          />
          <div class="main__title">
            Tokens per block
          </div>
          <base-input
            v-model="tokensPerBlock"
            :type="'number'"
            :name="'Tokens per block'"
            :placeholder="'1000'"
            rules="required|number"
            class="main__input"
          />
          <div class="main__title">
            APY tax
          </div>
          <base-input
            v-model="apyTax"
            :type="'number'"
            :name="'APY tax'"
            :placeholder="'0.07'"
            rules="required|number"
            class="main__input"
          />
          <div class="main__title">
            Pool rewards
          </div>
          <base-input
            v-model="premiumCoeff"
            :type="'number'"
            :name="'Pool rewards'"
            :placeholder="'20.06'"
            rules="required|number"
            class="main__input"
          />
          <div class="main__title">
            Status
          </div>
          <base-radio
            v-model="isEnabled"
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
              @click="handleSubmit(handleCreatePool)"
            >
              Add
            </base-btn>
          </div>
        </div>
      </form>
    </validation-observer>
  </ctm-modal-box>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    tokenAddress: '',
    tokensPerBlock: '',
    apyTax: '',
    premiumCoeff: '',
    optionsRadio: [
      {
        label: 'Active', item: true,
      },
      {
        label: 'Inactive', item: false,
      },
    ],
    isEnabled: true,
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
    async handleCreatePool() {
      this.SetLoader(true);
      console.log(this.tokensPerBlock, this.apyTax, this.premiumCoeff, this.isEnabled);
      const {
        tokenAddress, tokensPerBlock, apyTax, premiumCoeff, isEnabled,
      } = this;
      await this.$store.dispatch('user/createPool', {
        tokenAddress,
        tokensPerBlock,
        apyTax,
        premiumCoeff,
        isEnabled,
      });
      await this.$store.dispatch('user/updatePoolsAndBalances');
      this.SetLoader(false);
      this.close(); // TODO success modal
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

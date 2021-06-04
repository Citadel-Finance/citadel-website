<template>
  <div class="ctm-modal__box">
    <div
      v-if="isHeader === true"
      class="ctm-modal__header"
    >
      <div class="ctm-modal__title">
        {{ title || options.title || 'Edit Pool' }}
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
    <div class="edit-modal__main">
      <div class="edit-modal__title">
        Liquidity mining reward
      </div>
      <base-input
        :placeholder="'1000'"
        class="edit-modal__input"
      />
      <div class="edit-modal__title">
        APY tax
      </div>
      <base-input
        :placeholder="'0.7%'"
        class="edit-modal__input"
      />
      <div class="edit-modal__title">
        Status
      </div>
      <base-radio
        :options="optionsRadio"
        class="edit-modal__radio"
      />
      <div class="edit-modal__buttons">
        <base-btn
          :mode="'secondary'"
          @click="close()"
        >
          Close
        </base-btn>
        <base-btn>
          Save
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
      optionsRadio: [
        { label: 'Active', item: 'active', isActive: false },
        { label: 'Inactive', tem: 'inactive', isActive: false },
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
  },
};
</script>
<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}
.edit-modal {
  &__main {
    padding: 20px;
  }
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

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
          src="~/assets/x.svg"
          alt="x"
        >
      </button>
    </div>
    <div class="edit-modal__main">
      <div class="edit-modal__title">
        Liquidity minig reward
      </div>
      <base-input
        :placeholder="'20.06%'"
        class="edit-modal__input"
      />
      <div class="edit-modal__title">
        APE tax
      </div>
      <base-input
        :placeholder="'0.7%'"
        class="edit-modal__input"
      />
      <div class="edit-modal__title">
        Status
      </div>
      <base-radio />
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
      // optionsRadio: [
      //   { label: 'Active', value: 1 },
      //   { label: 'Inactive', value: 2 },
      // ],
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
}
</style>

<template>
  <div class="ctm-modal__box">
    <div
      v-if="isHeader === true"
      class="ctm-modal__header"
    >
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
    <div class="status-modal__main">
      <div class="status-modal__title">
        {{ title }}
      </div>
      <div class="status-modal__text">
        {{ text }}
      </div>
      <div class="status-modal__buttons">
        <base-btn
          :mode="'secondary'"
          @click="close()"
        >
          Close
        </base-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    isHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      title: 'Error',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit sagittis et egestas vestibulum.'
        + 'Suspendisse facilisi dictum urna, lorem imperdiet dignissim. ',
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
  &__header {
    display: grid;
    justify-content: end;
  }
}
.status-modal {
  &__main {
    padding: 20px;
  }
  &__title {
    margin: 20px 0;
    color: #240A36;
    font-weight: 500;
    font-size: 21px;
    line-height: 25px;
    display: flex;
    justify-content: center;
  }
  &__text {
    font-weight: 300;
    letter-spacing: 0.05em;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
    text-align: center;
    margin-bottom: 40px;
  }
  &__buttons {
    display: grid;
  }
}
</style>

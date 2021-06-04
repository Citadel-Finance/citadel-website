<template>
  <ctm-modal-box>
    <div class="ctm-modal__main main">
      <div class="main__title">
        {{ title }}
      </div>
      <div class="main__text">
        {{ text }}
      </div>
      <div class="main__buttons">
        <base-btn
          :mode="'secondary'"
          @click="close()"
        >
          Close
        </base-btn>
      </div>
    </div>
  </ctm-modal-box>
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
  //&__header {
  //  display: grid;
  //  justify-content: end;
  //}
}
.main {
  padding: 20px;
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

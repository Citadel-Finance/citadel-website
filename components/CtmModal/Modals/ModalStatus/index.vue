<template>
  <ctm-modal-box :is-header="false">
    <div class="ctm-modal__main main">
      <div
        class="main__title"
      >
        {{ options.title }}
      </div>
      <div class="main__text">
        {{ options.text }}
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
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
    // statusClass() {
    //   const {
    //     title,
    //   } = this;
    //   return [
    //     {
    //       'main__title_error': title === 'Error',
    //       'main__title_success': title === 'Success',
    //       'main__title_notification': title === 'Notification',
    //     },
    //   ];
    // },
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
  &__box {
    width: 300px !important;
  }
}
.main {
  padding: 30px;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  &__title {
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    letter-spacing: 0.03em;
    color: #F00917;
  }
  &__text {
    font-family: sans-serif, 'Arial';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 120%;
    text-align: center;
    letter-spacing: 0.05em;
    color: #A89DAF;
  }
  &__buttons {
    display: grid;
  }
}
</style>

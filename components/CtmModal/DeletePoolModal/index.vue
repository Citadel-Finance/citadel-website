<template>
  <div class="ctm-modal__box">
    <div
      v-if="isHeader === true"
      class="ctm-modal__header"
    >
      <div class="ctm-modal__title">
        {{ title || options.title || 'Delete Pool' }}
      </div>
      <button
        v-if="!options.isUnclosable"
        class="ctm-modal__x"
        @click="close()"
      >
        <img
          src="@/assets/x.svg"
          alt="x"
        >
      </button>
    </div>
    <div class="delete-modal__wrapper">
      <div class="delete-modal__title">
        Are you sure you want to delete pool?
      </div>
      <button
        v-if="!options.isUnclosable"
        class="delete-modal__buttons_close"
        @click="close()"
      >
        Cancel
      </button>
      <button class="delete-modal__buttons_save">
        Delete
      </button>
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
<style lang="scss">
.ctm-modal {
  @include modalKit;
}
.delete-modal__wrapper {
  padding-left: 20px;
}
.delete-modal__title {
  font-size: 16px;
  font-weight: 400;
  margin: 20px 0 47px;
}
.delete-modal__buttons_close {
  height: 51px;
  width: 147px;
  background: #F6F5F7;
  border-radius: 10px;
  margin-bottom: 20px;
}
.delete-modal__buttons_save {
  height: 51px;
  width: 267px;
  border-radius: 10px;
  background: #C31433;
  color: white;
  margin-left: 16px;
}
</style>

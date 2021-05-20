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
        <img src="@/assets/x.svg" alt="x">
      </button>
    </div>
    <div class="edit-modal__wrapper">
      <div class="edit-modal__title">
        Liquidity mining reward
      </div>
    <div class="edit-modal__input">
      <input type="text" placeholder="" class="edit-modal__input">
    </div>
    <div class="edit-modal__title">
      APE tax
    </div>
    <div class="edit-modal__input">
      <input type="text" class="edit-modal__input">
    </div>
    <div class="edit-modal__title">
      Status
    </div>
    <div class="">
      <input type="radio" id="one" value="Active" v-model="picked" class="edit-modal__radiobuttons">
      <input type="radio" id="two" value="inactive" v-model="picked" class="edit-modal__radiobuttons">
    </div>
    <div class="edit-modal__buttons">
      <button
        v-if="!options.isUnclosable"
        class="edit-modal__buttons_close"
        @click="close()"
      >
        Close
      </button>
      <button class="edit-modal__buttons_save">
        Save
      </button>
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
.edit-modal__wrapper {
  padding-left: 20px;
}
.edit-modal__input {
  padding-left: 10px;
  width: 424px;
  max-width: 434px;
  height: 59px;
  background: #F6F5F7;
  border-radius: 10px;
  border: 0;
}
.edit-modal__title {
  margin: 20px 0 10px;
}
.edit-modal__radiobuttons {
  color: darkred;
  height: 21px;
  width: 21px;
  margin-bottom: 36px;
  &:last-child {
    margin-left: 200px;
  }
}
.edit-modal__buttons_close {
  height: 51px;
  width: 147px;
  background: #F6F5F7;
  border-radius: 10px;
  margin-bottom: 20px;
}
.edit-modal__buttons_save {
  height: 51px;
  width: 267px;
  border-radius: 10px;
  background: #C31433;
  color: white;
  margin-left: 16px;
}
</style>

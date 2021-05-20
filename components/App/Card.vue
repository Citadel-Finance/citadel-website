<template>
  <div class="balance__card">
    <div class="balance__card_title">
      {{ title }}
    </div>
    <hr class="balance__hr">
    <div class="balance__number">
      {{ number }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      default: '',
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    openTestModal() {
      this.ShowModal({
        text: 'test',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.balance__card{
  padding-top: 20px;
  padding-left: 15px;
  font-size: 10px;
  width: 160px;
  max-width: 160px;
  height: 145px;
  background: #F6F5F7;
  border-radius: 10px;
  margin: 5px;
}
.balance__card_title {
  font-size: 10px;
  font-weight: 600;
  color: #7B6C86;
}
.balance__hr {
  border: 2px solid #C31433;
  color: darkred;
  background: black;
  width: 40px;
  margin: 50px 0px 0px 0px;
}
.balance__number {
  padding: 10px 0px 10px 0px;
  font-size: 20px;
  font-weight: 550;
  color: #240B36;
}
</style>

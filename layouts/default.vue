<template>
  <div class="primary">
    <div class="primary__template template">
      <Header />
      <div class="template__content content">
        <nuxt />
      </div>
      <ctm-modal />
      <loader-screen />
    </div>
  </div>
</template>
<script>
import Header from '../components/App/Header';

export default {
  components: {
    Header,
  },
  async mounted() {
    await this.connectAnonNode();
    // await this.connectWallet();
    this.SetLoader(false);
  },
  methods: {
    // async connectWallet() {
    //   const r = await this.$store.dispatch('user/connectWallet');
    //   // if (!r.ok) {
    //   //   return;
    //   // }
    //   return r;
    // },
    async connectAnonNode() {
      const r = await this.$store.dispatch('user/connectAnonNode');
      return r;
    },
  },
};
</script>
<style lang="scss" scoped>

.primary {
  font-family: Montserrat, sans-serif;
  background-color: #F6F5F7;
  overflow-y: auto;
  height: 100vh;
}
.template {
  display: grid;
  grid-gap: 30px;
  margin-bottom: 30px;
}
</style>

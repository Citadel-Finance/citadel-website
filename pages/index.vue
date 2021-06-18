<template>
  <div class="content__container">
    <Balance />
    <!--    <Pools />-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Balance from '../components/App/Balance';
import Pools from '../components/App/Pools';

export default {
  components: {
    Balance,
    // Pools,
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
      poolsMap: 'user/getPoolsMap',
      tokensMap: 'user/getTokensMap',
      ctlToken: 'user/getCtlToken',
    }),
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  &__container {
    @include container;
    display: grid;
    grid-gap: 30px;
    margin: auto;
  }
}
</style>

<template>
  <div>
    <Header />
    <div class="index__container">
      <Balance />
      <Keepers />
    </div>
    <Pools />
  </div>
</template>

<script>
import Header from '../components/App/Header';
import Balance from '../components/App/Balance';
import Pools from '../components/App/Pools';
import Keepers from '../components/App/Keepers';

export default {
  components: {
    Keepers,
    Header,
    Balance,
    Pools,
  },
};
</script>

<style lang="scss" scoped>
.index__container {
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 1170px;
}
</style>

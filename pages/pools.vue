<template>
  <div>
    <Header />
    <Dropdown />
    <Chart />
    <Deposit />
    <Transaction />
  </div>
</template>

<script>
import Header from '../components/App/Header';
import Dropdown from '~/components/App/Dropdown';
import Deposit from '~/components/App/Deposit';
import Transaction from '~/components/App/Transaction';
import Chart from '~/components/App/Chart';

export default {
  components: {
    Chart,
    Dropdown,
    Header,
    Deposit,
    Transaction,
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

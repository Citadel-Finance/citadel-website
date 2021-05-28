<template>
  <div class="dropdown__container">
    <div class="dropdown__button">
      <n-link to="/">
        <button
          class="dropdown__button"
        >
          <img
            src="../../assets/back_arrow.svg"
            alt="back"
          >
          Back
        </button>
      </n-link>
    </div>
    <div class="dropdown__menu">
      <div class="dropdown__menu_container">
        <img
          src="../../assets/Ethereum.svg"
          alt="logo"
        > ETH POOL
        <!--        <div class="dropdown__menu_title">-->
        <!--            <b-dropdown id="dropdown-offset" offset="-50" text="ETH POOL" class="dropdown__menu_title">-->
        <!--              <b-dropdown-item href="#">Action</b-dropdown-item>-->
        <!--              <b-dropdown-item href="#">Another action</b-dropdown-item>-->
        <!--              <b-dropdown-item href="#">Something else here</b-dropdown-item>-->
        <!--            </b-dropdown>-->
        <!--        </div>-->
        <img
          src="../../assets/dropdown_arrow.svg"
          alt="dropdown"
        >
      </div>
    </div>
    <Edit />
    <Delete />
    <div class="dropdown__info">
      <div class="dropdown__info_title">
        ANNUAL PERCENTAGE RATE
      </div>
      <hr class="dropdown__hr">
      <div class="dropdown__info_percents">
        20.06%
      </div>
    </div>
  </div>
</template>

<script>
import Edit from './Admin/Edit';
import Delete from './Admin/Delete';

export default {
  name: 'Dropdown',
  components: {
    Edit,
    Delete,
  },
  props: {},
};
</script>

<style lang="scss" scoped>
.dropdown__container {
  width: 1170px;
  height: 113px;
  background: #FFFFFF;
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: auto;
  max-width: 1170px;
  border-radius: 10px;
  margin-bottom: 30px;
  padding-right: 20px;
}
.dropdown__menu {
  border-radius: 10px;
  background-color: #F6F5F7;
  height: 66px;
  width: 220px;
}
.dropdown__button {
  width: 122px;
  height: 52px;
}
.dropdown__menu_container {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown__hr {
  border: 2px solid #C31433;
  justify-content: right;
  color: darkred;
  width: 40px;
  margin: 20px 0;
}
.dropdown__info {
  display: block;
  justify-content: flex-end;
}
.dropdown__info_title {
  font-size: 10px;
  font-weight: 700;
  color: #7B6C86;
}
</style>

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
        >
        <div class="dropdown__menu_title">
          ETH POOL
        </div>
        <img
          src="../../assets/dropdown_arrow.svg"
          alt="dropdown"
        >
      </div>
    </div>
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

export default {
  name: 'Dropdown',
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
  color: darkred;
  background: black;
  width: 40px;
  margin: 20px 0px 0px 0px;
}
.dropdown__info {
  justify-content: end;
}
</style>

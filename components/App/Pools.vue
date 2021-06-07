<template>
  <div
    class="content__pools pools"
    :class="{ 'pools_admin' : isUserAdmin }"
  >
    <div class="pools__wrapper">
      <div class="pools__header">
        <div class="pools__title">
          Pools
        </div>
        <div
          v-if="isUserAdmin"
          class="pools__button"
        >
          <base-btn
            mode="txt-icon"
            @click="openAddModal"
          >
            <span>Add pool</span>
            <span class="icon-plus" />
          </base-btn>
        </div>
      </div>
      <div class="pools__table table-main">
        <div class="table-main__head">
          <div
            v-for="(field,i) in fields"
            :key="`table__title-${i}`"
            class="table-main__th"
          >
            {{ field.label }}
          </div>
          <div
            v-if="isUserAdmin"
            class="table-main__th"
          >
            Status
          </div>
          <div
            v-if="isUserAdmin"
            class="table-main__th"
          />
        </div>
        <div class="table-main__body">
          <div
            v-for="(poolAddress, i) in Object.keys(poolsMap)"
            :key="`pool__item-${i}`"
            class="table-main__tr"
          >
            <nuxt-link
              :to="`/pool/${poolAddress}`"
              class="table-main__link"
            >
              <div class="table-main__col currency">
                <span class="currency__img">
                  <img
                    :src="`https://bscscan.com/token/images/${tokensMap[poolsMap[poolAddress].childAddress].symbol}_32.png`"
                    alt=""
                  >
                </span>
                <span class="currency__value">
                  {{ tokensMap[poolsMap[poolAddress].childAddress].symbol }}
                </span>
              </div>
              <div class="table-main__col">
                {{ Floor(poolsMap[poolAddress].apyTax, 4) }}
              </div>
              <div
                class="table-main__col"
                :title="poolsMap[poolAddress].totalStaked"
              >
                {{ Floor(poolsMap[poolAddress].totalStaked, 4) }}
              </div>
              <div
                class="table-main__col balance"
                :title="poolsMap[poolAddress].userStaked"
              >
                {{ Floor(poolsMap[poolAddress].userStaked, 4) }}
              </div>
              <div
                v-if="isUserAdmin"
                class="table-main__col status"
              >
                <span
                  class="status__dot"
                  :class="{'slide__dot_active': poolsMap[poolAddress].isEnabled}"
                />
                <span>
                  Inactive
                </span>
              </div>
            </nuxt-link>
            <div
              v-if="poolsMap[poolAddress].isAdmin"
              class="table-main__col settings"
              @click="openEditModal"
            >
              <span class="icon-more_vertical" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'Pools',
  data() {
    return {
      fields: [
        { key: 'currency', label: 'Currency' },
        { key: 'apy', label: 'APY' },
        { key: 'liquidity', label: 'Liquidity (USD)' },
        { key: 'balance', label: 'Balance' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      poolsMap: 'user/getPoolsMap',
      tokensMap: 'user/getTokensMap',
      isUserAdmin: 'user/getIsUserAdmin',
    }),
  },
  methods: {
    openAddModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.addPool,
      });
    },
    openEditModal() {
      this.ShowModal({
        text: 'WalletConnect',
        key: modals.editPool,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pools {
  &_admin {
    .table-main {
      &__head {
        grid-template-columns: repeat(5, 1fr) 60px;
      }
      &__tr {
        grid-template-columns: 1fr 60px;
      }
      &__link {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
  &__wrapper {
    margin: auto;
    background: #FFFFFF;
    max-width: 1170px;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-gap: 20px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__title {
    font-size: 21px;
    font-family: sans-serif, 'Conto-Medium';
    line-height: 25px;
    font-weight: 500;
    color: #240A36;
    display: flex;
    align-items: center;
  }
  &__button {
    .base-btn {
      padding: 13px 15px;
      display: flex;
      grid-gap: 10px;
      span::before {
        font-size: 24px;
        color: #C31433;
      }
    }
  }
}
.table-main {
  &__head {
    background: rgba(36, 11, 54, 0.04);
    border-radius: 10px;
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #7B6C86;
    display: grid;
    min-width: 1130px;
    margin-bottom: 10px;
    grid-template-columns: repeat(4, 1fr);
  }
  &__th {
    padding: 14px 20px;
    border: none;
  }
  &__tr {
    display: grid;
    min-width: 1130px;
    grid-template-columns: 1fr;
    padding: 14px 0;
    transition: 0.3s ease-out;
    &:hover {
      background: #FBFAFB;
      border-radius: 10px;
    }
  }
  &__col {
    padding: 14px 20px;
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #7B6C86;
    display: flex;
    align-items: center;
  }
  &__link {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-decoration: none;
  }
}
.currency {
  display: flex;
  align-items: center;
  grid-gap: 15px;
  &__value {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #240A36;
  }
}
.balance {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #240A36;
}
.status {
  display: flex;
  grid-gap: 10px;
  align-items: center;
  &__dot {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #C31432;
      transition: 0.3s ease-in-out;
    }
    &_active:before {
      background: #2DCE89;
    }
  }
}
.settings {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  span {
    padding: 5px;

    transition: 0.3s ease-in-out;
    cursor: pointer;
    border-radius: 7px;
    &:hover {
      background: #F3EFF3;
    }
  }
  span::before {
    font-size: 24px;
    color: #A89DAF;
    &:hover {
      color: #7B6C86;
    }
  }
}
</style>

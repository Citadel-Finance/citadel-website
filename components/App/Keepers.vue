<template>
  <div>
    <div class="keepers">
      <div class="keepers__title">
        Top liquidity providers
      </div>
      <div class="keepers__table table-main">
        <div class="table-main__head">
          <div
            v-for="(field,i) in fields"
            :key="`table__title-${i}`"
            class="table-main__th"
          >
            {{ field.label }}
          </div>
        </div>
        <div class="table-main__body">
          <div
            v-for="(provider, i) in providers"
            :key="`position__item-${i}`"
            class="table-main__tr"
          >
            <div class="table-main__col position">
              {{ provider.id }}
            </div>
            <div class="table-main__col address">
              {{ provider.address }}
            </div>
            <div class="table-main__col contribution">
              {{ provider.contributions }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Keepers',
  props: {
  },
  data() {
    return {
      fields: [
        { key: 'position', label: 'Position' },
        { key: 'address', label: 'Address' },
        { key: 'contributions', label: 'Contributions (USD)' },
      ],
      providers: [
        {
          id: 1,
          address: 'dgdg5s6...sgsgsf465s',
          contributions: '$ 15 256 547',
        },
        {
          id: 2,
          address: 'dgdg5s6...sgsgsf465s',
          contributions: '$ 15 256 547',
        },
        {
          id: 3,
          address: 'dgdg5s6...sgsgsf465s',
          contributions: '$ 15 256 547',
        },
        {
          id: 4,
          address: 'dgdg5s6...sgsgsf465s',
          contributions: '$ 15 256 547',
        },
        {
          id: 5,
          address: 'dgdg5s6...sgsgsf465s',
          contributions: '$ 15 256 547',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.keepers {
  background: #FFFFFF;
  width: 100%;
  min-width: 770px;
  min-height: 466px;
  border-radius: 10px;
  padding: 20px;
  &__title {
    font-size: 21px;
    font-weight: 500;
    line-height: 25px;
    color: #240A36;
  }
}
.table-main {
  margin: 20px 0 0 0;
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
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 20px;
  }
  &__th {
    padding: 14px 20px;
    border: none;
  }
  &__th:last-child {
    display: grid;
    justify-items: end;
  }
  &__tr {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 14px 0;
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
}
.position {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #240A36;
}
.contribution {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  display: grid;
  justify-items: end;
  color: #C31433;
}
</style>

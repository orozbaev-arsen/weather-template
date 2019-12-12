<template lang="pug">
  el-card.box-card
    div(slot="header")
      .b-card-header
        .b-card-header__name {{ city.name }}
        .b-card-header__buttons
          el-button(icon="el-icon-view" circle @click="showFull = true")
          el-button(slot="reference" type="danger" icon="el-icon-delete" circle @click="deleteCity")
    div
      .b-card-item
        .b-card-item__left Погода:
        .b-card-item__right {{ getWeather.description }}
      .b-card-item
        .b-card-item__left Температура:
        .b-card-item__right {{ parseInt(city.main.temp) }} ℃
      .b-card-item
        .b-card-item__left Давление:
        .b-card-item__right {{ city.main.pressure }} гПа
      .b-card-item
        .b-card-item__left Влажность:
        .b-card-item__right {{ city.main.humidity }} %
    el-dialog(
      :title="`Погода для ${city.name}`"
      :visible.sync="showFull"
      width="460px"
      top="5vh"
    )
      card-full(:city="city")

</template>
<script>
  import CardFull from "@/components/weather/cards/CardFull.vue";
  import { mapMutations } from 'vuex';

  export default {
    name: "CardItem",
    components: {
      CardFull,
    },
    props: {
      city: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    computed: {
      getWeather() {
        return _.first(this.city.weather) || { description: 'Не известно' };
      },
    },
    data() {
      return {
        showFull: false,
      }
    },
    methods: {
      ...mapMutations([
        'deleteLoadedCity'
      ]),
      /**
       * Удаление города
       * @returns {Promise<void>}
       */
      async deleteCity() {
        const confirm = await this.$confirm('Вы уверены что хотите удалить город?', 'Внимание', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет',
          type: 'warning',
          lockScroll: false,
        }).catch(() => {
          console.log('delete canceled');
        });
        if(confirm) {
          this.deleteLoadedCity({
            name: this.city.name,
          });
          this.$message({
            type: 'success',
            message: 'Город успешно удален'
          });
        }
      },
    }
  }
</script>
<style>
  .b-card-header,
  .b-card-item {
    display: flex;
    justify-content: space-between;
    min-height: 30px;
    align-items: center;
  }
  .b-card-item__right {
    font-weight: bold;
  }
  .b-card-header__name {
    font-weight: bold;
  }
  .el-dialog__body {
    padding: 0 20px 30px!important;
  }
</style>

<template lang="pug">
  div.b-cities-main
    .b-top-panel
      .b-top-panel__head
        h3 Погода
          el-button.b-refresh(icon="el-icon-refresh" circle @click="refreshCities")
      .b-top-panel__buttons
        add-city
    el-row.b-cities-list(:gutter="20")
      el-col.b-cities(v-loading="isLoading" :span="18")
        el-row(v-if="loadedCities.length > 0" :gutter="20")
          cards(v-for="(cities, index) in loadedCities", :key="index", :cities="cities")
        div(v-else)
          | Добавьте город, чтоб узнать прогноз погоды
      el-col(:span="6")
        strong Выбрано городов:
        div(v-for="(city, index) in getSelectedCities", :key="index")
          div {{ index + 1 }}. {{ city }}
</template>
<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import { METHODS } from '../store/const/weather';
  import Cards from "@/components/weather/cards/Cards.vue";
  import AddCity from "@/components/weather/AddCity.vue";

  export default {
    name: "Weather",
    components: {
      Cards,
      AddCity,
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'currentLocation',
        'getSelectedCities',
        'getLoadedCities',
        'isLoadedCities',
        'loading',
      ]),
      currentCity() {
        return this.currentLocation.city;
      },
      loadedCities() {
        return _.chunk(this.getLoadedCities, 3);
      },
      isLoading() {
        return this.loading(METHODS.GET_WEATHER) === 'loading';
      },
    },
    async mounted() {
      await this.loadCurrentLocation();
      await this.loadSelectedCities();
    },
    methods: {
      ...mapActions([
        'getCurrentLocation',
        'loadCityWeather',
      ]),
      ...mapMutations([
        'clearLoadedCity',
        'setSelectedCity',
        'setLoaded',
      ]),
      /**
       * Проверка текущего местоположения
       * @returns {Promise<ElMessageComponent|undefined|*>}
       */
      async loadCurrentLocation() {
        const current_location = await this.getCurrentLocation();
        if(!current_location) {
          return this.$message({
            showClose: true,
            message: 'К сожалению не удалось установить Ваше местоположение :( Добавьте город вручную.',
            type: 'error',
          });
        }
        if(this.getSelectedCities.length === 0){
          this.setSelectedCity({ city: this.currentCity });
        }
      },
      /**
       * Загрузка выбранных городов
       * @returns {Promise<void>}
       */
      async loadSelectedCities() {
        if(this.isLoadedCities){
          return;
        }
        this.clearLoadedCity();
        for (const item of  this.getSelectedCities) {
          const city = await this.loadCityWeather({
            city: item,
          });
          if(!city){
            this.$message({
              showClose: true,
              message: `Не удалось загрузить погоду для города: ${item}`,
              type: 'error',
            });
          }
          this.setLoaded(true);
        }
      },
      refreshCities() {
        this.setLoaded(false);
        this.loadSelectedCities();
      },
    },
  }
</script>
<style>
  .b-cities {
    padding: 0 20px!important;
  }
  .b-top-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .b-refresh {
    margin-left: 20px!important;
  }

  .b-cities,
  .b-cities-main {
    height: 100%;
  }

  .b-cities-list {
    height: calc(100% - 76px);
  }
</style>

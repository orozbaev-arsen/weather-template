<template lang="pug">
  div
    el-button(type="primary" icon="el-icon-plus" @click="openDrawer") Добавить город
    el-drawer(
      title="Добавление города"
      :visible.sync="drawer"
      direction="rtl"
    )
      .b-drawer-body
        el-select.b-drawer-select(
          v-model='value'
          filterable=''
          remote=''
          reserve-keyword=''
          placeholder='Введите название города'
          :remote-method='remoteMethod'
          :loading='loading'
        )
          el-option(v-for='item in options', :key='item.value', :label='item.label', :value='item.value')
        el-button.b-drawer-button(type="primary" @click="addCity") Добавить
</template>

<script>
  import { mapActions, mapMutations } from "vuex";

  export default {
    name: "AddCity",
    data() {
      return {
        drawer: false,
        value: '',
        options: [],
        loading: false,
      };
    },
    watch: {
      value(val){
        console.log('this', val);
      }
    },
    mounted() {
    },
    methods: {
      ...mapActions([
        'findCity',
        'loadCityWeather',
      ]),
      ...mapMutations([
        'setSelectedCity'
      ]),
      openDrawer() {
        this.drawer = true;
      },
      /**
       * Поиск города по названию
       * @param query
       * @returns {Promise<void>}
       */
      async remoteMethod(query) {
        if (query !== '' && query.length > 2) {
          this.loading = true;
          const founded_cities = await this.findCity(query);
          this.loading = false;
          if(founded_cities && founded_cities.data.list.length > 0) {
            const city_name = founded_cities.data.list[0].name;
            this.$set(this.options, 0, { value: city_name, label: city_name })
          } else {
            this.options = [];
          }
        } else {
          this.options = [];
        }
      },
      /**
       * Добавление города
       * @returns {Promise<void>}
       */
      async addCity(){
        if(this.value !== ''){
          const add_city = await this.loadCityWeather({ city: this.value });
          if(add_city) {
            this.setSelectedCity({ city: this.value });
            this.drawer = false;
            this.$message({
              message: 'Город успешно добавлен',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: 'Не удалось добавить город, попробуйте найти город заново и повторить попытку',
              type: 'error',
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: 'Введите и выберите город',
            type: 'error',
          });
        }
      }
    }
  }
</script>
<style>
  .el-drawer__header>:first-child {
    outline: none;
  }
  .b-drawer-body {
    padding: 0 20px;
  }
  .b-drawer-select {
    width: 100%;
  }
  .b-drawer-button {
    width: 100%;
    margin-top: 20px!important;
  }
</style>

<template lang="pug">
  div
    .b-list-row(v-if="city.coord")
      .b-list-row__head Географическое положение
      .b-list-item
        .b-list-item__left Долгота
        .b-list-item__right {{ city.coord.lon }}
      .b-list-item
        .b-list-item__left Широта
        .b-list-item__right {{ city.coord.lat }}
    .b-list-row
      .b-list-row__head Основное
      .b-list-item
        .b-list-item__left Температура
        .b-list-item__right {{ parseInt(city.main.temp) }} ℃
      .b-list-item
        .b-list-item__left Атмосферное давление
        .b-list-item__right {{ city.main.pressure }} гПа
      .b-list-item
        .b-list-item__left Влажность
        .b-list-item__right {{ city.main.humidity }} %
      .b-list-item
        .b-list-item__left Минимальная температура на данный момент
        .b-list-item__right {{ parseInt(city.main.temp_min) }} ℃
      .b-list-item
        .b-list-item__left Максимальная температура на данный момент
        .b-list-item__right {{ parseInt(city.main.temp_max) }} ℃
    .b-list-row(v-if="city.wind")
      .b-list-row__head Ветер
      .b-list-item
        .b-list-item__left Скорость ветра
        .b-list-item__right {{ city.wind.speed }} метр / сек
      .b-list-item
        .b-list-item__left Направление ветра
        .b-list-item__right {{ city.wind.deg }} градусов
    .b-list-row(v-if="city.clouds")
      .b-list-row__head Облачность
      .b-list-item
        .b-list-item__left Облачность
        .b-list-item__right {{ city.clouds.all }} %
    .b-list-row(v-if="city.rain || city.snow")
      .b-list-row__head Осадки
      .b-list-item(v-if="city.rain")
        .b-list-item__left Дождь
        .b-list-item__right Да
      .b-list-item(v-if="city.snow")
        .b-list-item__left Снег
        .b-list-item__right Да
</template>
<script>

  export default {
    name: "CardFull",
    props: {
      city: {
        type: Object,
        default() {
          return {};
        },
      },
    },
  }
</script>
<style>
  .b-list-row__head {
    font-weight: bold;
    border-top: 2px solid #ebeef5;
    border-bottom: 2px solid #ebeef5;
    padding: 12px 0;
  }
  .b-list-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    align-items: center;
    border-bottom: 1px dashed #ebeef5;
  }

  .b-list-row .b-list-item:last-of-type {
    border-bottom: none;
  }
  .b-list-item__right {
    font-weight: bold;
  }
</style>

<template lang="pug">
  el-row.b-card-row(:gutter="20")
    el-col(v-for="(city, index) in cities" :key="index" :span="8")
      card-item(:city="city")
</template>
<script>
  import CardItem from "@/components/weather/cards/CardItem.vue";

  export default {
    name: "Cards",
    components: {
      CardItem,
    },
    props: {
      cities: {
        type: Array,
        default() {
          return [];
        },
      },
    },
  }
</script>
<style>
  .b-card-row {
    padding-bottom: 20px;
  }
</style>

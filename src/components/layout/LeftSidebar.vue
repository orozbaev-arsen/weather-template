<template lang="pug">
  el-aside
    el-menu.el-menu-vertical-demo(default-active="1")
      el-menu-item(index='1' @click="changeRoute('Weather')")
        i.el-icon-location
        span Погода
      el-menu-item(index='2' @click="changeRoute('News')")
        i.el-icon-document
        span Новости

</template>

<script>
  export default {
    methods: {
      changeRoute(route_name) {
        this.$router.push({ name: route_name });
      }
    }
  }
</script>

<style>
  .el-menu {
    height: 100%;
  }

  .el-menu-item {
    font-size: 16px!important;
  }
</style>

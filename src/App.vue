<template lang="pug">
  #app
    el-container.b-main(direction="vertical")
      layout-header
      el-container
        layout-left-sidebar
        el-main
          router-view
</template>
<script>
  import LayoutHeader from "@/components/layout/Header";
  import LayoutLeftSidebar from "@/components/layout/LeftSidebar";

  export default {
    components: {
      LayoutHeader,
      LayoutLeftSidebar,
    },
  }
</script>
<style>
  @import "./assets/css/style.css";
</style>

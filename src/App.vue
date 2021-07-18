<template>
  <div id="app">
    <MHeader></MHeader>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import MHeader from "./components/m-header/m-header.vue"
export default {
  name: "App",
  components:{
    MHeader
  }
};
</script>

<style scoped lang="stylus">
</style>

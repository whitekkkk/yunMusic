<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <keep-alive exclude="Recommend,Rank">
      <!-- 注意点：使用keep-alive中的include和exclude时需要给组件加上name 否则include和exclude将不生效 -->
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
import Tabbar from "./components/Tabbar.vue";
import Player from "./views/Player.vue";
export default {
  name: "App",
  components: {
    MainHeader,
    Tabbar,
    Player,
  },
  methods: {},
};
</script>


<style lang="scss">
</style>

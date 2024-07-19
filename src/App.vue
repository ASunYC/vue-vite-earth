<template>
  <div id="app">
    <div id="header" class="header">
      <h1>地图导航</h1>
      <button @click="navigateToCesium">跳转到Cesium</button>
      <button @click="navigateToLeaflet">跳转到Leaflet</button>
    </div>
    <!-- 路由视图将在这里渲染 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    navigateToCesium() {
      this.$router.push({ name: 'CesiumEarth' }); // 使用路由名称进行导航
    },
    navigateToLeaflet() {
      this.$router.push({ name: 'LeafletEarth' }); // 使用路由名称进行导航
    }
  }
};
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: rgb(44, 62, 80);
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  user-select: none;
}

#header {
  position: absolute;
  left: 45%;
  top: 10%;
}
</style>
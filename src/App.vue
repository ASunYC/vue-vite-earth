<template>
  <div id="app">
    <div id="header" class="header">
      <h1>地图导航</h1>
      <div style="display: flex; flex-direction: column;">
        <button @click="navigateToCesium" style="margin-top: 20px;">跳转到Cesium</button>
        <button @click="navigateToLeaflet" style="margin-top: 20px;">跳转到Leaflet</button>
        <button @click="navigateToBabylon" style="margin-top: 20px;">跳转到Babylon</button>
      </div>
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
      this.$router.push({ name: 'CesiumEarth' });
    },
    navigateToLeaflet() {
      this.$router.push({ name: 'LeafletEarth' });
    },
    navigateToBabylon() {
      this.$router.push({ name: 'BabylonEarth' });
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
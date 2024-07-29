<template>
  <div id="cesiumContainer" class="cesiumContainer"></div>
  <div id="web_body">
    <div id="loadingIndicator" class="loadingIndicator"></div>
    <div class="web_down">
      <div class="web_down_right">
        {{ bottom_messages }}
      </div>
    </div>
  </div>
</template>

<script>

import * as Cesium from 'cesium'
import { init } from "./index";
// import HeaderComponent from "./HeaderComonpent.vue"
// import Navigation from "./Navigation.vue"
// import FooterComponent from "./FooterComonpent.vue"

export default {
  name: "CesiumEarth",
  components: {
    // HeaderComponent,
    // Navigation,
    // FooterComponent
  },
  data() {
    return {
      bottom_messages: "",
    }
  },
  mounted() {
    window.viewer = init('cesiumContainer');
    this.init_cesium(window)
  },
  methods: {
    init_cesium: function (w) {
      // 去掉entity的点击事件 start
      console.log("init_cesium")
      w.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      w.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      // 去掉entity的点击事件 end
      var handler = new Cesium.ScreenSpaceEventHandler(w.viewer.scene.canvas);
      // handler.setInputAction(self.action_canvas_left_dubclick, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      handler.setInputAction(this.action_canvas_mousemove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      // handler.setInputAction(self.action_canvas_right_click, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      // handler.setInputAction(self.action_canvas_left_click, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      document.getElementById("loadingIndicator").style.display = 'none'
    },
    action_canvas_mousemove: function (event) {
      // this.action_mousemove_view(event.endPosition)
      // this.action_mousemove_popview(event.endPosition)
      this.action_mousemove_bottomview(event.endPosition)
    },
    action_mousemove_bottomview: function (position) {
      //获取鼠标位置，camera.pickEllipsoid()返回一个cartesian类型位置
      let ray = window.viewer.camera.getPickRay(position);
      let thisposition = window.viewer.scene.globe.pick(ray, window.viewer.scene);
      let cartographic = null
      if (thisposition != undefined) {
        cartographic = Cesium.Cartographic.fromCartesian(thisposition);
        if (cartographic == undefined)
          return
      } else {
        return;
      }
      let lon = Cesium.Math.toDegrees(cartographic.longitude);
      let lat = Cesium.Math.toDegrees(cartographic.latitude);
      // 获取海拔高度
      let height1 = window.viewer.scene.globe.getHeight(cartographic);
      let height2 = cartographic.height;
      this.bottom_messages = "当前位置:经度" + lon.toFixed(5) + "度， 纬度" + lat.toFixed(5) + "度";
    }
  }
}
</script>


<style>

#web_body {
  /*position: absolute;*/
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  /*overflow: hidden;*/
  /*font-family: 宋体, "Microsoft YaHei UI";*/
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft	YaHei", "微软雅黑", Arial, sans-serif;
}

.web_down {
  font-family: "微软雅黑";
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #fafafa;
  background-color: rgba(50, 50, 50, 0.5);
  /*pointer-events: none;*/
  /* padding-left: 150px; */
}

.web_down_right {
  /* position: absolute; */
  height: 32px;
  line-height: 32px;
  text-align: right;
  /*background-color: transparent;*/
  /*margin: 2px 20px;*/
  right: 0;
  /*font-size: 17px;*/
  /*font-family: "Open Sans", Verdana, Geneva, sans-serif;*/
  padding-right: 10px;
}
</style>

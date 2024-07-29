import * as Cesium from 'cesium'
import CesiumNavigation from "cesium-navigation-es6";
import init_provider from "./init_provider";

export function init(container) {
  let options = {
    url: "assets/earth.jpg",
    rectangle: new Cesium.Rectangle.fromDegrees(-180, -85, 180, 85),
    tileWidth: 256,
    tileHeight: 256
  };
  // debugger
  let layer1 = new Cesium.SingleTileImageryProvider(options);
  var viewer = new Cesium.Viewer(container, {
    imageryProvider: layer1,
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false,//是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false,//是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true,
  });
  // viewer.cesiumWidget.creditContainer.style.display = "none";
  // viewer.bottomContainer.style.display = "none";
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100;

  init_provider(viewer)

  const nav_options = {};
  // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
  nav_options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
  // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
  nav_options.enableCompass = true;
  // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
  nav_options.enableZoomControls = true;
  // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
  nav_options.enableDistanceLegend = true;
  // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
  nav_options.enableCompassOuterRing = true;
  new CesiumNavigation(viewer, nav_options)
  flytochina(viewer)
  return viewer;
}

/** 中国坐标 */
function getChinaPostion() {
  // return Cesium.Cartesian3.fromDegrees(116.435314, 40.960521, 30000000.0);
  return Cesium.Rectangle.fromDegrees(60, 20, 150, 50)
}
/**
 *  初始定位中国
 * */
function flytochina(viewer) {
  viewer.camera.flyTo({
    destination: getChinaPostion(),
    duration: 1,
    orientation: {
      heading: 0,
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0
    }
  });
}



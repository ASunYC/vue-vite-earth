let map = null;
let mapScale = 2;
let vectorLayer = null;
let output = '';
let tileTime = 1;
let tileCoordinate = '3857';
let newDiv = null;
let gridLayer = null;
let isVisibleTile = false;

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function init(options) {
    // 获取地图容器的位置
    options.container = options.container ? options.container : '';
    var mapContainer = document.getElementById(options.container);
    if (!mapContainer) {
        popTip('地图容器不存在', 200);
        return;
    }
    if (map) {
        map.remove();
    }
    options.epsg = options.epsg ? options.epsg : "3857";
    if (options.epsg == "3857") {
        options.epsg = L.CRS.EPSG3857;
        options.tmsIds = 'w';
        tileCoordinate = '3857';
    } else if (options.epsg == "4326") {
        options.epsg = L.CRS.EPSG4326;
        options.tmsIds = 'c';
        tileCoordinate = '4326';
    }
    options.zoom = options.zoom ? options.zoom : 2;
    options.center = options.center ? options.center : [39.905033413167, 116.40191241];
    // 创建Leaflet地图
    map = L.map(mapContainer, {
        crs: options.epsg,
        center: options.center, // 地图中心
        zoom: options.zoom, //缩放比列
        zoomControl: false, //禁用 + - 按钮
        doubleClickZoom: false, // 禁用双击放大
        attributionControl: false, // 移除右下角leaflet标识
    });

    // 添加底图
    var baseLayer = L.tileLayer(
        '//webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
        attribution: '',
        maxZoom: 18,
    }).addTo(map);
    baseLayer.options.maxZoom = 20;
    baseLayer.options.maxNativeZoom = 20;

    map.on('zoomend', (e) => {
        //获取当前放大或者缩小的等级
        mapScale = e.target.getZoom();

        //$('#currentLevel')[0].innerText = mapScale;
    });

    var corner1 = L.latLng(-90, -360); //设置左上角经纬度
    var corner2 = L.latLng(90, 360);	//设置右下点经纬度
    var bounds = L.latLngBounds(corner1, corner2); //构建视图限制范围
    map.setMaxBounds(bounds);

    var layers = [];
    vectorLayer = L.layerGroup(layers);
    map.addLayer(vectorLayer);

    initGridLayer();

    drawPolygon();

    return map;
}

//#region 标绘

function drawPolygon() {

    popTip('【绘制区域】：请按住鼠标左键，点击地图任意位置开始绘制，再次点击鼠标左键结束绘制！', 900);

    L.DomUtil.addClass(map.getContainer(), 'crosshair-cursor-enabled');

    vectorLayer.clearLayers();

    let tmplist = [];
    let tmpLonLat = [];
    let juxing;
    map.on("click", async (e) => {
        tmplist.push([e.latlng.lat, e.latlng.lng])
        map.on('mousemove', async (ev) => {
            if (tmplist.length > 1) {
                tmplist.splice(1)
            }
            tmplist.push([ev.latlng.lat, ev.latlng.lng])
            vectorLayer.clearLayers()
            L.rectangle(tmplist, {//绘制矩形
                color: "#33E3C4",
                weight: 1
            }).addTo(vectorLayer);
        })
        if (tmplist.length > 1) {
            tmplist.pop()//第二次点击会触发第一次的push（）导致得到三个数据（后两个一样），所以删除最后一个
            map.off('mousemove')//两点确定，移除鼠标移动事件
            map.off('click')//两点确定，移除点击事件，
            vectorLayer.clearLayers()
            juxing = L.rectangle(tmplist, {//绘制矩形
                color: "#33E3C4",
                weight: 1
            }).addTo(vectorLayer);
        }
    })

}

//#endregion

function getIsVisibleTileValue(obj) {
    var value = obj.value;
    if (value == 'true') {
        isVisibleTile = true;
    } else if (value == 'false') {
        isVisibleTile = false;
    } else {
        isVisibleTile = true;
    }

    //重置网格
    initGridLayer();
}

//删除图层
function deleteAll() {
    vectorLayer.clearLayers();
}

function initGridLayer() {
    if (gridLayer) {
        if (map.hasLayer(gridLayer)) {
            map.removeLayer(gridLayer);
        }
    }
    gridLayer = new L.GridLayer();
    gridLayer.createTile = (coords) => {
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        var ctx = tile.getContext('2d');
        var size = new L.Point(256, 256);
        tile.width = size.x;
        tile.height = size.y;

        // 计算子网格
        let _layer = parseInt(tileTime);
        if (_layer > 1) {
            for (var i = 0; i < _layer; i++) {
                for (var j = 0; j < _layer; j++) {
                    // 从左 --》 右 绘制
                    var xPos = j * 256 / _layer;
                    var yPos = i * 256 / _layer;

                    // 填充颜色
                    ctx.fillStyle = "rgba(33, 130, 200, 0)";
                    ctx.fillRect(xPos, yPos, 256 / _layer, 256 / _layer);

                    // 绘制边框（可选）
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(xPos, yPos, 256 / _layer, 256 / _layer);

                    // 绘制文本（可选）
                    if (isVisibleTile) {
                        ctx.font = "bold 10px Arial";
                        ctx.textAlign = "center";
                        ctx.fillStyle = 'white';

                        let newLevel = coords.z + Math.log2(_layer);
                        let newX = coords.x << Math.log2(_layer);
                        let newy = coords.y << Math.log2(_layer);

                        ctx.fillText("L: " + newLevel, xPos + 32, yPos + 20);
                        ctx.fillText("X: " + (newX + j), xPos + 32, yPos + 40);
                        ctx.fillText("Y: " + (newy + i), xPos + 32, yPos + 60);
                    }
                }
            }
        } else {
            //计算本网格        
            if (isVisibleTile) {
                // 将切片号乘以切片分辨率，默认为256pixel,得到切片左上角的绝对像素坐标
                //var nwPoint = coords.scaleBy(size);
                // 根据绝对像素坐标，以及缩放层级，反投影得到其经纬度
                //var nw = map.unproject(nwPoint, coords.z);
                // ctx.fillStyle = 'white';
                // ctx.fillRect(0, 0, size.x, 50);
                // ctx.fillStyle = 'black';
                //ctx.fillText('x: ' + coords.x + ', y: ' + coords.y + ', zoom: ' + coords.z, 20, 20);
                //ctx.fillText('lat: ' + nw.lat + ', lon: ' + nw.lng, 20, 40);
                ctx.font = "bold 20px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = 'white';
                ctx.fillText("L: " + coords.z, 124, 86);
                ctx.fillText("X: " + coords.x, 124, 136);
                ctx.fillText("Y: " + coords.y, 124, 186);
            }
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(size.x - 1, 0);
            ctx.lineTo(size.x - 1, size.y - 1);
            ctx.lineTo(0, size.y - 1);
            ctx.closePath();
            ctx.stroke();
        }

        return tile;
    };
    gridLayer.addTo(map);
}

function popTip(tipText, textWidth = 300) {
    if (document.body.contains(newDiv)) {
        document.body.removeChild(newDiv);
    }
    newDiv = document.createElement("div");
    // 设置div的样式
    newDiv.style.position = 'absolute';
    newDiv.style.top = '10%';
    newDiv.style.left = 'calc(50% - ' + (textWidth / 2) + 'px)';
    newDiv.style.width = `${textWidth}px`;
    newDiv.style.height = '50px';
    newDiv.style.backgroundColor = 'rgba(125, 255, 125, 0.3)';
    newDiv.style.border = '1px solid lightblue';
    newDiv.style.color = 'yellow';
    newDiv.style.textAlign = 'center';
    newDiv.style.lineHeight = '50px';
    newDiv.style.zIndex = '9999';
    // 设置div的内容（可选）
    newDiv.textContent = tipText;

    // 将div添加到body中
    document.body.appendChild(newDiv);

    setTimeout(function () {
        // 从DOM中移除div
        if (document.body.contains(newDiv)) {
            document.body.removeChild(newDiv);
        }
    }, 5000);
}

//4326层级和相机距离映射表，0-22级
const levelOfHeight = {
    0: 100000000,
    1: 50000000,
    2: 20000000,
    3: 10000000,
    4: 65000000,
    5: 2500000,
    6: 1600000,
    7: 720000,
    8: 400000,
    9: 200000,
    10: 90000,
    11: 55000,
    12: 25000,
    13: 11000,
    14: 6000,
    15: 3000,
    16: 1600,
    17: 800,
    18: 500,
    19: 250,
    20: 140,
    21: 90,
    22: 68
};

//3857层级和相机距离映射表，0-22级
const levelOfHeight3857 = {
    0: 74825859,
    1: 70301279,
    2: 58113201,
    3: 23418000,
    4: 11776735,
    5: 5439939,
    6: 2468714,
    7: 1186649,
    8: 631939,
    9: 339918,
    10: 161486,
    11: 94172,
    12: 41769,
    13: 20899,
    14: 9582,
    15: 5373,
    16: 2832,
    17: 1186,
    18: 580,
    19: 288,
    20: 163,
    21: 88,
    22: 50
};
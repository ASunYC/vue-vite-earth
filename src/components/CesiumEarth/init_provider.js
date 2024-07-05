import * as Cesium from 'cesium'


function init_provider(viewer) {
    var layer_new = viewer.scene.imageryLayers;
    add_arcgismap(layer_new);
    add_tianditumap(layer_new);

    // add_baidumap(layer_new);
}

function add_tianditumap(layer_new) {
    let tiandiKey = "789e558be762ff832392a0393fd8a4f1";
    let myprovider1 = new Cesium.UrlTemplateImageryProvider({
        url: "//webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        subdomains: ["t0","t1","t2","t3","t4","t5","t6","t7"],
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        maximumLevel: 18,
    });
    layer_new.addImageryProvider(myprovider1);

    let myprovider2 = new Cesium.UrlTemplateImageryProvider({
        url: "http://{s}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=" + tiandiKey,
        subdomains: ["t0","t1","t2","t3","t4","t5","t6","t7"],
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        maximumLevel: 18,
    });
    layer_new.addImageryProvider(myprovider2);
}

function add_baidumap(layer_new) {
    let baiduImageProvider = layer_new.addImageryProvider(new BaiduImageryProvider({
      url: "http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46"
    }))
    //http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&scaler=1&p=1
    //https://maponline3.bdimg.com/starpic/?qt=satepc&u=x=5449;y=2434;z=15;v=009;type=sate&fm=46&app=webearth2&v=009&udt=20230110
    //https://maponline1.bdimg.com/starpic/?qt=satepc&u=x=3;y=2;z=7;v=009;type=sate&fm=46&udt=20230110
    //https://maponline0.bdimg.com/tile/?qt=vtile&x=87185&y=38963&z=19&styles=sl&udt=20230110
}

function add_arcgismap(layer_new) {
    // "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS",
    //https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/17/47549/94748
    var shadedRelief1 = new Cesium.UrlTemplateImageryProvider({
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        // layer: "World_Imagery",
        style: "default",
        // format: "image/jpeg",
        // tileMatrixSetID: "default028mm",
        maximumLevel: 18,
    });
    layer_new.addImageryProvider(shadedRelief1);
}


export default init_provider;
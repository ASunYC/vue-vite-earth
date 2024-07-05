<template>
    <div id="leafletContainer" class="leafletContainer"></div>
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
import { initLeaflet } from "./init_leaflet";

export default {
    name: "LeafletEarth",
    components: {
    },
    data() {
        return {
            bottom_messages: "",
        }
    },
    mounted() {
        initLeaflet('leafletContainer');
    },
    methods: {
    }
}
</script>


<style>
.leafletContainer {
    width: 100%;
    height: 100%;
}

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
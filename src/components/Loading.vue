<template>
    <div class="loading" v-loading="true" element-loading-text="努力加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">

    </div>
</template>

<script>
    export default {}
</script>

<style>
    .loading {
        z-index: 50000;
        position: fixed;
        bottom: 0px;
        top: 0px;
        left: 0px;
        right: 0px;
    }
</style>
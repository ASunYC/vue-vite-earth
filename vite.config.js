import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'; // 引入插件

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), cesium()],
    resolve: {
        alias: {
            "@": path.resolve("src"),
            "comps": path.resolve("src/components"),
            "apis": path.resolve("src/apis"),
            "views": path.resolve("src/views"),
            "utils": path.resolve("src/utils"),
            "routes": path.resolve("src/routes"),
            "styles": path.resolve("src/styles"),
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8000,
    },
    build: {
        outDir: 'dist', //指定输出路径（相对于 项目根目录). 建议使用系统默认
    }
})

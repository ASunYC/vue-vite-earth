import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import './styles/main.css';
import './assets/CesiumNavigation/cesium-navigation.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./css/common.css";
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/light.css";
import "./css/dark.css";
import filters from "./common/js/filterTimer.js"


const app = createApp(App)
app.config.globalProperties.$filters = filters;
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')

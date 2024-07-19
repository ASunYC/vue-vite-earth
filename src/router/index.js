import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        { path: "/", redirect: "/index.html" },
        {
            path: "/cesium",
            name: "CesiumEarth",
            component: () => import("../components/CesiumEarth/Index.vue")
        },
        {
            path: "/leaflet",
            name: "LeafletEarth",
            component: () => import("../components/LeafletEarth/Index.vue")
        },
        // {
        //     path: '/:pathMatch(.*)*',
        //     redirect: "/index.html"
        // }
    ]

})

export default router

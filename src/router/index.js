import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        { path: "/", redirect: "/index.html" },
        {
            path: "/index.html",
            name: "CesiumEarth",
            component: () => import("../components/CesiumEarth.vue")
        }, {
            path: '/:pathMatch(.*)*',
            redirect: "/index.html"
        }
    ]

})

export default router

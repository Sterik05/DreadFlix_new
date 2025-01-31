import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import HomeSeries from "@/views/HomeSerie.vue"

const routes=[
    {
        path: "/",
        name: "Home",
        component: Home
    },  
    {path: '/movies', name: 'Movies', component: ()=>import('@/views/Home.vue')},
    {path: '/series', name: 'Series', component: ()=>import('@/views/HomeSerie.vue')},
    {path: '/serie/:id_meta', name: 'SerieShow', component: ()=>import('@/views/SerieShow.vue'), props: true},
    {path: '/movie/:id_meta', name: 'MovieShow', component: ()=>import('@/views/MovieShow.vue'), props: true},
]
 

const router = createRouter({ 
    history: createWebHistory(),
    routes
})
export default router
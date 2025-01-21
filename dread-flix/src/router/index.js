import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"

const routes=[
    {
        path: "/",
        name: "Home",
        component: Home
    },  
    {path: '/movies', name: 'Movies', component: ()=>import('@/views/Home.vue')},
    {path: '/series', name: 'Series', component: ()=>import('@/views/SerieCard.vue')},
    {path: '/movie/:id', name: 'MovieShow', component: ()=>import('@/views/MovieShow.vue'), props: true},
    {path: '/search', name: 'Search', component: ()=>import('@/views/Search.vue')},
]
 

const router = createRouter({ 
    history: createWebHistory(),
    routes
})
export default router
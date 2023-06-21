/*
 * @Author: theajack
 * @Date: 2023-04-05 21:26:14
 * @Description: Coding something
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/home.vue';
import About from '../components/about.vue';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
    ],
});
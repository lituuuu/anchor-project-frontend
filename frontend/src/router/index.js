import * as Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Registration.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router


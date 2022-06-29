import * as Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Registration.vue'),
	meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
	meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next() 
  } else if (to.meta && to.meta.requiresAuth === false) {
    next() 
  } else if (localStorage.getItem("token")!== null) {
    next() 
  } else {
    next({ name: 'login' }) // always put your redirect as the default case
  }
})


export default router


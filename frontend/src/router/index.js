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
    path: '/home',
    name: 'home',
    component: () => import('../components/Home.vue'),
	meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'initialPage',
    component: () => import('../components/InitialPage.vue'),
	meta: {
      requiresAuth: false
    }
  },
  {
    path: '/photo/:id',
    name: 'Photo',
    component: () => import('../components/Photo.vue'),
	meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {	
  if (to.name === 'login') {
    localStorage.removeItem("token")
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


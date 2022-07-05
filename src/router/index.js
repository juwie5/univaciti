import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/user']){
        return next({
          name: 'Login'
        })
      }
    }
  },
  {
    path: '/bookmarks',
    name: 'Favorites',
    component: Favorites,
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/user']){
        return next({
          name: 'Login'
        })
      }
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Signup.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

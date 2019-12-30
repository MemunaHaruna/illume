import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { verifyUserExists } from '@/helpers/auth'
import Home from '../views/Home.vue'
import NotFoundComponent from '../views/NotFoundComponent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const currentUser = store.getters['currentUser']
      if (currentUser) {
        next('/quotes')
      }
      next()
    }
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = store.getters['currentUser']
      if (!currentUser) {
        next('/')
      }
      next()
    }
  },
  {
    path: '/quotes',
    name: 'quotes',
    component: () =>
      import(/* webpackChunkName: 'quotes' */ '../views/Quotes.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = store.getters['currentUser']
      if (!currentUser) {
        next('/')
      }
      next()
    }
  },
  {
    path: '*',
    name: '404',
    meta: { title: 'Page not found' },
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  await verifyUserExists(store.commit)
  next()
})

export default router

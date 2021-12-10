import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Reg from '@/views/Reg'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login

    },
    {
      path: '/reg',
      component: Reg
    },
    {
      path: '/',
      component: Layout
    }

  ]
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Reg from '@/views/Reg'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import ArtCategory from '@/views/ArtCategory'
import ArtList from '@/views/ArtList'
import UserInfo from '@/views/UserInfo'
import ChangeAvatar from '@/views/ChangeAvatar'
import ResetPwd from '@/views/ResetPwd'

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
      component: Layout,
      children: [
        {
          path: '/',
          component: Home
        },
        {
          path: '/artcategory',
          component: ArtCategory
        },
        {
          path: '/artlist',
          component: ArtList
        },
        {
          path: '/userinfo',
          component: UserInfo
        },
        {
          path: '/changeavatar',
          component: ChangeAvatar
        },
        {
          path: '/resetpwd',
          component: ResetPwd
        }
      ]
    }

  ]
})
const WHITE_LIST = ['/login', '/reg']
router.beforeEach((to, from, next) => {
  // includes 数组的方法  用来判断()里的值在 数组里面有没有,有的话为true 没有flase
  if (WHITE_LIST.includes(to.path)) {
    next()
  } else {
    if (localStorage.getItem('big-event')) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router

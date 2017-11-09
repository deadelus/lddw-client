import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

// components
// pages
import Home from '@/components/Home'
import Post from '@/components/Post'
import New from '@/components/New'
// Search
import Result from '@/components/Result'
// Auth
import Auth from '@/components/Auth/Auth'
import Login from '@/components/Auth/Login'
import Social from '@/components/Auth/Social'
import Subscribe from '@/components/Auth/Subscribe'
import Confirmed from '@/components/Auth/Confirmed'
import Forgot from '@/components/Auth/Forgot'
import Reset from '@/components/Auth/Reset'
// Profile end child view
import Profile from '@/components/Profile'
import UserPosts from '@/components/Profile/Posts'
import UserBookmarks from '@/components/Profile/Bookmarks'
import UserSettings from '@/components/Profile/Settings'
import UserRewards from '@/components/Profile/Rewards'
// other links
import Shop from '@/components/Shop/Shop'
// Errors
import p404 from '@/components/Error/p404'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      alias: '/Trending'
    },
    {
      path: '/trending',
      name: 'Trending',
      component: Home
    },
    {
      path: '/New',
      name: 'New',
      component: New,
      beforeEnter: (to, from, next) => {
        if (store.state.auth.isLoggedIn) {
          next()
        } else {
          router.push({name: 'Subscribe'})
        }
      }
    },
    {
      path: '/search/tag/:tagname',
      name: 'Search',
      component: Result,
      props: true
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post,
      props: true,
      beforeEnter: (to, from, next) => {
        if (store.state.auth.isLoggedIn) {
          next()
        } else {
          router.push({name: 'Subscribe'})
        }
      }
    },
    {
      path: '/profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (store.state.auth.isLoggedIn) {
          next()
        } else {
          router.push({name: 'Subscribe'})
        }
      },
      children: [
        {
          path: '/',
          name: 'UserPosts',
          component: UserPosts
        },
        {
          path: '/bookmarks',
          name: 'UserBookmarks',
          component: UserBookmarks
        },
        {
          path: '/settings',
          name: 'UserSettings',
          component: UserSettings
        },
        {
          path: '/trophies',
          name: 'UserTrophies',
          component: UserRewards
        }
      ]
    },
    {
      path: '/auth',
      component: Auth,
      beforeEnter: (to, from, next) => {
        if (store.state.auth.isLoggedIn) {
          router.push({name: 'Home'})
        } else {
          next()
        }
      },
      children: [
        {
          path: '/',
          name: 'Auth',
          component: Login
        },
        {
          path: '/auth/login/facebook',
          name: 'Facebook',
          component: Social
        },
        {
          path: '/auth/subscribe',
          name: 'Subscribe',
          component: Subscribe
        },
        {
          path: '/validation/:confirmation_code',
          name: 'Confirmation',
          component: Confirmed,
          props: true
        },
        {
          path: '/forgot',
          name: 'Forgot',
          component: Forgot
        },
        {
          path: '/password/reset/:token',
          name: 'Reset',
          component: Reset,
          props: true
        }
      ]
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/404',
      component: p404
    },
    {
      path: '/*',
      redirect: '404'
    }
  ]
})

export default router

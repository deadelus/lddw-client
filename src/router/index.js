import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

// components
// pages
import Home from '@/components/Home'
import Post from '@/components/Post'
import New from '@/components/New'
// Auth
import Subscribe from '@/components/Auth/Subscribe'
import Social from '@/components/Auth/Social'
import Local from '@/components/Auth/Local'
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
      path: '/news',
      name: 'News',
      component: Home
    },
    {
      path: '/New',
      name: 'New',
      component: New
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
          next(false)
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
          next(false)
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
      component: Subscribe,
      children: [
        {
          path: '/',
          name: 'Auth',
          component: Social
        },
        {
          path: '/subscribe',
          name: 'Subscribe',
          component: Local
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

import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

// components
// pages
import Home from '@/components/Home'
import Gif from '@/components/Gif'
import Video from '@/components/Video'
import NSFW from '@/components/NSFW'
import Trend from '@/components/Trend'
import Hot from '@/components/Hot'
import Post from '@/components/Post'
import Upload from '@/components/Upload'
// Search
import Result from '@/components/Result'
// Auth
import Auth from '@/components/Auth/Auth'
import Login from '@/components/Auth/Login'
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
// Law About
import About from '@/components/Disclaimer/About'
import Rules from '@/components/Disclaimer/Rules'
import Cgu from '@/components/Disclaimer/Cgu'
// Errors
import p404 from '@/components/Error/p404'
import Contact from '@/components/Contact'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/gif',
      name: 'Gif',
      component: Gif
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/nsfw',
      name: 'NSFW',
      component: NSFW
    },
    {
      path: '/populaire',
      name: 'Trending',
      component: Trend
    },
    {
      path: '/nouveau',
      name: 'New',
      component: Home
    },
    {
      path: '/hot',
      name: 'Hot',
      component: Hot
    },
    {
      path: '/ajoute-un-dechet',
      name: 'Upload',
      component: Upload,
      beforeEnter: (to, from, next) => {
        if (store.state.auth.isLoggedIn) {
          next()
        } else {
          router.push({name: 'Auth'})
        }
      }
    },
    {
      path: '/a-propos',
      name: 'About',
      component: About
    },
    {
      path: '/regles',
      name: 'Rules',
      component: Rules
    },
    {
      path: '/cgu',
      name: 'Disclaimer',
      component: Cgu
    },
    {
      path: '/search/tag/:tagname',
      name: 'Search',
      component: Result,
      props: true,
      force: true
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
          router.push({name: 'Auth'})
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
          router.push({name: 'Auth'})
        }
      },
      children: [
        {
          path: '/',
          name: 'UserPosts',
          component: UserPosts
        },
        {
          path: 'bookmarks',
          name: 'UserBookmarks',
          component: UserBookmarks
        },
        {
          path: 'settings',
          name: 'UserSettings',
          component: UserSettings
        },
        {
          path: 'trophies',
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
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/*',
      redirect: '404'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(store.getters.cgu)
//   next()
// })

export default router

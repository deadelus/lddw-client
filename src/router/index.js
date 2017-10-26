import Vue from 'vue'
import Router from 'vue-router'

// components
// pages
import Home from '@/components/Home'
import Post from '@/components/Post'

// Profile end child viewq
import Profile from '@/components/Profile'
import UserPosts from '@/components/Profile/Posts'
import UserBookmarks from '@/components/Profile/Bookmarks'
import UserSettings from '@/components/Profile/Settings'
import UserRewards from '@/components/Profile/Rewards'

// other links
import Shop from '@/components/Shop/Shop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post,
      props: true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children: [
        {
          path: '/',
          name: 'UserPosts',
          component: UserPosts
        },
        {
          path: '/',
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
      path: '/shop',
      name: 'Shop',
      component: Shop
    }
  ]
})

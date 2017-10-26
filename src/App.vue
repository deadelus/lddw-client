<template>
  <div id="app">
    <app-nav></app-nav>
    <!-- use router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
    <!--<router-link to="/home">Go to Home</router-link>-->
    <!--<router-link to="/post">Go to Post</router-link>-->
    <router-view></router-view>
  </div>
</template>
<script>

import AppNav from '@/AppNav.vue'

export default {
  name: 'app',
  components: { AppNav },
  data () {
    return {
    }
  }
}
</script>

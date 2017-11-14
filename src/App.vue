<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
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

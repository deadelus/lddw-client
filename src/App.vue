<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
import AppNav from '@/AppNav'

export default {
  name: 'app',
  components: { AppNav }
}
</script>

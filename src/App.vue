<template>
  <div id="app">
    <app-nav></app-nav>
    
    <age-modal 
      v-if="showAgeModal" 
      @close="showAgeModal = false" 
      ></age-modal>

    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
import AppNav from '@/AppNav'
import AgeModal from '@/components/Modal/AgeModal'

export default {
  name: 'app',
  data () {
    return {
      showAgeModal: true
    }
  },
  components: { AppNav, AgeModal }
}
</script>

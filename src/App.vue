<template>
  <div id="app">
    <app-nav></app-nav>
    
    <age-modal 
      v-if="showAgeModal" 
      @majeur="confirmAge()"
      ></age-modal>

    <section class="container-fluid">
      <div class="center">
        <div class="row">
          <div class="col-lg-2">
            <div class="lateral left-bar">
              <nav-lateral></nav-lateral>
            </div>
          </div>
          <div class="col-lg-7">
            <router-view></router-view>
          </div>
          <div class="col-lg-3" v-if="showRightBar">
            <div class="lateral right-bar">
              <user-info></user-info>
              <page-info></page-info>
              <!--<ads></ads>-->
            </div>
          </div>
        </div>
      </div>
    </section>

    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
import AppNav from '@/AppNav'
import NavLateral from '@/NavLateral'
import PageInfo from '@/PageInfo'
import UserInfo from '@/UserInfo'
import Ads from '@/Ads'
import AgeModal from '@/components/Modal/AgeModal'

export default {
  name: 'app',
  data () {
    return {
      showAgeModal: true,
      showRightBar: true
    }
  },
  watch: {
    '$route' (to, from) {
      /**
        Affiche la barre latéral si l'on ne se trouve PAS dans ces routes
       */
      const unauthorizedPage = [
        'Auth', 'Subscribe', 'Confirmation', 'Forgot', 'Reset'
      ]

      if (unauthorizedPage.indexOf(this.$route.name) === -1) {
        this.showRightBar = true
      } else {
        this.showRightBar = false
      }
    }
  },
  components: { AppNav, AgeModal, NavLateral, UserInfo, PageInfo, Ads },
  created () {
    this.showAgeModal = !this.$store.getters.majeur
  },
  methods: {
    confirmAge: function () {
      this.showAgeModal = false
      this.$store.commit('IS_MAJEUR')
    }
  }
}
</script>

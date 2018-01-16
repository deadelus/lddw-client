<template>
  <div id="app">
    <app-nav></app-nav>
    
    <age-modal 
      v-if="showAgeModal" 
      @majeur="confirmAge()"
      ></age-modal>

    <disclaimer-modal 
      v-if="showDiscModal" 
      @ok="acceptDisclaimer()"
      ></disclaimer-modal>

    <section class="container-fluid">
      <div class="center">
        <div class="row">
          <div class="col-lg-2 lateral left-bar">
            <nav-lateral></nav-lateral>
          </div>
          <div class="feed col-lg-7 col-lg-offset-2">
            <router-view></router-view>
          </div>
          <div class="col-lg-3 lateral right-bar" v-if="showRightBar">
            <user-info></user-info>
            <page-info></page-info>
            <!--<ads></ads>-->
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
import DisclaimerModal from '@/components/Modal/DisclaimerModal'

export default {
  name: 'app',
  data () {
    return {
      showAgeModal: true,
      showDiscModal: true,
      showRightBar: true,
      cgu: {
        version: '0.3',
        accepted: true
      }
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
  components: { AppNav, DisclaimerModal, NavLateral, UserInfo, PageInfo, Ads },
  created () {
    if (this.$store.getters.cgu.version === this.cgu.version) {
      this.showDiscModal = false
    }
  },
  methods: {
    acceptDisclaimer: function () {
      this.cgu.accepted = true
      this.showDiscModal = false
      this.$store.commit('IS_MAJEUR')
      this.$store.commit('UPDATE_CGU', this.cgu)
    }
  }
}
</script>

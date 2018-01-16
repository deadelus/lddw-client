<template>
    <div id="subscribe">
        <router-view></router-view>
        <router-link :to="{ name: 'Forgot' }">
            <span class="linkauth">Mot de passe oublié.</span>
        </router-link>
        <router-link :to="{ name: 'Subscribe' }">
            <span class="linkauth">Je n'ai pas encore de compte.</span>
        </router-link>
    </div>
</template>
<script>
  export default {
    name: 'auth',
    data () {
      return {
        form: false
      }
    },
    mounted () {
      this.$store.watch((state) => {
        this.isLoggedIn = this.$store.state.auth.isLoggedIn
        if (this.isLoggedIn) {
          this.$router.push('/')
        }
      })
    }
  }
</script>
<style>
    #subscribe {
        padding: 5px;
    }
</style>
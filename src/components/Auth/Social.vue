<template>
    <!-- subscribe -->
    <div class="setting">
        <!--<a href="#" class="social facebook">
            Se connecter avec Facebook
        </a>
        <a href="#" class="social twitter">
            Se connecter avec Twitter
        </a>-->
        <div class="login-form">
            <div class="flex col">
                <label for="username">Login</label>
                <input v-model="username" type="text" class="col-lg-12">
            </div>
            <div class="flex col">
                <label for="pawword">Password</label>
                <input v-model="password" type="password" class="col-lg-12">
            </div>
            <div v-on:click="login" class="login-btn">Se connecter</div>
        </div>
        <router-link :to="{ name: 'Subscribe' }">
            <span class="linkauth">Je n'ai pas encore de compte.</span>
        </router-link> 
    </div>
</template>
<script>
  export default {
    name: 'social',
    data () {
      return {
        isLoggedIn: false,
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        this.isLoggedIn = true

        const credential = {
          username: this.username,
          password: this.password
        }

        this.$auth.login(credential, false).then((response) => {
          this.isLoggedIn = this.$store.state.auth.isLoggedIn
        })
      }
    }
  }
</script>
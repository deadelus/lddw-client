<template>
  <fb-signin-button
    class="social facebook"
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    <span v-show="load" class="loading"></span> Se connecter avec Facebook
  </fb-signin-button>
</template>

<script>
export default {
  name: 'facebook',
  data () {
    return {
      load: false,
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      }
    }
  },
  methods: {
    onSignInSuccess (response) {
      FB.api('/me', user => {
        this.login(response.authResponse.accessToken)
      })
    },
    onSignInError (error) {
      this.errors = [{
        name: 'Une erreur s\'est produite'
      }]
    },
    login (token) {
      this.load = true

      let creds = {
        token: token
      }
      // this.$http.post(this.$apiURL + '/auth/loginWithFB', creds)
      this.$http.post(this.$apiURL + '/auth/login/facebook', creds)
        .then((response) => {
          this.load = false
          this.$auth._storeToken(response)
          this.$router.push({ name: 'Home' })
        })
        .catch((errorResponse) => {
          this.load = false
          this.errors = [{
            name: 'Une erreur s\'est produite'
          }]
        })
    }
  }
}
</script>
<style>
span.loading {
  display: inline-block;
  vertical-align: text-bottom;
  width: 20px;
  height: 20px;
  border-left: 4px solid #2d3e51;
  border-bottom: 4px solid #2d3e51;
  border-top: 4px solid #eaeaea;
  border-right: 4px solid #eaeaea;
  border-radius: 50%;
  -webkit-animation: loading 1.2s infinite linear;
  animation: loading 1.2s infinite linear;
}
@-moz-keyframes loading {
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loading {
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes loading {
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
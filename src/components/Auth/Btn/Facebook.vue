<template>
  <fb-signin-button
    class="social facebook"
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    <span v-show="load" class="loading"></span> 
    <span v-show="!load" class="logo"><svg viewBox="0 0 8 15"><path id="faceboook" d="M4.796,3.263l0,1.482l2.398,0l-0.3,2.666l-2.098,0l0,7.408l-3.297,0l0,-7.408l-1.499,0l0,-2.666l1.499,0l0,-1.482c0,0 -0.267,-2.825 2.398,-3.263l3.297,0l0,2.374l-1.499,0c0,0 -0.853,-0.032 -0.899,0.889Z"/></svg></span> Se connecter avec Facebook
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
.logo svg{
  width: 20px;
  height: 20px;
  fill: white;
  position: relative;
  top: 5px; 
}
</style>
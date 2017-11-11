// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import Moment from 'vue-moment'

import './assets/css/bootstrap.css'
import './assets/css/style.css'

/* Auth plugin */
import Auth from './auth'
import MediaMaker from './mediamaker'
import FBSignInButton from 'vue-facebook-signin-button'

// Filtre pour inverser le tableau de commentaire
Vue.filter('reverse', function (array) {
  return array.slice().reverse()
})

Vue.use(FBSignInButton)
Vue.use(VueResource)
Vue.use(Auth)
Vue.use(Moment)
Vue.use(MediaMaker)

Vue.moment.locale('fr')
Vue.config.productionTip = false

// PROD API
// Vue.prototype.$assetURL = 'https://api.ladechetterieduweb.com/storage'
// Vue.prototype.$apiURL = 'https://api.ladechetterieduweb.com/api'
// Vue.prototype.$URL = 'https://www.ladechetterieduweb.com'

// Preprod API
// Vue.prototype.$assetURL = 'http://preprod.ladechetterieduweb.com/storage'
// Vue.prototype.$apiURL = 'http://preprod.ladechetterieduweb.com/api'
// Vue.prototype.$URL = 'https://www.ladechetterieduweb.com'

// Local API
Vue.prototype.$assetURL = 'http://localhost:8000/storage'
Vue.prototype.$apiURL = 'http://localhost:8000/api'
Vue.prototype.$URL = 'https://www.ladechetterieduweb.com'
/* eslint-disable no-new */

new Vue({
  el: '#app',
  created: function () {
    window.Vue = this
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '2211517428989297',
        // appId      : '631741580331636',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView(); 
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})
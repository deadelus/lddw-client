// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import Moment from 'vue-moment'
// import Meta from 'vue-meta'
import VueProgressBar from 'vue-progressbar'

/* Assets */
import './assets/css/bootstrap.css'
import './assets/css/style.css'

/* Auth plugin */
import Auth from './auth'
import MediaMaker from './mediamaker'
import FBSignInButton from 'vue-facebook-signin-button'
import Modal from '@/components/Modal/Modal'

const Dialog = Vue.extend(Modal);

Vue.directive('confirm', {
  bind(el, binding, vnode) {
    const yesMethod = binding.value;
    el.handleClick = (e) => {
      const data = { doYes: yesMethod, show: true };
      let dialog = new Dialog({ data: data }).$mount();
      document.getElementById('app').appendChild(dialog.$el);
    }
    el.addEventListener('click', el.handleClick);
  },
  unbind(el) {
    el.removeEventListener('click', el.handleClick);
  }
});

// Filtre pour inverser le tableau de commentaire
Vue.filter('reverse', function (array) {
  return array.slice().reverse()
})

Vue.use(VueProgressBar, {
  color: '#2c3e50',
  failedColor: 'red',
  height: '2px'
})

Vue.use(FBSignInButton)
Vue.use(VueResource)
Vue.use(Auth)
Vue.use(Moment)
Vue.use(MediaMaker)

// Vue.use(Meta, {
//   keyName: 'metaInfo'
// })
// keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
// attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
// ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
// tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag

Vue.moment.locale('fr')
Vue.config.productionTip = false

// PROD API
// Vue.prototype.$assetURL = 'https://api.ladechetterieduweb.com'
// Vue.prototype.$apiURL = 'https://api.ladechetterieduweb.com/api'
// Vue.prototype.$API = 'https://api.ladechetterieduweb.com'
// Vue.prototype.$URL = 'https://www.ladechetterieduweb.com'

// Preprod API
// Vue.prototype.$assetURL = 'http://preprod.ladechetterieduweb.com/storage'
// Vue.prototype.$apiURL = 'http://preprod.ladechetterieduweb.com/api'
// Vue.prototype.$API = 'http://preprod.ladechetterieduweb.com'
// Vue.prototype.$URL = 'https://www.ladechetterieduweb.com'

// Local API
Vue.prototype.$assetURL = 'http://localhost:8000/storage'
Vue.prototype.$apiURL = 'http://localhost:8000/api'
Vue.prototype.$API = 'http://localhost:8000'
Vue.prototype.$URL = 'http://localhost:8000'
/* eslint-disable no-new */

new Vue({
  el: '#app',
  // metaInfo: {
  //   // if no subcomponents specify a metaInfo.title, this title will be used
  //   title: 'La déchetterie du web',
  //   // all titles will be injected into this template
  //   titleTemplate: '%s | Home'
  // },
  created: function () {
    window.Vue = this
    window.fbAsyncInit = function() {
      FB.init({
        // appId      : '631741580331636',
        appId      : '2211517428989297',
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
  mounted: function () {
    // console.log(this.$store.getters.cgu)
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})
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
import './assets/js/gifplayer.js'
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
      let body = document.getElementsByTagName('body')[0]
      const data = { doYes: yesMethod, show: true };
      let dialog = new Dialog({ data: data }).$mount();
      document.getElementById('app').appendChild(dialog.$el);
      body.style.overflow = 'hidden'
    }
    el.addEventListener('click', el.handleClick);
  },
  unbind(el) {
    el.removeEventListener('click', el.handleClick);
    let body = document.getElementsByTagName('body')[0]
    body.style.overflow = ''
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

Vue.moment.locale('fr')
Vue.config.productionTip = false

// API
Vue.prototype.$assetURL = API_ASSET_URI
Vue.prototype.$API = API_BASE_URI
Vue.prototype.$apiURL = API_URI
Vue.prototype.$URL = APP_URL

// Freeze scroll when modal opened
Vue.prototype.$freeze = function (bool) {
  const body = document.getElementsByTagName('body')[0]
  const html = document.getElementsByTagName('html')[0]
  var pos = html.scrollTop

  body.style.overflow = bool ? 'hidden' : ''
  body.style.position = bool ? 'fixed' : ''
  //
  html.style.overflow = bool ? 'hidden' : ''
  html.style.position = bool ? 'fixed' : ''
  // html.style.top = bool ? '-' + pos + 'px' : ''
  
  // if (!bool) {
  //   console.log(pos)
  //   window.scrollTo(0, pos)
  // }
}

/* eslint-disable no-new */
console.log("Running App version " + VERSION);
new Vue({
  el: '#app',
  created: function () {
    window.Vue = this
    window.fbAsyncInit = function() {
      FB.init({
        appId      : FB_APP_ID,
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
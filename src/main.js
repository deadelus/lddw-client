// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueResource from 'vue-resource'
import Moment from 'vue-moment'

import './assets/css/style.css'
import './assets/css/bootstrap.css'

/* Auth plugin */
import Auth from './auth'

// Filtre pour inverser le tableau de commentaire
Vue.filter('reverse', function (array) {
  return array.slice().reverse()
})

Vue.use(VueResource)
Vue.use(Auth)
Vue.use(Moment)

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Origin': '*'
}

Vue.moment.locale('fr')
Vue.config.productionTip = false
Vue.prototype.$apiURL = 'http://localhost:8000/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  created: function () {
    window.Vue = this
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})

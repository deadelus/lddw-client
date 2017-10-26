import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import { getters } from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

/**
 * Gestion des etats de l'application
 */

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins
})

export default store

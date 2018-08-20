import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import Vue from 'vue'
Vue.prototype.$config = state
Vue.prototype.$app = state.app

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}

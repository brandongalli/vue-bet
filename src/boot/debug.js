import Vue from 'vue'
import { debug } from 'experience-engine'
Vue.prototype.$debug = debug(Vue.prototype.$config.debug)

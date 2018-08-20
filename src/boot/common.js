import ee from 'experience-engine'
import { uid, extend } from 'quasar'
import media from './common/media'
import events from './common/events'
import user from './common/user'
import formats from './common/formats'
import timeline from './common/timeline'
import { ucFirst, isEqual, diff, toHumanTime, timeSince, timeUntil, clone } from './common/general'
import experience from './common/experience'
import playerjs from './common/playerjs'
import api from './common/api'
import validation from './common/validation'
import behavior from './common/behavior'
import alert from './common/alert'
import PortalVue from 'portal-vue'
import constants from './common/variables'
// Merges the existing state with the incomming payload...
const merge = (obj, args) => {
  return extend(true, obj, ...args)
}

const uuid = () => {
  let uuid = uid()
  return uuid.substr(0, 14) + '4' + uuid.substr(15)
}

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { Vue } = dependencies

  Vue.use(PortalVue)
  playerjs(dependencies)

  Vue.prototype.$ee = ee
  Vue.prototype.$common = {
    activations: ee.activations,
    extend,
    merge,
    uuid,
    timeline,
    get: ee.util.get,
    diff,
    clone,
    isEqual,
    toHumanTime,
    timeSince,
    timeUntil,
    ucFirst,
    constants,
    experience: experience(dependencies),
    validation: validation(dependencies),
    behavior: behavior(dependencies),
    formats: formats(dependencies),
    events: events(dependencies),
    alert: alert(dependencies),
    media: media(dependencies),
    user: user(dependencies),
    api: api(dependencies)
  }
}

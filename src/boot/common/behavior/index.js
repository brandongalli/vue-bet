/*

Essentially, behavior is just a way to pack in behavioral changes into configuration.
On any resource (which is a distribution/production/property/organization/domain), you can add behavioral features to the
settings.behavior path and they will effect the resulting behavior of distributions that fall within it's domain.

Additionally, you can add behaviors to individual things.

In most cases, thing behaviors have counterparts in resource settings.

For example, the behavior "playThroughDetails", (false by default), if true, will keep playing the content if that thing's details is shown.
If set at the resource level, it will affect this behavior on all things.

View EntertainmentPlus.vue and look at the implementation for "behavior('playThroughDetails')".

 */
import { util } from 'experience-engine'

export default (dependancies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependancies
  const { store, Vue } = dependancies
  const config = store.state.config
  // const user = config.app.user

  const $behavior = {
    // Returns true if the behavior exists in the passed thing...
    existsInThing (name, thing) {
      if (util.get(thing, `behavior.${name}`) === true) return true
      return false
    },
    // Returns true if the behavior exists in settings...
    existsInSettings (name) {
      if (util.get(config.app.settings, `behavior.${name}`) === true) return true
      return false
    },
    // Returns true if the behavior exists in the settings or optionally the passed thing...
    exists (name, thing = {}) {
      if (this.existsInThing(name, thing) || this.existsInSettings(name, thing)) return true
      return false
    },
    // The opposite of exists, specifically checking that it doesn't exists in the thing or settings...
    doesntExist (name, thing = {}) {
      if (!this.existsInThing(name, thing) && !this.existsInSettings(name, thing)) return true
      return false
    },
    // Returns the payload for the behavior if it exists (returning the thing value instead of settings if they both exist)...
    get (name, thing = {}) {
      return util.get(thing, `behavior.${name}`, util.get(config.app.settings, `behavior.${name}`))
    }
  }
  // Make it available on a shortcut...
  Vue.prototype.$behavior = $behavior

  return $behavior
}

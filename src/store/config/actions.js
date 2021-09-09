import { throttle } from 'quasar'
import { hasLocalStorage } from '../../boot/storage'
/**
 * Takes a distribution id, gets the graphed details, and creates default configuration...
 * @example
 * // Hydrates with distribution Id 31...
 * this.$store.dispatch('config/hydrate', 31)
 * @param {*} context - This is the Vuex context and part of how Vuex works
 * @param {number} distribution - This is an integer representing the desired distribution to load
 */
export async function hydrate (context, distribution = 0) {
  const vm = this._vm
  let root
  let user = {}
  const debug = vm.$debug.extend('config:actions:hydrate')
  distribution = window.SourceDigital.distribution.id
  debug(`Hydrating for distribution ${distribution}`)

  if (distribution) {
    // let data = await vm.$common.media.get(distribution)
    let data = JSON.parse(JSON.stringify(window.SourceDigital.config.data))

    debug('Hydration result', data)
    try {
      root = JSON.parse(JSON.stringify(window.SourceDigital.config))
      if (window.SourceDigital.user) user = JSON.parse(JSON.stringify(window.SourceDigital.user))
      debug('Merged root', root, user)

      debug('Getting events from distribution.data')
      // Validate all the things so we can rule out data bugs...
      root.events = vm.$common.validation.validate(root.events)

      debug('Merge result', root, user)
      context.commit('mergeState', root)
      context.commit('mergeState', { user: user })
      context.commit('loaded', true)
      if (!context.state.app.settings.pulse.enabled) console.warn('WARNING: Pulse (analytics) is disabled for this distribution! If this is not intended, make sure settings.pulse.enabled = true, contact support if you need help.')
    } catch (error) {
      const msg = 'Failed to parse the distribution data.'
      debug(msg, error)
      context.commit('error', msg)
      context.commit('loaded', true)
    }
  } else {
    debug('Distribution not loaded')
    context.commit('loaded', true)
  }

  // Tick counter...
  // setInterval(() => { vm.$common.events.tick() }, context.state.timing.tick)
  // Pulse counter...
  // setInterval(() => { vm.$pulse('heartBeat') }, context.state.timing.pulse)
  // Clear pulses...
  hasLocalStorage() && localStorage.removeItem('pulse')
  // Capture mouse positions...
  const pulse = vm.$pulse
  window.addEventListener('mousemove', throttle((e) => { pulse('focus', e) }, context.state.timing.throttle))
}

// Called automatically (in experienceLoader.vue via q-resize-observer) whenever the layout changes (through screen size changes, rehydration, reskinning or otherwise)...
export function layoutChange (context, payload) {
  const vm = this._vm
  const pulse = vm.$pulse
  const debug = vm.$debug.extend('config:actions:layoutChange')

  // Give the sandbox some additional detail to work with...
  payload.platform = JSON.parse(JSON.stringify(vm.$q.platform))
  payload.screen = JSON.parse(JSON.stringify(vm.$q.screen))
  let forced = payload.forcedOrientation || context.state.app.layout.forcedOrientation
  payload.orientation = forced || (vm.$q.screen.width > vm.$q.screen.height ? 'landscape' : 'portrait')
  if (payload.underlay) payload.underlay.visible = payload.underlay.height > 0 && payload.underlay.width > 0
  // console.warn('xx', payload)
  vm.$event.emit('layoutChange')
  const lastOrientation = vm.$app.layout ? vm.$app.layout.orientation ? vm.$app.layout.orientation : '' : ''
  // If on mobile, and the new orientation is different than the last, fire a mobileOrientation event...
  if (vm.$q.platform.is.mobile && lastOrientation !== payload.orientation) {
    payload.mobileOrientation = payload.orientation
    vm.$event.emit('mobileOrientation', payload.orientation)
  }

  // Handle underlay visibility...
  context.commit('mergeState', { layout: payload })
  debug(`Changing layout:`, payload)
  pulse('layoutChange', payload)
}

export function logout ({ commit }) {
  commit('logout')
}

export function updateUserProfile ({ commit }, payload) {
  commit('mergeState', { user: payload })
}

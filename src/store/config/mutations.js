import { extend } from 'quasar'
import _set from 'lodash.set'
// import { util } from 'experience-engine'

// Merges the existing state with the incomming payload...
export function mergeState (state, payload) {
  this._vm.$set(state, 'app', extend(true, state.app, payload))
}

// Changes a key/value...
export function set (state, payload) {
  let { key, value } = payload
  _set(state, key, value)
}

export function toggle (state, key) {
  let value = this._vm.$common.get(state, key)
  value = !value
  _set(state, key, value)
}

// Merges in a certain part of the admin data...
export function loadAdmin (state, payload) {
  this._vm.$set(state.admin, payload.name, payload.payload)
}

export function error (state, payload) {
  state.error = true
  state.errorMessage = payload
}

export function setTime (state, payload) {
  state.app.content.currentTime = payload
}

// Updates something for the user...
export function updateUser (state, payload) {
  if (payload.path) {
    if (payload.path === 'lookingAt') {
      state.app.user.activity.lookingAt.x = payload.data.x
      state.app.user.activity.lookingAt.y = payload.data.y
    }
  }
  if (payload.event !== 'heartBeat') {
    state.app.user.activity.lastTime = state.app.session.time // Update when the user last did something
    state.app.user.activity.current = payload.event
  }
  // state.app.user.lastAction = payload.event
}

// Decides if the configuration has been loaded yet or not (for changing app load state in templates, etc)...
export function loaded (state, payload) {
  if (payload !== true && payload !== false) throw new Error('config.loaded mutation must be true or false, recieved ' + payload)
  state.loaded = payload

  // re-identify all triggers...
  if (state.app.triggers) {
    let accumulator = 1
    Object.keys(state.app.triggers).forEach(branch => {
      state.app.triggers[branch].forEach(trigger => {
        trigger.id = accumulator++
      })
    })
  }
}

// Changes the state to reflect a layout change...
export function layoutChange (state, payload) {
  if (payload.underlay) {
    state.app.layout.underlay.visible = payload.underlay.height > 0
    state.app.layout.underlay.height = payload.underlay.height
    state.app.layout.underlay.width = payload.underlay.width
  }
}

export function logout (state) {
  state.app.user.id = 1
}

export function addUserContentItem (state, payload) {
  state.app.user.content.filter(el => el.type === payload.type)[0].items.push(payload.model)
}

export function setUserContent (state, payload) {
  state.app.user.content = payload
}

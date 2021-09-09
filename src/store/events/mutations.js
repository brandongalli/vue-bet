import { extend } from 'quasar'
// Merges the existing state with the incomming payload...
export function mergeState (state, payload) {
  this._vm.$set(state, 'app', extend(true, state.app, payload))
}

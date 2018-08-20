// Returns the time in MS since the experience started, media playing or not
const startTime = new Date()
export function counter (state) {
  return new Date() - startTime
}
export function getUserInfo (state) {
  return state.app
}
export function getUserContentActivation (state) {
  return !!state.app.user.activations.length && state.app.user.activations.filter(a => {
    return a.settings.type === 'content'
  })[0]
}
export function getUserContent (state) {
  return state.app.user.content
}

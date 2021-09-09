// Draws notifications in a standard way, subject to the settings the client has defined...
export default (dependencies) => {
  const { Vue } = dependencies
  const debug = Vue.prototype.$debug.extend(`alert`)
  const $alert = {
    // Send out a simple notification...
    simple (message, icon = 'notification_important') {
      debug('Sending alert', message)

      Vue.prototype.$q.notify({
        message,
        icon,
        color: 'primary',
        actions: [
          { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
        ]
      })
    }
  }
  Vue.prototype.$alert = $alert
  return $alert
}

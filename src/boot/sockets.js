import io from 'socket.io-client'
import { hasLocalStorage } from './storage'
export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { Vue, store } = dependencies
  const socket = io(store.state.config.server, { transports: ['websocket'] })

  function realtime (event, data) {
    const cfg = window.SourceDigital.config
    const payload = {
      user: cfg.user.name.first ? 'Anonymous' : cfg.user.name,
      avatar: cfg.user.photo.url ? cfg.user.photo.url : null,
      distribution: cfg.session.distribution,
      time: cfg.content.currentTime,
      data
    }
    socket.emit(event, payload)
  }

  Vue.prototype.$socket = socket
  Vue.prototype.$realtime = realtime
  window.chat = realtime

  // If a JWT exists, try to auth in realtime...
  if (hasLocalStorage() && localStorage.token) socket.emit('auth', { data: localStorage.token })
}

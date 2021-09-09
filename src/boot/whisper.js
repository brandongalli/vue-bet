import Whisper from './whisper/codec.js'

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { Vue } = dependencies
  Vue.prototype.$whisper = {
    codec: Whisper(dependencies)
  }
}

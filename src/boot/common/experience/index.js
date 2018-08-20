// The front-end to the experience engine...

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { store, Vue } = dependencies
  const axios = Vue.prototype.$axios
  const config = store.state.config
  return {
    async method (name, payload) {
      const distribution = payload.distribution ? payload.distribution : config.app.session.distribution
      const result = await axios({
        method: 'post',
        url: `${config.server}experience/${distribution}/method/${name}`,
        headers: { 'Content-Type': 'application/json' },
        data: payload.data
      })
      return result.data
    }
  }
}

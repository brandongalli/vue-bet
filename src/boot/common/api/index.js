
export default (dependancies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependancies
  const { store, Vue } = dependancies
  const config = store.state.config
  // const user = config.app.user

  const $api = async (api, query) => {
    const data = await Vue.prototype.$axios.get(`${config.server}${api}`)
    return data
  }
  // Make the user available on a shortcut...
  Vue.prototype.$api = $api

  return $api
}

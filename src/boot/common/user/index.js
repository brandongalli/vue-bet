
// Returns camelCase of any string...
function _camelize (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase()
  }).replace(/\s+/g, '')
}

import UIACL from './ui-acl.json'
import { Cookies } from 'quasar'
export default (dependancies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependancies
  const { store, Vue } = dependancies
  const config = store.state.config
  const user = config.app.user
  const $user = {
    can (what, resource, id) {
      what = what.toLowerCase()
      resource = resource.toLowerCase()
      // 'this' is a shortcut to the current distribution...
      if (resource === 'this') {
        if (what === 'read') return true
        if (!this.isLoggedIn()) return false // You can edit this if you arent logged in
        if (what === 'update' || what === 'edit') {
          while (!user.distributions) return new Promise(resolve => resolve())
          if (user.distributions.find(res => res.id === config.app.session.distribution)) return true
        }
        return false
      }

      // Currently, only check for distributions...
      if (resource !== 'distributions') return false

      // For now, all distributions are public...
      if (what === 'read') return true

      // Check for edit permissions...
      if (what === 'update' || what === 'edit') {
        // Check through their resources and see if they can edit the one in question...
        if (!user[resource]) return false
        if (user[resource].find(res => res.id === id)) return true
      }
      // If nothing above said they can do it, they can't do it...
      return false
    },
    // Returns a users User Interface Access Control List...
    acl () {
      return UIACL[_camelize(user.role.name)]
    },
    // Returns details about a user...
    details: user,
    // Returns true if this user type is internal (works at source digital)
    isInternal () {
      return user.role.name.startsWith('Platform')
    },
    // Returns true if this user type is a developer (internal or otherwise)
    isDeveloper () {
      return user.role.name.endsWith('Developer')
    },
    // Returns true if this user is logged in...
    isLoggedIn () {
      return user.role.name !== 'Public'
    },
    logout () {
      localStorage.removeItem('token')
      Cookies.remove('jwt')
    }
  }
  // Make the user available on a shortcut...
  Vue.prototype.$user = $user
  return $user
}

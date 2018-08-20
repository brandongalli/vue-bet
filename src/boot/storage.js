import Vue from 'vue'

export const hasLocalStorage = () => {
  try {
    localStorage.setItem('set', 'set')
    localStorage.removeItem('set')
    return true
  } catch (e) {
    return false
  }
}

Vue.prototype.$hasLocalStorage = hasLocalStorage

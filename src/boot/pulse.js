// Just using Google Analytics for the forseeable future. Will readdress when Pulse is mature...
export default (dependencies) => {
  const { Vue } = dependencies

  // Event is a string or object...
  Vue.prototype.$pulse = (event) => {
    // See https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits
    if (window.ga && event !== null) window.ga('send', event)
  }
  /*
  export const analytics = (action, label, category = 'Billing', hitType = 'event') => {
    if (!label) return false
    if (window.ga) {
      window.ga('initial.send', {
        hitType,
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        page: window.location.href
      })
    }
  }
  */
}

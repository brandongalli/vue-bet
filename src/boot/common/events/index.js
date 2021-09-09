import jsonata from 'jsonata'

const USERLAND_FUNCTIONS = {
  dialog: (text) => {
    // eslint-disable-next-line no-console
    console.log('DIALOG:', text)
  }
}

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { store, Vue } = dependencies
  const config = store.state.config
  const app = config.app
  let previousApp = null
  const triggered = {
    previously: [],
    currently: []
  }
  return {
    tick: () => {
      const common = Vue.prototype.$common
      if (!previousApp) previousApp = common.clone(app)
      // TODO: Handle activity level...
      // const level = config.timing.activity.interval

      store.commit('config/tick')
      Vue.prototype.$bus.emit('tick', 'hello')

      // Basic difference engine...
      const differences = common.diff(previousApp, common.clone(app))
      store.commit('config/triggers', differences)

      differences.forEach(difference => { // Loop through each difference found
        if (app.triggers[difference]) { // See if at least one trigger is registered on this difference
          const keyDifferences = common.diff(previousApp[difference], common.clone(app[difference])) // Find key differences
          app.triggers[difference].forEach(trigger => { // Loop through each trigger
            if (keyDifferences.includes(trigger.key)) {
              // Only execute this trigger if it's supposed to be checked multiple times, or currently is not being triggered...
              if (trigger.multiple || !triggered.currently.includes(trigger.id)) {

              }
              // If this trigger has been tripped, run the query and see if the action should be taken...
              const oldValue = previousApp[difference][trigger.key]
              const newValue = app[difference][trigger.key]
              const time = app.session.time
              const name = trigger.name || trigger.id
              // Add query shorthand...
              const query = `${difference}.${trigger.key}` + common.clone(trigger.query).replace('also', `${difference}.${trigger.key}`)
              // eslint-disable-next-line no-undef
              let result = jsonata(query).evaluate(app, USERLAND_FUNCTIONS)
              if (result) {
                // eslint-disable-next-line no-console
                console.log(`%c ${time}: Triggered "${name}" (${difference}.${trigger.key}: ${oldValue} -> ${newValue}) "${trigger.query}" = "${result}"`, 'color:green')
              } else {
                // eslint-disable-next-line no-console
                console.log(`%c ${time}: Tested "${name}" (${difference}.${trigger.key}: ${oldValue} -> ${newValue}) "${trigger.query}" = "${result}"`, 'color:orange')
              }
            }
          })
        }
      })
      previousApp = common.clone(app)
    }
  }
}

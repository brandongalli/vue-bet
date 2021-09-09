import Ajv from 'ajv'
import { util } from 'experience-engine'
import thing1 from './schema/thing-1.js'
const ajv = new Ajv({ allErrors: true })

// Precompile all schemas for the fastest validation...
const validate = {
  thing: {
    1: ajv.compile(thing1)
  }
}

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { store, Vue } = dependencies
  const debug = Vue.prototype.$debug.extend(`validation`)
  return {
    // Validate all the things...
    validate: (things) => {
      debug('Validating things...')
      // Make a reporting object of arrays...
      const report = {
        valid: [],
        invalid: [],
        missingType: [],
        error: []
      }
      // Go through each thing and make sure it's valid...
      let index = 0
      things.forEach(thing => {
        try {
          // Try to validate the thing...
          if (typeof validate[thing.type] === 'undefined') {
            // debug(`Thing ${index}'s type (${thing.type}) doesn't exist'!`)
            report.missingType.push(thing)
            store.commit('config/error', `This version doesn't understand thing ${index}'s type ("${thing.type}").`)
          } else if (validate[thing.type][thing.version](thing)) {
            report.valid.push(thing)
          } else {
            console.warn(`Data object ${index} is invalid for the following reasons:`, validate[thing.type][thing.version].errors)
            report.invalid.push(thing)
            store.commit('config/error', `Data object ${index} is not a valid v${thing.version} ${thing.type}.`)
          }
        } catch (e) {
          report.error.push(thing)
          store.commit('config/error', `An error occurred trying to validate thing ${index} (${e.message})`)
        }
        index++
      })
      debug('Validation report:', util.omitBy(report, e => !e.length))
      return things
    }
  }
}

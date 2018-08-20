/*

Formats let clients customize our platform resources for their own purposes.

They are one of several advanced data manipulation tecniques that make our application invaluble to our customers,
allow us to develelop quickly, and make us billions of dollars. Please take your time in understanding how this works;
there is a lot of cool stuff compounded in a small space, and it might seem like magic unless you take it step by step.

Formats need a few things:

 */

import Ajv from 'ajv'
import { util } from 'experience-engine'
const validator = new Ajv({ allErrors: true })

import nbcuProductions from './productions/nbcu.json'
import nbcuDistributions from './distributions/nbcu.json'
import nbcuActivations from './activations/nbcu.json'
// import defaultSam from './activations/createActivations/defaultSAM.json'
import defaultExperienceApps from './experienceApps/defaultExperienceApps.json'
import defaultProductions from './productions/default.json'
import defaultActivations from './activations/default.json'
// vimport defaultCreateActivations from './activations/createActivations/createActivationsDefault.json'
import defaultDistributions from './distributions/default.json'
import mappingTransforms from './mappingTransforms'

// Attaches mapping transforms by name (this lets the formats exist in JSON and prevents hacking or the need for eval)...
function processFormat (format) {
  // Returns true if the data passed can be imported...
  function _canImport (data) {
    let keys = 0
    let matches = 0
    Object.keys(format.schemata.create).forEach(key => {
      keys++
      if (data[key]) matches++
    })
    if (keys === matches) return true
    return false
  }

  // Returns true if the data passed can be read by this format...
  function _isValid (data) {
    if (!format.validate(data)) return format.validate.errors
    return true
  }

  // Returns the imported version of the data...
  function _map (data) {
    return util.mapper(data, format.schemata.create)
  }

  // Map in all the mapping transforms by name...
  Object.keys(format.schemata.create).forEach(item => {
    let data = format.schemata.create[item]
    if (data.transform) {
      data.transform = util.get(mappingTransforms, data.transform)
    }
  })

  format.canImport = _canImport
  format.import = _map
  format.isValid = _isValid
  // Add a validator...
  format.validate = validator.compile(format.schemata.read)

  // We're ready to ship this format to the platform!
  return format
}

// Checks if this format can create resources from the data provided...

// Checks if this format matches the data provided...

const formats = {
  nbcuProductions: processFormat(nbcuProductions),
  nbcuDistributions: processFormat(nbcuDistributions),
  nbcuActivations: processFormat(nbcuActivations),
  // defaultCreateActivations: processFormat(defaultCreateActivations),
  defaultActivations: processFormat(defaultActivations),
  defaultDistributions: processFormat(defaultDistributions),
  defaultProductions: processFormat(defaultProductions),
  // defaultSam: processFormat(defaultSam),
  defaultExperienceApps: processFormat(defaultExperienceApps)
}
// console.log('FORMAT NBCU', formats['nbcuProductions'])

export default (dependancies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependancies
  const { Vue } = dependancies
  // Make it available on a shortcut...
  Vue.prototype.$formats = formats

  return formats
}

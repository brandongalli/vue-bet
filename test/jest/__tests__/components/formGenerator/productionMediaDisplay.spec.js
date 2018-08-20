import { mount } from '@vue/test-utils'

import productionMediaDisplay from "../../../../../src/components/admin/common/formGenerator/productionMediaDisplay";

import { localVue } from "../../../tools/QuasarComponents";

describe('test productionMediaDisplay.vue', () => {
  const Chance = require('chance')
  const chance = new Chance()
  let wrapper
  beforeEach(() => {
    wrapper = mount(productionMediaDisplay, {
      localVue
    })
  })

  test('test handle input', () => {
    //this is where the test for handle input will go. No test created yet as it only performs a debug.
  })
})

import { mount, createLocalVue } from '@vue/test-utils'

import singleChoice from "../../../../../src/components/admin/common/formGenerator/singleChoice";

import { util } from "experience-engine";

import state from "../../../../../src/store/config/state";

import { localVue } from "../../../tools/QuasarComponents";

describe('test singleChoice.view', () => {
  const Chance = require('chance')
  const chance = new Chance()
  let wrapper
  let value
  beforeEach(() => {
    value = chance.string();

    wrapper = mount(singleChoice, {
      localVue,
      mocks: {
        $common: { get: util.get },
        $app: state.app
      },
      propsData: {
        'value': value,
      }
    })
  })

  test('computedOptions',() => {
    wrapper.setProps({'options': 'test'})
    let ret = wrapper.vm.computedOptions
    expect(ret).toEqual(undefined)
  })

  test('emits event with one variable', () => {
    const emit = chance.string()
    wrapper.vm.handleInput(emit)
    expect(wrapper.emitted().input[0]).toStrictEqual([ emit ])
  })
})

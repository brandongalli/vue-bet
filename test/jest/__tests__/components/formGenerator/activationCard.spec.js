import {mount, shallowMount} from '@vue/test-utils'

import activationCard from '../../../../../src/components/admin/common/formGenerator/activationCard'

import { localVue } from "../../../tools/QuasarComponents";

describe('test activationCard.vue', () => {
  const Chance = require('chance')
  const chance = new Chance()

  test('q-card style attribute', () => {
    const wrapper = shallowMount(activationCard, {
      localVue,
      propsData: {
        'styleProp': "color: rebeccapurple"
      }
    })
    expect(wrapper.find('#SDformGeneratorActivationCard').attributes('style')).toStrictEqual("color: rebeccapurple;")
  })
  test('emits event with one variable', () => {
    const wrapper = mount(activationCard, {
      localVue
    })
    const emit = chance.string()
    wrapper.vm.handleInput(emit)
    expect(wrapper.emitted().input[0]).toStrictEqual([ emit ])
  })
})

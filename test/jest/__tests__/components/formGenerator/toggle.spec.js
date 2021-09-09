import { mount ,shallowMount } from '@vue/test-utils'

import toggle from "../../../../../src/components/admin/common/formGenerator/toggle";

import { localVue } from "../../../tools/QuasarComponents";

describe('Test Toggle', () => {
  const Chance = require('chance')
  const chance = new Chance()
  let wrapper
  let value
  let label
  let hint
  let type
  let labelColor
  let bgColor
  let prefix
  let suffix
  beforeEach(() => {
    value = chance.string()
    label = chance.string()
    hint = chance.string()
    type = chance.string()
    labelColor = chance.string()
    bgColor = chance.string()
    prefix = chance.string()
    suffix = chance.string()
    wrapper = shallowMount(toggle, {
      localVue,
      propsData: {
      'value': value,
      'label': label,
      'hint': hint,
      'type': type,
      'labelColor': labelColor,
      'bgColor': bgColor,
      'prefix': prefix,
      'suffix': suffix,
      }
    })
  })
  test('q-toggle attribute value', () => {
    expect(wrapper.find('#SDformGeneratorToggle').attributes('value')).toStrictEqual(value)
  })
  test('q-toggle attribute label', () => {
    expect(wrapper.find('#SDformGeneratorToggle').attributes('label')).toStrictEqual(label)
  })
  test('q-toggle attribute hint', () => {
    expect(wrapper.find('#SDformGeneratorToggle').attributes('hint')).toStrictEqual(hint)
  })
  test('q-toggle attribute type', () => {
    expect(wrapper.find('#SDformGeneratorToggle').attributes('type')).toStrictEqual(type)
  })
  test('q-toggle attribute label-color', () => {
    expect(wrapper.find('#SDformGeneratorToggle').attributes('label-color')).toStrictEqual(labelColor)
  })
  test('q-toggle attribute bg-color', () => {
    expect(wrapper.find('#SDformGeneratorToggle').attributes('bg-color')).toStrictEqual(bgColor)
  })
  test('q-toggle attribute prefix', () => {
    expect(wrapper.find('#SDformGeneratorToggle').attributes('prefix')).toStrictEqual(prefix)
  })
  test('q-toggle attribute suffix', () => {
    expect(wrapper.find('#SDformGeneratorToggle').attributes('suffix')).toStrictEqual(suffix)
  })
  test('test emit with one variable', () => {
    wrapper = mount(toggle, {
      localVue
    })
    const emit = chance.string()
    wrapper.vm.handleInput(emit)
    expect(wrapper.emitted().input[0]).toStrictEqual([ emit ])
  })
})

import {shallowMount} from '@vue/test-utils'

import fieldBorderlessWhite from "../../../../../src/components/admin/common/formGenerator/fieldBorderlessWhite";

import { localVue } from "../../../tools/QuasarComponents";

describe('test FieldBorderlessWhite.vue', () => {
  let wrapper
  const Chance = require('chance')
  const chance = new Chance()
  let value = chance.string()
  let label = chance.string()
  let hint = chance.string()
  let classData = chance.string()
  let type = chance.string()
  let labelColor = chance.string()
  let bgColor = chance.string()
  let prefix = chance.string()
  let suffix = chance.string()

  beforeEach(() => {
    wrapper = shallowMount(fieldBorderlessWhite, {
      localVue,
      propsData: {
        'value': value,
        'label': label,
        'hint': hint,
        'classData':classData,
        'type': type,
        'labelColor': labelColor,
        'bgColor': bgColor,
        'prefix': prefix,
        'suffix': suffix,
      }
    })
  })

  test('value attribute', () => {
    expect(wrapper.find('#SDformGeneratorFieldBorderlessWhite').attributes('value')).toStrictEqual(value)
  })
  test('label attribute', () => {
    expect(wrapper.find('#SDformGeneratorFieldBorderlessWhite').attributes('label')).toStrictEqual(label)
  })
  test('hint attribute', () => {
    expect(wrapper.find('#SDformGeneratorFieldBorderlessWhite').attributes('hint')).toStrictEqual(hint)
  })
  test('type attribute', () => {
    expect(wrapper.find('#SDformGeneratorFieldBorderlessWhite').attributes('type')).toStrictEqual(type)
  })
  test('labelColor attribute', () => {
    expect(wrapper.find('#SDformGeneratorFieldBorderlessWhite').attributes('labelcolor')).toStrictEqual(labelColor)
  })
  test('bgColor attribute', () => {
    expect(wrapper.find('#SDformGeneratorFieldBorderlessWhite').attributes('bgcolor')).toStrictEqual(bgColor)
  })
  test('prefix attribute', () => {
    expect(wrapper.find('#SDformGeneratorFieldBorderlessWhite').attributes('prefix')).toStrictEqual(prefix)
  })
  test('suffix attribute', () => {
    expect(wrapper.find('#SDformGeneratorFieldBorderlessWhite').attributes('suffix')).toStrictEqual(suffix)
  })
  test('handle input', () => {
    const emit = chance.string()
    wrapper.vm.handleInput(emit)
    expect(wrapper.emitted().input[0]).toStrictEqual([ emit ])
  })
})

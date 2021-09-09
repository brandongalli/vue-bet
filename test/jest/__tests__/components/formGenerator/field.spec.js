import { shallowMount } from '@vue/test-utils'

import field from "../../../../../src/components/admin/common/formGenerator/field";

import { localVue } from "../../../tools/QuasarComponents";

describe('field.vue', () => {
  const Chance = require('chance')
  const chance = new Chance()
  let wrapper
  let value
  let label
  let hint
  let classData
  let type
  let labelColor
  let bgColor
  let prefix
  let suffix
  let dark
  let filled
  let outlined
  let rounded
  let autogrow
  let dense
  beforeEach(() => {
    value = chance.string()
    label = chance.string()
    hint = chance.string()
    classData = chance.string()
    type = chance.string()
    labelColor = chance.string()
    bgColor = chance.string()
    prefix = chance.string()
    suffix = chance.string()
    dark = chance.bool()
    filled = chance.bool()
    outlined = chance.bool()
    rounded = chance.bool()
    autogrow = chance.bool()
    dense = chance.bool()
    wrapper = shallowMount(field, {
      localVue,
      propsData: {
      'value': value,
      'label': label,
      'hint': hint,
      'classData': classData,
      'type': type,
      'labelColor': labelColor,
      'bgColor': bgColor,
      'prefix': prefix,
      'suffix': suffix,
      'dark': dark,
      'filled': filled,
      'outlined': outlined,
      'rounded': rounded,
      'autogrow': autogrow,
      'dense': dense,
      }
    })
  })
  test('Handle Input should emit', () => {
    const emitString = chance.string()
    wrapper.vm.handleInput(emitString)
    expect(wrapper.emitted().input[0]).toStrictEqual([ emitString ])
  })
})

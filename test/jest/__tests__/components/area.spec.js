import { mount } from '@vue/test-utils'

import area from "../../../../src/components/admin/common/formGenerator/area";

import { localVue } from "../../tools/QuasarComponents"

describe('Test area.vue', () => {
  const Chance = require('chance')
  const chance = new Chance()
  let wrapper
  let value
  let image
  let label
  let caption
  beforeEach(() => {
    value = chance.string()
    image = chance.url()
    label = chance.string()
    caption = chance.string()
    wrapper = mount(area, {
      localVue,
      propsData: {
      'value': value,
      'image': image,
      'label': label,
      'caption': caption,
      }
    })
  })
  test('Check if label is correct', () => {
    expect(wrapper.find("#SDformGeneratorAreaLabel").text()).toStrictEqual(label)
  })
  test('check if caption is correct', () => {
    expect(wrapper.find("#SDformGeneratorAreaCaption").text()).toStrictEqual(caption)
  })
  test('check if avatar has correct source', () => {
    expect(wrapper.find("#SDformGeneratorAreaAvatar").attributes('src')).toStrictEqual(image)
  })
  test('If image prop is blank avatar should not exist', () => {
    wrapper = mount(area, {
      localVue,
      propsData: {
        'value': value,
        'image': "",
        'label': label,
        'caption': caption,
      }
    })
    expect(wrapper.find("#SDformGeneratorAreaAvatar")).not.exist
  })
})

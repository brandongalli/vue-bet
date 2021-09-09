import { shallowMount } from '@vue/test-utils'


import image from '../../../../src/components/admin/common/formGenerator/image'

import { localVue } from "../../tools/QuasarComponents";

const Chance = require('chance')
const chance = new Chance()

describe('image.vue', () => {
  const src = chance.url({extensions: ['gif', 'jpg', 'png']})
  const ratio = chance.integer() + '/' + chance.integer()
  const alt = chance.string()
  const contain = chance.bool().toString()
  const imageClass = chance.string()
  const position = chance.integer({min: 0, max: 100}) + '% ' + chance.integer({min: 0, max: 100}) + '%'
  const transition = chance.string()
  const style = "color: rebeccapurple"
  const sizes = chance.integer().toString()
  const width = chance.integer().toString()
  const height = chance.integer().toString()
  const placeholderSrc = chance.url({extensions: ['gif', 'jpg', 'png']})
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(image, {
      localVue,
      propsData: {
        'value': src,
        'ratio': ratio,
        'alt': alt,
        'contain': contain,
        'imageClass': imageClass,
        'position': position,
        'transition': transition,
        'styleProp': style,
        'sizes': sizes,
        'width': width,
        'height': height,
        'placeholderSrcProp': placeholderSrc
      }
    })
  })
  test('image attribute src', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('src')).toStrictEqual(src)
  })
  test('image attribute ratio', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('ratio')).toStrictEqual(ratio)
  })
  test('image attribute alt', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('alt')).toStrictEqual(alt)
  })
  test('image attribute contain', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('contain')).toStrictEqual(contain)
  })
  test('image attribute class', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('class')).toStrictEqual(imageClass)
  })
  test('image attribute position', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('position')).toStrictEqual(position)
  })
  test('image attribute transition', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('transition')).toStrictEqual(transition)
  })
  test('image attribute style', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('style')).toStrictEqual(style + ';')
  })
  test('image attribute sizes', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('sizes')).toStrictEqual(sizes)
  })
  test('image attribute width', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('width')).toStrictEqual(width)
  })
  test('image attribute height', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('height')).toStrictEqual(height)
  })
  test('image attribute placeholder-src', () => {
    expect(wrapper.find('#SDformGeneratorImage').attributes('placeholdersrc')).toStrictEqual(placeholderSrc)
  })
})

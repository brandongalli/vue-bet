import { shallowMount } from '@vue/test-utils'
import Modal from 'components/digitalMovieDeals/Modal/Modal'
import { localVue } from '../../../../tools/QuasarComponents'

const Chance = require('chance')
const chance = new Chance()

describe('test Modal', () => {
  let wrapper
  let mocks = {
    $emit: jest.fn(),
    $t: jest.fn(),
    $analytics: jest.fn(),
    $common: { constants: { events: { interact: 'foo' } } },
    showCart: false,
    prompt: false,
    color: 'black',
    timer: null,
    preview: false,
    showFAQ: false,
    $app: { settings: { logo: 'someurl.jpg' }, user: { cart: [] } }
  }
  beforeEach(() => {
    const getBoundingClientRectSpy = jest.fn(() => ({ width: 100 }))
    global.document.getElementById = jest.fn(() => ({ getBoundingClientRect: getBoundingClientRectSpy }))
    wrapper = shallowMount(Modal, {
      localVue,
      mocks: mocks
    })
  })
  test('viewCart', () => {
    const $emit = jest.spyOn(wrapper.vm, '$emit')
    wrapper.vm.prompt = true
    wrapper.vm.preview = true
    wrapper.vm.viewCart()
    expect(wrapper.vm.prompt).toEqual(false)
    expect(wrapper.vm.preview).toEqual(false)
    expect($emit).toBeCalledWith('viewCart')
  })
  test('onHide', () => {
    const $emit = jest.spyOn(wrapper.vm, '$emit')
    wrapper.vm.prompt = true
    wrapper.vm.onHide()
    expect($emit).toBeCalledWith('stopViewing')
  })
  test('hideAll', () => {
    const $emit = jest.spyOn(wrapper.vm, '$emit')
    wrapper.vm.prompt = true
    wrapper.vm.hideAll()
    expect($emit).toBeCalledWith('stopViewing')
  })
  test('toggleTimer', () => {
    jest.useFakeTimers()
    wrapper.vm.toggleTimer()
    expect(wrapper.vm.prompt).toEqual(true)
    jest.runAllTimers()
    expect(wrapper.vm.prompt).toEqual(false)
  })
  test('viewThing', async () => {
    const e = chance.string()
    const $emit = jest.spyOn(wrapper.vm, '$emit')
    wrapper.vm.viewThing(e)
    expect($emit).toBeCalledWith('viewThing', e)
  })
  test('btnPosition', () => {
    expect(Modal.computed.btnPosition.call()).toEqual({ width: 100 })
  })
})

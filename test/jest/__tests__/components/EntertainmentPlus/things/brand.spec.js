import { shallowMount } from '@vue/test-utils'
import brand from 'components/EntertainmentPlus/things/brand'
import SourceCode from 'components/sourceCode.vue'
import { localVue } from '../../../../tools/QuasarComponents'

const Chance = require('chance')
const chance = new Chance()

describe('test overlay', () => {
  const getElementById = jest.fn()
  global.document.getElementById = getElementById
  let wrapper
  let mocks = {
    $behavior: { exists:  jest.fn(() => { return true }) },
    $store: { dispatch: jest.fn() },
    $emit: jest.fn(),
    $pulse: jest.fn(),
    $analytics: jest.fn(),
    $common: { constants: { events: { action: 'foo' } } },
    videoB: { paused: true, play: jest.fn(), pause: jest.fn() },
    overlayDisplay: false
  }
  beforeEach(() => {
    wrapper = shallowMount(brand, {
      localVue,
      mocks: mocks,
      components: { SourceCode },
      propsData: {
        thing: {
          id: 1,
          '@type': 'brand',
          settings: {
            details: {
              brand: {
                logo: chance.string(),
                slogan: chance.string(),
                video: chance.string(),
                mainVideo: chance.string(),
                mainImage: chance.string(),
                description: chance.string(),

              },
              handler: {
                display: true,
                override: true,
                redirectUrl: chance.string(),
                text: chance.string(),
                class: "",
                backgroundColor: '#dedede',
                color: '#0f0f0f',
                backgroundCardColor: '#f2f2f2',
              }
            }
          }
        }
      },
    })
  })
  test('mounted', () => {
    const app = { $emit: jest.fn() }
    brand.mounted.call(app)
    expect(app.$emit).toBeCalledWith('loaded')
  })
  test('linkClick', () => {
    const $emit = jest.spyOn(wrapper.vm, '$emit')
    wrapper.vm.linkClick()
    expect(wrapper.vm.$pulse).toBeCalledWith('activationAction', { id: 1 })
    expect(wrapper.vm.$analytics).toBeCalledWith('foo')
    expect($emit).toBeCalledWith('linkDialog', wrapper.vm.thing.settings.details.handler.redirectUrl)
  })
  test('videoToggle', () => {
    let mocks = {
      videoB: {
        paused: true,
        play: jest.fn(),
        pause: jest.fn()
      },
      overlayDisplay: '',
    }
    brand.methods.videoToggle.call(mocks)
    expect(mocks.videoB.play).toBeCalled()
    expect(mocks.overlayDisplay).toEqual(true)
    mocks.videoB.paused = false
    brand.methods.videoToggle.call(mocks)
    expect(mocks.videoB.pause).toBeCalled()
    expect(mocks.overlayDisplay).toEqual(false)
  })
  test('videoB', () => {
    global.document.getElementById = jest.fn().mockReturnValue('sdVideoB')
    const returned  = brand.computed.videoB.call()
    expect(document.getElementById).toBeCalledWith('sdVideoB')
    expect(returned).toEqual('sdVideoB')
  })
  test('cssVars', () => {
    const e = { thing: { settings: { details: { handler: { backgroundColor: 'blue', color: 'red' }}}}}
    expect(brand.computed.cssVars.call(e)).toEqual({'background-color': 'blue', 'color': 'red'})
  })
  test('cardCssVar', () => {
    const e = { thing: { settings: { details: { handler: { backgroundCardColor: 'red' }}}}}
    expect(brand.computed.cardCssVars.call(e)).toEqual({'background-color': 'red'})
  })
})

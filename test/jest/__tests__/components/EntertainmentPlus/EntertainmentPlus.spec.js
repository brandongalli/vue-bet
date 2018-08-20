import { shallowMount } from '@vue/test-utils'
import EntertainmentPlus from 'components/EntertainmentPlus/EntertainmentPlus'
import debug from 'components/debug'
import Vuex from 'vuex'
import { localVue } from '../../../tools/QuasarComponents'

const behavior = require('../../../../../src/boot/common/behavior')
localVue.use(Vuex)

import { JSDOM } from 'jsdom'

const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

describe('test EntertainmentPlus', () => {
  let wrapper
  const store = new Vuex.Store({
    state: { config: { app: { settings: {}, content: { media: {} } } }, events: { media: { forEach: jest.fn() } } }
  })
  beforeEach(() => {
    localStorage.clear()
    wrapper = shallowMount(EntertainmentPlus, {
      localVue,
      mocks: {
        $playerjs: jest.fn(),
        $q: { cookies: { remove: jest.fn() } },
        debug: jest.fn(),
        $app: { 
          user: { activity: { lookingAt: { thing: { id: 1, dataObject: { data: { externalProductId: '' } } } } } },
          settings: { debug: { inline: true } }
        },
        $behavior: behavior.default({ store: store, Vue: localVue }),
        thing: {
          dataObject: { data: { detailViewIframeSrc: true } },
          dataTypeName: 'product',
          mapped: true
        },
        show: {
          settings: false,
          login: false,
          register: false,
          userProfile: true,
          filterDialog: false,
          cart: true,
          details: false
        },
        $analytics: jest.fn(),
        $common: { constants: { events: { interact: 'foo' } }, media: { ref: { pause: jest.fn() } }, get: jest.fn() },
        $store: { dispatch: jest.fn(), commit: jest.fn() },
        $router: { push: jest.fn() },
        login: false,
        $emit: jest.fn(),
        searchItem: true,
        regStatus: false,
        $event: { emit: jest.fn() }
      },
      stubs: { debug: debug }
    })
  })
  test('showEvents', () => {
    const show = { show: { details: false, cart: false } }
    expect(EntertainmentPlus.computed.showEvents.call(show)).toEqual(true)
    show.show.details = true
    expect(EntertainmentPlus.computed.showEvents.call(show)).toEqual(false)
    show.show.details = false
    show.show.cart = true
    expect(EntertainmentPlus.computed.showEvents.call(show)).toEqual(false)
    show.show.details = true
    expect(EntertainmentPlus.computed.showEvents.call(show)).toEqual(false)
  })
  test('showCart', () => {
    const show = { show: { details: false, cart: false } }
    expect(EntertainmentPlus.computed.showCart.call(show)).toEqual(false)
    show.show.cart = true
    expect(EntertainmentPlus.computed.showCart.call(show)).toEqual(true)
    show.show = {}
    expect(EntertainmentPlus.computed.showCart.call(show)).toEqual(false)
  })
  test('showDetails', () => {
    const app = {
      $app: { user: { activity: { lookingAt: { thing: 'test' } } } },
      $emit: jest.fn()
    }
    expect(EntertainmentPlus.computed.showDetails.call(app)).toEqual('test')
    expect(app.$emit).toBeCalledWith('isShowDetails', 'test')
  })
  test('lookingAtSomething', () => {
    const app = {
      $app: { user: { activity: { lookingAt: { thing: 'test' } } } },
      $emit: jest.fn()
    }
    expect(EntertainmentPlus.computed.lookingAtSomething.call(app)).toEqual(true)
    app.$app.user.activity.lookingAt = {}
    expect(EntertainmentPlus.computed.lookingAtSomething.call(app)).toEqual(false)
  })
  test('toggleProxy', () => {
    const show = { show: { proxy: false } }
    EntertainmentPlus.events.toggleProxy.call(show)
    expect(show.show.proxy).toEqual(true)
  })
  test('handleFabAction admin', () => {
    wrapper.vm.handleFabAction('admin')
    expect(wrapper.vm.$router.push).toBeCalledWith({name: 'adminDistribution'})
  })
  test('handleFabAction login', () => {
    wrapper.vm.handleFabAction('login')
    expect(wrapper.vm.show.login).toEqual(true)
  })
  test('handleFabAction register', () => {
    wrapper.vm.handleFabAction('register')
    expect(wrapper.vm.show.register).toEqual(true)
  })
  test('handleFabAction logout', () => {
    const action = 'logout'
    const userLogout = jest.spyOn(wrapper.vm, 'userLogout')
    wrapper.vm.handleFabAction(action)
    expect(userLogout).toHaveBeenCalled()
    expect(Object.keys(localStorage.__STORE__).length).toEqual(3)
    expect(localStorage.__STORE__).toEqual({'loginId': '', 'email': '', 'mobile': ''})
    expect(localStorage.removeItem).toBeCalledWith('token')
  })
  test('handleFabAction cart', () => {
    wrapper.vm.handleFabAction('cart')
    expect(wrapper.vm.show.cart).toEqual(true)
  })
  test('handleFabAction profile', () => {
    const $emit = jest.spyOn(wrapper.vm, '$emit')
    wrapper.vm.handleFabAction('profile')
    expect($emit).toBeCalledWith('showProfile', true)
  })
  test('handleFabAction filter', () => {
    wrapper.vm.handleFabAction('filter')
    expect(wrapper.vm.show.filterDialog).toEqual(true)
  })
  test('userLogin', () => {
    wrapper.vm.userLogin()
    expect(wrapper.vm.login).toEqual(true)
  })
  test('userLogout', () => {
    const app = {
      $q: { cookies: { remove: jest.spyOn(wrapper.vm.$q.cookies, 'remove') } },
      $emit: jest.spyOn(wrapper.vm, '$emit'),
      $store: { dispatch: jest.spyOn(wrapper.vm.$store, 'dispatch') }
    }
    wrapper.vm.userLogout.call(app)
    expect(Object.keys(localStorage.__STORE__).length).toEqual(3)
    expect(localStorage.__STORE__).toEqual({'loginId': '', 'email': '', 'mobile': ''})
    expect(localStorage.removeItem).toBeCalledWith('token')
    expect(app.$q.cookies.remove).toBeCalledWith('jwt')
    expect(app.$emit).toBeCalledWith('showProfile', false)
    expect(app.$store.dispatch).toBeCalledWith('config/logout')
  })
  test('setAction login', () => {
    wrapper.vm.setAction('login')
    expect(wrapper.vm.show.login).toEqual(true)
  })
  test('setAction register', () => {
    wrapper.vm.setAction('register')
    expect(wrapper.vm.show.register).toEqual(true)
  })
  test('async handleAction', async () => {
    const fabAction = { handleFabAction: jest.fn() }
    await EntertainmentPlus.events.handleAction.call(fabAction)
    expect(fabAction.handleFabAction).toBeCalledTimes(1)
  })
  test('processStatus', () => {
    wrapper.vm.show.register = true
    wrapper.vm.processStatus(true)
    expect(wrapper.vm.show.register).toEqual(false)
    expect(wrapper.vm.show.login).toEqual(true)
    expect(wrapper.vm.regStatus).toEqual(true)
  })
  test('triggerCart', () => {
    const sVT = jest.spyOn(wrapper.vm, 'stopViewingThing')
    wrapper.vm.triggerCart()
    expect(sVT).toHaveBeenCalled()
    expect(wrapper.vm.show.cart).toEqual(true)
  })
  test('viewThing', () => {
    // disabled - not being used
    // const listOfElements = []
    // const spy = jest.spyOn(document, 'getElementsByClassName')
    // const mockElement = document.createElement('div')
    // mockElement.className = 'q-notifications'
    // mockElement.style.display = ''
    // listOfElements.push(mockElement)
    // spy.mockReturnValue(listOfElements)
    const e = { id: 1, dataObject: { data: { externalProductId: '' } } }
    wrapper.vm.viewThing(e)
    expect(wrapper.vm.$playerjs).toBeCalledWith('activation', { id: 1, event: 'clicked' })
    expect(wrapper.vm.$store.commit).toBeCalledWith('config/viewThing', { id: 1, dataObject: { data: { externalProductId: '' } } })
    e.id = null
    e.dataObject.data.externalProductId = 5
    wrapper.vm.viewThing(e)
    expect(wrapper.vm.$playerjs).toBeCalledWith('activation', { id: 5, event: 'clicked' })
    // expect(mockElement.style.display).toEqual('none')
  })
  test('stopViewingThing', () => {
    // disabled - not being used
    // const listOfElements = []
    // const spy = jest.spyOn(document, 'getElementsByClassName')
    // const mockElement = document.createElement('div')
    // mockElement.className = 'q-notifications'
    // mockElement.style.display = ''
    // listOfElements.push(mockElement)
    // spy.mockReturnValue(listOfElements)
    // const e = { id: 1, dataObject: { data: { externalProductId: '' } } }
    wrapper.vm.stopViewingThing()
    expect(wrapper.vm.$playerjs).toBeCalledWith('activation', { id: 1, event: 'closed' })
    expect(wrapper.vm.$store.commit).toBeCalledWith('config/stopViewingThing')
    wrapper.vm.$app.user.activity.lookingAt.thing.id = null
    wrapper.vm.$app.user.activity.lookingAt.thing.dataObject.data.externalProductId = 5
    wrapper.vm.stopViewingThing()
    expect(wrapper.vm.$playerjs).toBeCalledWith('activation', { id: 5, event: 'closed' })
    // expect(mockElement.style.display).toEqual('block')
  })
  test('closeCart', () => {
    wrapper.vm.closeCart()
    expect(wrapper.vm.show.cart).toEqual(false)
  })
  test('mounted', () => {
    const app = {
      searchItem: 'foo',
      $common: { get: jest.fn() },
      $store: { commit: jest.fn() },
      $app: { user: 'bar' }
    }
    EntertainmentPlus.mounted.call(app)
    expect(app.$store.commit).toBeCalledWith('config/setThing', 'foo')
    expect(app.$common.get).toBeCalledWith('bar', 'settings.language.value')
  })
  test('watch >> showDetails', () => {
    const app = {
      $common: { media: { ref: { playing: true, pause: jest.fn(), play: jest.fn() } } },
      $behavior: { doesntExist: jest.fn() },
      wasPlaying: false,
      show: { details: false }
    }
    const v = true
    app.$behavior.doesntExist.mockReturnValue(true)
    EntertainmentPlus.watch.showDetails.call(app, v)
    expect(app.wasPlaying).toEqual(true)
    expect(app.$common.media.ref.pause).toHaveBeenCalled()
    app.wasPlaying = true
    EntertainmentPlus.watch.showDetails.call(app, false)
    expect(app.wasPlaying).toEqual(false)
    expect(app.$common.media.ref.play).toHaveBeenCalled()
  })
  test('watch >> searchItem', () => {
    const app = {
      $app: { user: { activity: { lookingAt: { thing: 'foo' } } } },
      debug: jest.fn(),
      $store: { commit: jest.fn() }
    }
    const v = 'bar'
    EntertainmentPlus.watch.searchItem.call(app, v)
    expect(app.debug).toBeCalledWith('foo', 'Thing')
    expect(app.$store.commit).toBeCalledWith('config/setThing', 'bar')
  })
})


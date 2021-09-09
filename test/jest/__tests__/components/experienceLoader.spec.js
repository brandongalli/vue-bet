import { mount } from "@vue/test-utils";

import experienceLoader from "../../../../src/components/experienceLoader";

import EntertainmentPlus from "../../../../src/components/EntertainmentPlus/EntertainmentPlus";

import Announcements from '../../../../src/components/announcements'

import CartBadge from "../../../../src/components/EntertainmentPlus/CartBadge";

import admin from "../../../../src/components/templates/admin";

import { debug } from 'experience-engine'

import Debug from "../../../../src/components/debug";

import Vuex from "vuex";

import { localVue } from "../../tools/QuasarComponents";

localVue.use(Vuex)

describe('test loader', () => {
  const store = new Vuex.Store({
    state: { config: {
        app: {
          settings: {},
          content: {
            type: 'admin',
            media: {}
          }
        }
      }
    },
    dispatch: jest.fn()
  })
  let wrapper
  beforeEach(() => {
    wrapper = mount(experienceLoader, {
      localVue,
      components: {
        EntertainmentPlus,
        Announcements,
        CartBadge,
        admin
      },
      mocks: {
        $app: {
          content: {
            type: 'admin'
          },
          events: {
            forEach: jest.fn()
          },
          settings: {
            debug: {
              inline: true
            }
          }
        },
        $store: store,
        debug: debug,
        $route: {
          params: {
            activationId: 12
          }
        },
        activationId: 20,
        contentReady: false,
        $playerjs: {
          ready: jest.fn()
        },
        $pulse: jest.fn(),
        $event: {
          emit: jest.fn()
        },
        showDetails: false,
        showUserProfile: false,
        showingCart: false
      },
      stubs: {
        debug: Debug,
        portalTarget: `<div></div>`
      }
    })
  })
  test('fullscreenDetails', () => {
    let container = {container: { width: 800 }, dest: 'overlay', showDetails:true}
    expect(experienceLoader.computed.fullscreenDetails.call(container)).toEqual('width:100%!important')
    container.container.width = 900
    expect(experienceLoader.computed.fullscreenDetails.call(container)).toEqual(null)
    container.container.width = 800
    container.dest = null
    expect(experienceLoader.computed.fullscreenDetails.call(container)).toEqual(null)
    container.dest = 'overlay'
    container.container.width = 800
    container.showDetails = false
    expect(experienceLoader.computed.fullscreenDetails.call(container)).toEqual(null)
  })
  test('container', () => {
    const container = {$q: {
        screen: {
          height: 500,
          width: 200
        }
      }
    }
    expect(experienceLoader.computed.container.call(container)).toEqual({height: 500, width: 200})
  })
  test('underlayHeight', () => {
    const container = {container: {
        height: 500
      },
      videoHeight: 200,
      $store: {
        dispatch: jest.fn()
      },
      $q: {
        screen: {
          width: 500
        }
      }
    }
    expect(experienceLoader.computed.underlayHeight.call(container)).toEqual(300)
  })
  test('dest', () => {
    let container = { isFullscreen: true }
    expect(experienceLoader.computed.dest.call(container)).toEqual('overlay')
    container.isFullscreen = false
    container.underlayHeight = 600
    container.container = {}
    container.container.height = 600
    expect(experienceLoader.computed.dest.call(container)).toEqual('footer')
    container.underlayHeight = 200
    container.container.height = 600
    expect(experienceLoader.computed.dest.call(container)).toEqual('overlay')
    container.container = {}
    expect(experienceLoader.computed.dest.call(container)).toEqual('overlay')
  })
  test('debugTime', () => {
    const container = {$app: {
        content: {
          currentTime: '14560'
        }
      }
    }
    expect(experienceLoader.computed.debugTime.call(container)).toEqual('04:02:40:000+14560')
  })
  test('showEntertainmentPlus', () => {
    const q = {
      $q: {
        platform: {
          is: {
            mobile: true
          }
        }
      },
      dest: 'footer'
    }
    expect(experienceLoader.computed.showEntertainmentPlus.call(q)).toEqual(true)
  })
  test('contentReady', () => {
    const isReady = {contentReady: false}
    experienceLoader.events.contentReady.call(isReady)
    expect(isReady.contentReady).toEqual(true)
  })
  test('contentEnterFullscreen', () => {
    const fullscreen = {isFullscreen: false}
    experienceLoader.events.contentEnterFullscreen.call(fullscreen)
    expect(fullscreen.isFullscreen).toEqual(true)
  })
  test('contentExitFullscreen', () => {
    const fullscreen = {isFullscreen: true}
    experienceLoader.events.contentExitFullscreen.call(fullscreen)
    expect(fullscreen.isFullscreen).toEqual(false)
  })
  test('clearActivationId', () => {
    const activation = {
      activationId: 12
    }
    experienceLoader.events.clearActivationId.call(activation)
    expect(activation.activationId).toBe(null)
  })
  test('mouseover', () => {
    wrapper.vm.mouseover('test')
    expect(wrapper.vm.$pulse).toBeCalledWith('focusOnMedia', 'test')
  })
  test('mouseleave', () => {
    wrapper.vm.mouseleave('test')
    expect(wrapper.vm.$pulse).toBeCalledWith('focusOffMedia', 'test')
  })
  test('action', () => {
    wrapper.vm.action('test')
    expect(wrapper.vm.$event.emit).toBeCalledWith('handleAction', 'test')
  })
  test('isShowDetails', () => {
    wrapper.vm.isShowDetails(true)
    expect(wrapper.vm.showDetails).toEqual(true)
    wrapper.vm.isShowDetails(false)
    expect(wrapper.vm.showDetails).toEqual(false)
  })
  test('showProfile', () => {
    wrapper.vm.showProfile(true)
    expect(wrapper.vm.showUserProfile).toEqual(true)
    wrapper.vm.showProfile(false)
    expect(wrapper.vm.showUserProfile).toEqual(false)
  })
  test('isShowingCart', () => {
    wrapper.vm.isShowingCart(true)
    expect(wrapper.vm.showingCart).toEqual(true)
    wrapper.vm.isShowingCart(false)
    expect(wrapper.vm.showingCart).toEqual(false)
  })
})


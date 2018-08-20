import {shallowMount, createLocalVue} from "@vue/test-utils";

import Vuex from 'vuex'

import debug from "../../../../../src/components/debug";

import state from "../../../../../src/store/config/state";

const behavior = require('../../../../../src/boot/common/behavior')

import video from "../../../../../src/components/templates/video";

import { localVue } from "../../../tools/QuasarComponents";

localVue.use(Vuex)

describe('test video.vue', () => {
  const store = new Vuex.Store({
    state: { config: {
        app: {
          settings: {},
          content: {
            media: {}
          }
        }
      },
      events: {
        media: ['test','test2', 'test3']
      },
      layout: {
        mobileOrientation: true
      }
    }
  })
  const media = require('../../../../../src/boot/common/media').default({})
  const common = {media: media}
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(video, {
      localVue,
      propsData: {
        searchItem: true
      },
      mocks: {
        debug: jest.fn(),
        $app: {
          settings: {
            debug: {
              enabled: false
            }
          },
          content: {
            media: {}
          },
          data: {
            distribution: {
              production: null
            }
          },
          session: {
            invisibleEvents: null
          },
          layout: {
            mobileOrientation: null
          }
        },
        $behavior: behavior.default({
          store: store,
          Vue: localVue
        }),
        $common: common,
        $store: store,
        player: {
          on: jest.fn(),
          play: jest.fn(),
          pause: jest.fn(),
          off: jest.fn(),
          once: jest.fn(),
          forward: jest.fn()
        },
        $event: {
          emit: jest.fn()
        },
        $playerjs: jest.fn(),
        ready: false,
        $q: {
          notify: jest.fn(),
          platform: {
            is: {
              ios: true,
              mobile: false
            }
          }
        },
        $t: jest.fn(),
        $refs: {
          plyr: {
            player: true
          }
        },
        playback: false,
        searchItem: {
          startTimeMs: 6000
        },
        $pulse: jest.fn(),
      },
      stubs: {
        debug: debug,
        vuePlyr: `<div></div>`
      }
    })
  })
  test('handleContentReady', () => {
    wrapper.vm.handleContentReady()
    expect(wrapper.vm.$event.emit).toBeCalledWith('contentReady')
    expect(wrapper.vm.$playerjs).toBeCalledWith('ready')
  })
  test('handleContentEnterFullscreen', () => {
    wrapper.vm.handleContentEnterFullscreen()
    expect(wrapper.vm.ready).toEqual(true)
    expect(wrapper.vm.$event.emit).toBeCalledWith('contentEnterFullscreen')
  })
  test('handleContentExitFullscreen', () => {
    wrapper.vm.handleContentExitFullscreen()
    expect(wrapper.vm.ready).toEqual(true)
    expect(wrapper.vm.$event.emit).toBeCalledWith('contentExitFullscreen')
  })
  test('onVideoPause', () => {
    const notifyVars = {
      message: wrapper.vm.$t('disabledPause'),
      type: 'negative',
      position: 'center',
      timeout: 1200,
      badgeClass: 'hidden'
    }
    wrapper.vm.onVideoPause('test')
    expect(wrapper.vm.player.play).toBeCalled()
    expect(wrapper.vm.$q.notify).toBeCalledWith(notifyVars)
  })
  test('togglePlayback', () => {
    wrapper.vm.togglePlayback()
    expect(wrapper.vm.playback).toEqual(true)
    expect(wrapper.vm.debug).toBeCalledWith('playing toggleplayback')
    expect(wrapper.vm.player.play).toBeCalled()
    wrapper.vm.playback = true
    wrapper.vm.togglePlayback()
    expect(wrapper.vm.playback).toEqual(false)
    expect(wrapper.vm.player.pause).toBeCalled()
  })
  test('handlePostMessage', () => {
    const expected = JSON.stringify({
      method: 'fullscreen',
      context: 'player.js',
      value: 'test',
      ios: true
    })
    expect(wrapper.vm.handlePostMessage('test')).toEqual(expected)
  })
  test('beforeDestroy', () => {
    const debug = jest.spyOn(wrapper.vm, 'debug')
    const player = jest.spyOn(wrapper.vm.player, 'off')
    wrapper.destroy()
    expect(debug).toBeCalledWith('video template unmounted')
    expect(player).toBeCalledTimes(6)
  })
  test('player', () => {
    const data = {$refs: {
        plyr: {
          player: true
        }
      }
    }
    expect(video.computed.player.call(data)).toEqual(true)
  })
  test('controls', () => {
    const data = {
      $behavior: wrapper.vm.$behavior,
      $q: wrapper.vm.$q
    }
    let controls = `
              <button type="button" class="plyr__control plyr__control--overlaid" onclick="SourceDigital.event.emit('togglePlay')" aria-label="Play"><svg role="presentation" focusable="false"><use xlink:href="#plyr-play"></use></svg><span class="plyr__sr-only">Play</span></button>
              <div class="plyr__controls">
                  ${wrapper.vm.$q.platform.is.mobile ? '' : `<button type="button" class="plyr__controls__item plyr__control" aria-label="Play, {title}" data-plyr="play">
                      <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
                      <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
                  </button>`}
                  <div class="plyr__controls__item plyr__volume sdVolumeBtnContainer">
                    <button type="button" class="plyr__control sdVolumeBtn" data-plyr="mute"><svg class="icon--pressed" aria-hidden="true" focusable="false"><use xlink:href="#plyr-muted"></use></svg><svg class="icon--not-pressed" aria-hidden="true" focusable="false"><use xlink:href="#plyr-volume"></use></svg></button>
                  </div>
                  ${wrapper.vm.$q.platform.is.mobile ? '<div style="width:10px;"></div>' : `<div class='plyr__controls__item plyr__volume sdVolumeRange'><input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume"> </div>`}
                  ${wrapper.vm.$behavior.exists('hideProgressBar') ? '' : `<div class="plyr__controls__item plyr__progress__container">
                    <div class="plyr__progress">
                      <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                      <progress class="plyr__progress__buffer" min="0" max="100" value="0" role="progressbar" aria-hidden="true">% buffered</progress>
                      <span role="tooltip" class="plyr__tooltip">00:00</span>
                    </div>
                  </div>`}
                  <div class="plyr__controls__item plyr__time--current plyr__time" aria-label="Current time">00:00</div>
                  <button type="button" class="plyr__controls__item plyr__control" data-plyr="captions">
                      <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
                      <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
                  </button>
                  ${wrapper.vm.$q.platform.is.ios ? '' : `<button type="button" class="plyr__controls__item plyr__control" data-plyr="fullscreen">
                      <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
                      <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
                  </button>`}
                  ${wrapper.vm.$behavior.exists('fab') ? '' : `<button type="button" class="plyr__controls__item plyr__control" id="sd-proxyMenu" onclick="SourceDigital.event.emit('callingProxy', event)">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52" height="52" viewBox="0 0 226 226" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,226v-226h226v226z" fill="none"></path><g fill="#ffffff"><path d="M73.88462,17.38462c-7.19832,0 -13.03846,5.84014 -13.03846,13.03846v108.65385l-17.58834,-24.07362c-5.22897,-8.04717 -15.41527,-10.76352 -22.88522,-6.14573c-7.40204,4.71964 -9.26953,14.97386 -4.10847,23.02103c0,0 28.38582,42.95222 40.50751,61.35547c12.08774,18.36929 31.67938,32.76592 68.31611,32.76592c60.71034,0 66.14303,-46.85697 66.14303,-60.84615v-56.5c0,-7.19832 -5.84014,-13.03846 -13.03846,-13.03846c-7.19832,0 -13.03846,5.84014 -13.03846,13.03846c0,2.41076 -1.93539,4.34615 -4.34615,4.34615c-2.41076,0 -4.34615,-1.93539 -4.34615,-4.34615v-8.69231c0,-7.19832 -5.84014,-13.03846 -13.03846,-13.03846c-7.19832,0 -13.03846,5.84014 -13.03846,13.03846c0,2.37681 -1.96935,4.34615 -4.34615,4.34615c-2.3768,0 -4.34615,-1.96935 -4.34615,-4.34615c0,-7.19832 -5.84014,-13.03846 -13.03846,-13.03846c-7.19832,0 -13.03846,5.84014 -13.03846,13.03846c0,2.37681 -1.96935,4.34615 -4.34615,4.34615c-2.3768,0 -4.34615,-1.96935 -4.34615,-4.34615v-69.53846c0,-7.19832 -5.84014,-13.03846 -13.03846,-13.03846z"></path></g></g></svg>
                  </button>`}
              </div>
              `
    expect(video.computed.controls.call(data)).toEqual(controls)
  })
  test('playerClasses', () => {
    const data = {preventPause: true, $behavior: wrapper.vm.$behavior}
    expect(video.computed.playerClasses.call(data)).toEqual({'pointer-events-none': true, 'plyr--init-hide-controls': false})
  })
  test('playerControls', () => {
    const data = {
      $behavior: wrapper.vm.$behavior
    }
    expect(video.computed.playerControls.call(data)).toEqual([
      'play-large',
      'play',
      'current-time',
      'mute',
      'volume',
      'settings',
      'airplay',
      'progress',
      'fullscreen'
    ])
    data.$behavior = {exists: jest.fn().mockReturnValueOnce(true)}
    expect(video.computed.playerControls.call(data)).toEqual([
      'play-large',
      'play',
      'current-time',
      'mute',
      'volume',
      'settings',
      'airplay',
      'fullscreen'
    ])
  })
  test('playerjs_play', () => {
    const data = {debug: jest.fn()}
    video.events.playerjs_play.call(data)
    expect(data.debug).toBeCalledWith('playerjs_play')
  })
  test('playerjs_pause', () => {
    const data = {debug: jest.fn()}
    video.events.playerjs_pause.call(data)
    expect(data.debug).toBeCalledWith('playerjs_pause')
  })
  test('playerjs_mute', () => {
    const data = {debug: jest.fn()}
    video.events.playerjs_mute.call(data)
    expect(data.debug).toBeCalledWith('playerjs_mute')
  })
  test('playerjs_unmute', () => {
    const data = {debug: jest.fn()}
    video.events.playerjs_unmute.call(data)
    expect(data.debug).toBeCalledWith('playerjs_unmute')
  })
  test('playerjs_setVolume', () => {
    const data = {
      debug: jest.fn()
    }
    video.events.playerjs_setVolume.call(data, {v: 10})
    expect(data.debug).toBeCalledWith('playerjs_setVolume', 10)
  })
  test('playerjs_getVolume', () => {
    const data = {
      player: {
        volume: 90
      },
      debug: jest.fn()
    }
    video.events.playerjs_getVolume.call(data)
    expect(data.debug).toBeCalledWith('playerjs_getVolume', 90)
  })
  test('playerjs_getLoop', () => {
    const data = {
      player: {
        loop: true
      },
      debug: jest.fn()
    }
    video.events.playerjs_getLoop.call(data)
    expect(data.debug).toBeCalledWith('playerjs_getLoop', true)
  })
  test('playerjs_setLoop', () => {
    const data = {
      player: {
        loop: null
      },
      debug: jest.fn()
    }
    video.events.playerjs_setLoop.call(data, true)
    expect(data.player.loop).toEqual(true)
    expect(data.debug).toBeCalledWith('playerjs_setLoop', true)
  })
  test('playerjs_getMuted', () => {
    const data = {
      player: {
        volume: 0
      },
      debug: jest.fn()
    }
    video.events.playerjs_getMuted.call(data)
    expect(data.debug).toBeCalledWith('playerjs_getMuted', true)
    data.player.volume = 100
    video.events.playerjs_getMuted.call(data)
    expect(data.debug).toBeCalledWith('playerjs_getMuted', false)
  })
  test('playerjs_getDuration', () => {
    const data = {
      debug: jest.fn()
    }
    video.events.playerjs_getDuration.call(data, {duration: 1234})
    expect(data.debug).toBeCalledWith('playerjs_getDuration', 1234)
  })
  test('mobileOrientation', () => {
    const data = {
      ready: true,
      $q: {
        platform: {
          is: {
            mobile: true
          }
        }
      },
      mobileOrientation: null,
      debug: jest.fn()
    }
    video.events.mobileOrientation.call(data, 'portrait')
    expect(data.debug).toBeCalledWith('mobileOrientation (portrait)')
    expect(data.mobileOrientation).toEqual('portrait')
    video.events.mobileOrientation.call(data, 'landscape')
    expect(data.debug).toBeCalledWith('mobileOrientation (landscape)')
    expect(data.mobileOrientation).toEqual('landscape')
  })
})

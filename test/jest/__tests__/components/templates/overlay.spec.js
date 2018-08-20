import { shallowMount } from "@vue/test-utils";
import { localVue } from "../../../tools/QuasarComponents";
import Overlay from "../../../../../src/components/templates/overlay.vue";
import Vuex from "vuex";
const behavior = require("../../../../../src/boot/common/behavior/index");
const video = `<video controls><source src='' type='video/mp4' /></video>`;
import debug from "../../../../../src/components/debug.vue";
import {Quasar, QResponsive} from 'quasar'
const EventEmitter2 = require('eventemitter2')
const event = new EventEmitter2({
  wildcard: true,
  maxListeners: 20,
  verboseMemoryLeak: true
})
localVue.use(Vuex);
localVue.prototype.$event = event
describe("testing overlay", () => {
  let wrapper;
  let set;
  let playerjsEvents;
  let debugStatus;
  const plyr = {
    player: {
      currentTime: 2100
    },
    $set: jest.fn(),
    $playerjs: jest.fn()
  }
  let store = new Vuex.Store({
    state: {
      config: {
        app: {
          settings: {},
          content: {
            media: {}
          }
        }
      },
      events: {
        media: {
          forEach: jest.fn()
        }
      }
    },
    events: {}
  });
  beforeEach(() => {
    set = {}
    playerjsEvents = {}
    wrapper = shallowMount(Overlay, {
      propsData: {
        searchItem: "",
        fullscreenDetails: ""
      },
      stubs: {
        debug: debug,
        'q-responsive': QResponsive
      },
      mocks: {
        $app: {
          session: {
            invisibleEvents: {}
          },
          layout: {
            orientation: "landscape"
          },
          settings: {
            ratio: "16/9",
            debug: {
              enabled: false
            }
          }
        },
        $common: {
          media: {
            ref: video
          }
        },
        $playerjs: (event, data) => {
          playerjsEvents = { event, data }
        },
        $set: (...args) => {
          console.log({ ...args })
        },
        $event: {
          emit: jest.fn()
        },
        debug: (e) => { debugStatus = e},
        $behavior: behavior.default({ store: store, Vue: localVue })
      }
    });
  });

  test('handleClickEvent', () => {
    const event = { clientX: 100, clientY: 200}
    wrapper.vm.handleClick(event)
    expect(playerjsEvents.event).toStrictEqual('click')
    expect(playerjsEvents.data.x).toBe(100)
    expect(playerjsEvents.data.y).toBe(200)
  })

  test('changeCurrentTime', () => {
    wrapper.vm.changeCurrentTime(500)
    expect(wrapper.vm.player.currentTime).toBe(500)
  })

  test('play', () => {
    wrapper.vm.play()
    expect(wrapper.vm.player.playing).toBeTruthy()
  })

  test('pause', () => {
    wrapper.vm.pause()
    expect(wrapper.vm.player.playing).toBeFalsy()
  })

  test('playerjs_play', () => {
    Overlay.events.playerjs_play.call(plyr)
    expect(plyr.$playerjs).toBeCalledWith('play')
    expect(plyr.$set).toBeCalledWith(plyr.player, "playing", true)
  })

  test('playerjs_pause', () => {
    Overlay.events.playerjs_pause.call(plyr)
    expect(plyr.$playerjs).toBeCalledWith('pause')
    expect(plyr.$set).toBeCalledWith(plyr.player, "playing", false)
  })

  test('playerjs_setCurrentTime', () => {
    Overlay.events.playerjs_setCurrentTime.call(plyr)
    expect(plyr.$playerjs).toBeCalledWith('timeupdate')
    expect(plyr.$set).toBeCalled()
  })

  test('playerjs_getCurrentTime', () => {
    Overlay.events.playerjs_getCurrentTime.call(plyr)
    expect(plyr.$playerjs).toBeCalledWith('timeupdate')
  })

  test('playerjs_orientation', () => {
    const obj = {
      $store: {
        dispatch: jest.fn()
      }
    }

    Overlay.events.playerjs_orientation.call(obj, '')
    expect(obj.$store.dispatch).toBeCalledWith("config/layoutChange", {"forcedOrientation": ""})
  })

  test('beforeDestroy', () => {
    wrapper.destroy()
    expect(debugStatus).toStrictEqual('Overlay template unmounted')
  })
});

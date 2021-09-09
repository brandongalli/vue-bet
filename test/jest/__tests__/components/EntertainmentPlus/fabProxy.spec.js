import { mount } from '@vue/test-utils'
import fabProxy from 'components/EntertainmentPlus/fabProxy'
import { localVue } from '../../../tools/QuasarComponents'
import Vuex from 'vuex'

const behavior = require('../../../../../src/boot/common/behavior')
localVue.use(Vuex)
describe('test fabProxy', () => {
  let wrapper
  const store = new Vuex.Store({
    state: {
      config: {
        app: {
          settings: {},
          content: {
            type: {}
          },
          user: {
              id: null
          }
        }
      }
    }
  })
  beforeEach(() => {
    wrapper = mount(fabProxy, {
      localVue,
      propsData: {
        cart: []
      },
      mocks: {
        $app: {
            content: {
              type: null
            },
            user: {
                id: null
            },
            session: {
                distribution: null
            }
        },
        $user: { 
            can: jest.fn()
         },
        $t: jest.fn(),
        $debug: {
          extend: jest.fn()
        },
        $event: {
            emit: jest.fn()
        },
        $behavior: behavior.default({store: store, Vue: localVue}),
        $pulse: jest.fn()
      }
    })
  })
  test('chat', () => {
    wrapper.vm.chat()
    expect(wrapper.vm.$event.emit).toBeCalledWith('toggleChat')
  })

  test('hovered', () => {
    wrapper.vm.hovered(true)
    expect(wrapper.vm.$event.emit).toBeCalledWith('showVideoControls', true)
    wrapper.vm.hovered(false)
    expect(wrapper.vm.$event.emit).toBeCalledWith('showVideoControls', false)
  })
  test('emit action profile', async () => {
    wrapper.vm.$emit('action', 'profile')
    expect(wrapper.emitted().action[0]).toStrictEqual(['profile'])
  })
  test('emit action login', async () => {
    wrapper.vm.$emit('action', 'login')
    expect(wrapper.emitted().action[0]).toStrictEqual(['login'])
  })
  test('emit action filter', async () => {
    wrapper.vm.$emit('action', 'filter')
    expect(wrapper.emitted().action[0]).toStrictEqual(['filter'])
  })
  test('emit action admin', async () => {
    wrapper.vm.$emit('action', 'admin')
    expect(wrapper.emitted().action[0]).toStrictEqual(['admin'])
  })
  test('emit triggerCart', () => {
    wrapper.vm.$emit("triggerCart");
    expect(wrapper.emitted().triggerCart).toBeTruthy();
  })
})
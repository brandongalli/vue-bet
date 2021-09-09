import { shallowMount } from '@vue/test-utils'
import fab from 'components/EntertainmentPlus/fab'
import { localVue } from '../../../tools/QuasarComponents'
import Vuex from 'vuex'

const behavior = require('../../../../../src/boot/common/behavior')
localVue.use(Vuex)
describe('test fab', () => {
  let wrapper
  const store = new Vuex.Store({
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
    }
  })
  beforeEach(() => {
    wrapper = shallowMount(fab, {
      localVue,
      propsData: {
        cart: []
      },
      mocks: {
        $t: jest.fn(),
        $debug: {
          extend: jest.fn()
        },
        $behavior: behavior.default({store: store, Vue: localVue})
      }
    })
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
  test('cartQty', () => {
    const app = {
      $app: { user: { cart: [ { quantity: 1 }, { quantity: 5 } ] } }
    }
    expect(fab.computed.cartQty.call(app)).toEqual(6)
    app.$app.user.cart[0].quantity = 2
    expect(fab.computed.cartQty.call(app)).toEqual(7)
  })
})

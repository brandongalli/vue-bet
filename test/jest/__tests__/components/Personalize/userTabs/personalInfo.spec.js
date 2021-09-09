import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { localVue } from '../../../../tools/QuasarComponents'

import PersonalInfo from '../../../../../../src/components/Personalize/userTabs/personalInfo.vue'

const behavior = require('../../../../../../src/boot/common/behavior')

localVue.use(Vuex)

describe('test personalInfo', () => {
  let wrapper
  let actions
  let store
  beforeEach(() => {
    actions = {
      config: {
        updateUserProfile: jest.fn()
      }
    }
    store = new Vuex.Store({
      state: {},
      actions: {},
      events: {}
    })
    wrapper = shallowMount(PersonalInfo, {
      localVue,
      propsData: {
        value: '',
        user: {
          name: '',
          email: '',
          phone: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          photo: {
            provider: 'local',
            url: ''
          },
          role: {
            type: 'authenticated'
          }
        }
      },
      mocks: {
        $t: jest.fn(),
        $behavior: behavior.default({ store: store, Vue: localVue }),
        $config: {
          server: 'https://localhost:1337/'
        },
        $app: {
          user: {}
        },
        $q: {
          notify: jest.fn(),
          screen: {
            gt: {
              sm: true
            },
            lt: {
              sm: false
            }
          }
        },
        $common: {
          timeline: {
            updateUserProfile: jest.fn()
          }
        },
        $store: {
          dispatch: jest.fn()
        }
      }
    })
  })

  test('userBg is not null when user.photo is available', () => {
    const userBg = wrapper.vm.userBg
    expect(userBg).toBeTruthy()
  })

  test('profile should have user reference', () => {
    const profile = wrapper.vm.profile
    expect(Object.keys(profile).length).toBe(8)
  })

  test('updateState', () => {
    const key = 'test'
    const value = 'value'
    wrapper.vm.updateState(key, value)
    // updateStates emits ('input') event
    expect(wrapper.emitted().input[0][0][key]).toStrictEqual('value')
  })

  test('handle input', () => {
    const event = { text: 'input change' }
    wrapper.vm.handleInput(event)
    expect(wrapper.emitted().input[0][0].text).toStrictEqual(event.text)
  })

  test('setImage', () => {
    const index = {
      url: ""
    }
    wrapper.vm.setImage(index)
    expect(wrapper.vm.profile.photo.url).toStrictEqual(index.url)
  })

  test('updateUserProfile', async () => {
    await wrapper.vm.updateUserProfile()
    expect(wrapper.vm.error).toBeFalsy()
  })
})

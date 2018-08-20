import { shallowMount } from '@vue/test-utils'
import { localVue } from '../../../../tools/QuasarComponents'
import Vuex from 'vuex'

import List from '../../../../../../src/components/admin/common/list.vue'

const behavior = require('../../../../../../src/boot/common/behavior')
localVue.use(Vuex)

describe('test admin/common/list', () => {
  let wrapper
  let events
  const store = new Vuex.Store({
    state: {},
    events: {}
  })
  beforeEach(() => {
    wrapper = shallowMount(List, {
      localVue,
      directives: {
        ripple() {}
      },
      propsData: {
        render: {
          resource: 'distributions',
          resourceSingular: 'distribution',
          columns: 5,
          imageField: '',
          icon: {
            name: '',
            color: '',
            textColor: ''
          }
        }
      },
      mocks: {
        $t: jest.fn(),
        $axios: jest.fn(),
        $behavior: behavior.default({ store: store, Vue: localVue }),
        $bus: {
          emit: (e, data) => {
            events = { e, data }
          }
        },
        $store: {
          getters: {
            'config/getUserInfo': {
              user: {
                role: {
                  type: 'autenticated'
                },
                distributions: [
                  {
                    id: 1,
                    forKuratorSetting: true
                  }
                ],
                productions: {}
              }
            }
          }
        }
      }
    })
  })

  test('handleRowSelection', () => {
    const e = new Event('click')
    wrapper.vm.handleRowSelection(e, { id: 1, forKuratorSetting: true })
    expect(events.e).toStrictEqual('adminCommand')
    expect(events.data.cmd).toStrictEqual('edit.distribution')
  })

  test('getImage', () => {
    const item = {
      id: 1,
      name: 'item',
      url: 'file://logo.png'
    }
    const image = wrapper.vm.getImg(item)
    expect(image).toBeTruthy()
  })

  test('cycleSelectMenuPosition', () => {
    wrapper.vm.cycleSelectMenuPosition()
    expect(wrapper.vm.selectMenu.position).toBe(1)
  })

  test('filterStatus', () => {
    wrapper.vm.filterStatus('choice', 'value')
    expect(true).toBeTruthy()
  })

  test('filterSettings', () => {
    const filters = Object.keys(wrapper.vm.filterSettings)
    expect(filters.length).toBe(5)
  })
})

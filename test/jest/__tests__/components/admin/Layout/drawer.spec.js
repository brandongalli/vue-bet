import { shallowMount } from '@vue/test-utils'
import drawer from 'components/admin/Layout/drawer'
import { localVue } from '../../../../tools/QuasarComponents'
import { util } from 'experience-engine'

const Chance = require('chance')
const chance = new Chance()

describe('test Modal', () => {
  let wrapper
  global.window = Object.create(window)
  Object.defineProperty(window, 'SourceDigital', {
    value: { experience: { id: 1 } }
  })
  let mocks = {
    $config: {server: ''},
    $emit: jest.fn(),
    $t: jest.fn(),
    $analytics: jest.fn(),
    $common: { get: jest.fn(), constants: { events: { interact: 'foo' } } },
    $app: { 
      settings: { 
        meta: { 
          names: {
            platform: chance.string(),
            apps: chance.string(),
            domains: chance.string(),
            organizations: chance.string(),
            properties: chance.string(),
            builder: chance.string(),
            productions: chance.string(),
            distributions: chance.string()
          } 
        }
      }, 
      user: { role: { type: 'superadmin' } }, 
      data: { distribution: { type: 'video' } } 
    }
  }
  beforeEach(() => {
    wrapper = shallowMount(drawer, {
      localVue,
      mocks: mocks
    })
  })
  test('to', () => {
    const route = 'distributions'
    expect(wrapper.vm.to(route)).toEqual('/1/admin/distributions')
  })
  test('distributionActivationsName', () => {
    const app = { $app: { data: { distribution: { type: 'video' } } } }
    expect(drawer.computed.distributionActivationsName.call(app)).toEqual('Activations')
    app.$app.data.distribution.type = 'catalog'
    expect(drawer.computed.distributionActivationsName.call(app)).toEqual('Products')
    app.$app.data.distribution.type = ''
    expect(drawer.computed.distributionActivationsName.call(app)).toEqual('Activations')
  })
  test('distributionImage', () => {
    const app = { 
      $common: { get: util.get },
      $app: { 
        data: { 
          distribution: { 
            cover: { url: 'cover.jpg' },
            settings: { ogMeta:{ ogImage: '' } }
          } 
        } 
      }
    }
    expect(drawer.computed.distributionImage.call(app)).toEqual('cover.jpg')
  })
  test('toggleAdminDrawer', () => {
    const show = { show: false }
    drawer.events.toggleAdminDrawer.call(show)
    expect(show.show).toEqual(true)
  })
})
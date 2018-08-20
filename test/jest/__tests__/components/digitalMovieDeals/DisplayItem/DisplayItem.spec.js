import {shallowMount} from '@vue/test-utils'
import DisplayItem from 'components/digitalMovieDeals/DisplayItem/DisplayItem'
import {localVue} from '../../../../tools/QuasarComponents'

describe('test DisplayItem', () => {
  let wrapper
  global.window = Object.create(window)
  Object.defineProperty(window, 'SourceDigital', {
    value: { config: { data: { distribution: { type: 'admin' } } } }
  })
  beforeEach(() => {
    wrapper = shallowMount(DisplayItem, {
      localVue,
      propsData: {
        thing: {
          dataObject: {
            name: 'Test Activation',
            mainImageUrl: 'someurl.jpg',
            data: {
              basePrice: 4.99,
              lowestPrice: 1.99
            }
          }
        },
        index: 1
      },
      mocks: {
        $t: jest.fn(),
        $pulse: jest.fn(),
        $analytics: jest.fn(),
        $common: { constants: { events: { view: 'foo' } } },
        debug: jest.fn()
      }
    })
  })
  test('Check if dist is admin', () => {
    expect(window.SourceDigital.config.data.distribution.type).toEqual('admin')
  })
  test('emit viewThing with thing object', async () => {
    wrapper.vm.$emit('viewThing', wrapper.vm.thing)
    expect(wrapper.emitted().viewThing[0]).toStrictEqual([wrapper.vm.thing])
  })
  test('emit removeItem with thing object & index', async () => {
    wrapper.vm.$emit('removeItem', wrapper.vm.thing, wrapper.vm.index)
    expect(wrapper.emitted().removeItem[0]).toStrictEqual([wrapper.vm.thing, 1])
  })
  test('handleChange', () => {
    const e = 'foo'
    wrapper.vm.handleChange(e)
    expect(wrapper.emitted().input[0]).toEqual(['foo'])
  })
})

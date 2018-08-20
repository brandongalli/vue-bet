import {shallowMount} from '@vue/test-utils'
import bubble from 'components/EntertainmentPlus/ThingList/bubble'
import { localVue } from '../../../../tools/QuasarComponents'

describe('test bubble', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(bubble, {
      localVue,
      propsData: {
        thing: {
          id: '1',
          dataObject: {
            name: 'Test Activation',
            data: {
              externalProductId: 'VDcds4jDFb00svSH0vx'
            }
          }
        },
        index: 1
      },
      mocks: {
        $pulse: jest.fn(),
        $common: { constants: { events: { view: 'foo' }}},
        $analytics: jest.fn()
      }
    })
  })
  test('emit detail with index', async () => {
    wrapper.vm.$emit('detail', wrapper.vm.index)
    expect(wrapper.emitted().detail[0]).toStrictEqual([ 1 ])
  })

  test('mounted', () => {
    expect(wrapper.vm.$analytics).toBeCalledWith('foo')
    expect(wrapper.vm.$pulse).toBeCalledWith('activationDisplay', '1')
  })
})

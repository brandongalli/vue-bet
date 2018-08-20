import { shallowMount } from '@vue/test-utils'
import PlayerStatEvents from '../../../../../../src/components/EntertainmentPlus/things/playerStatEvents.vue'
describe('testing playerStatEvents', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(PlayerStatEvents, {
      propsData: {
        thing: {
          dataObject: {
            data: {
              firstPeriodStats: 'first,111',
              secondPeriodStats: 'second,222',
              thirdPeriodStats: 'third,333',
              direct_checkout_variant: '123#123'
            },
            media: [{ id: 1, url: 'media-url' }]
          }
        }
      },
      mocks: {
        $common: {
          timeUntil: jest.fn(),
          constants: {
            events: {
              action: 'action'
            }
          }
        },
        $debug: {
          extend: jest.fn()
        },
        $event: {
          emit: jest.fn()
        },
        $emit: jest.fn(),
        $analytics: jest.fn()
      }
    })
  })

  test('chat', () => {
    wrapper.vm.chat()
    expect(wrapper.vm.$event.emit).toBeCalledWith('toggleChat')
    expect(wrapper.vm.$analytics).toBeCalledWith('action')
  })

  test('close button', () => {
    wrapper.vm.closeButton()
    expect(wrapper.emitted().cancel[0]).toBeTruthy()
    expect(wrapper.emitted().CloseBtnStopVideo[0]).toBeTruthy()
  })

  test('getPriceOfSize', () => {
    const price = wrapper.vm.getPriceOfSize('123#123')
    expect(price).toBe(0)
  })

  test('firstPeriodStats', () => {
    const fps = wrapper.vm.firstPeriodStats
    expect(fps[0].name).toStrictEqual('Shots')
    expect(fps[0].data).toStrictEqual(['first', '111'])
  })

  test('secondPeriodStats', () => {
    const sps = wrapper.vm.secondPeriodStats
    expect(sps[0].name).toStrictEqual('Shots')
    expect(sps[0].data).toStrictEqual(['second', '222'])
  })

  test('thirdPeriodStats', () => {
    const tps = wrapper.vm.thirdPeriodStats
    expect(tps[0].name).toStrictEqual('Shots')
    expect(tps[0].data).toStrictEqual(['third', '333'])
  })

  test('thumbStyle', () => {
    const style = {
      right: '2px',
      borderRadius: '5px',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      width: '5px'
    }
    expect(wrapper.vm.thumbStyle).toStrictEqual(style)
  })

  test('imageList', () => {
    expect(wrapper.vm.imageList).toStrictEqual(['media-url'])
  })

  test('selectionPrice', () => {
    expect(wrapper.vm.selectionPrice).toBe(0)
  })

  test('methods in data properties', () => {
    const val = 22
    expect(wrapper.vm.chartOptions.yaxis.labels.formatter(val)).toBe(22)
    expect(wrapper.vm.chartOptions.xaxis.labels.formatter(val)).toBe('22 Minutes')
  })
})

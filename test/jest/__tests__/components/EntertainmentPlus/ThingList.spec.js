import {shallowMount} from "@vue/test-utils";

import ThingList from "../../../../../src/components/EntertainmentPlus/ThingList";

import {localVue} from "../../../tools/QuasarComponents";

const Chance = require('chance')
const chance = new Chance()

describe('test ThingList.vue', () => {
  let wrapper
  let mocks = {
    $app: {
      settings: {
        layout: {
          things: {
            lists: {
              test: {
                template: chance.string({ pool: 'abcde' }),
                class: chance.string({ pool: 'abcde' })
              }
            }
          }
        },
        meta: {
          animation: {
            activation: {
              in: chance.string({ pool: 'abcde' }),
              out: chance.string({ pool: 'abcde' })
            }
          }
        }
      }
    },
    debug: jest.fn(),
    seenIds: [],
    $emit: jest.fn(),
    $common: {
      get: jest.fn(),
      constants: {
        events: {
          view: jest.fn()
        }
      }
    },
    thingSettings: {
      meta: {
        animation: {
          activation: {
            in: chance.string({ pool: 'abcde' }),
            out: chance.string({ pool: 'abcde' }),
          }
        }
      }
    },
    $behavior: {
      doesntExist: jest.fn()
    }
  }
  beforeEach(() => {
    wrapper = shallowMount(ThingList, {
      localVue,
      propsData: {
        things: [
          {
            dataObject: {
              data: {
                externalProductId: chance.string({ pool: 'abcde' })
              }
            }
          }
        ],
        type: 'test'
      },
      mocks: mocks,
      stubs: {
        fomoActivation: '<div></div>'
      }
    })
  })
  test('classList', () => {
    mocks.type = 'test'
    expect(ThingList.computed.classList.call(mocks)).toEqual(mocks.$app.settings.layout.things.lists.test.class)
  })
  test('thingList', () => {
    mocks.things = [
      chance.string({ pool: 'abcde' }),
      chance.string({ pool: 'abcde' }),
      chance.string({ pool: 'abcde' })
    ]
    expect(ThingList.computed.thingList.call(mocks)).toEqual(mocks.things)
  })
  test('animationIn', () => {
    mocks.$common.get = jest.fn(() => true).mockImplementationOnce(() => false)
    expect(ThingList.computed.animationIn.call(mocks)).toEqual(mocks.$app.settings.meta.animation.activation.in)
    expect(ThingList.computed.animationIn.call(mocks)).toEqual(mocks.thingSettings.meta.animation.activation.in)
  })
  test('animationOut', () => {
    mocks.$common.get = jest.fn(() => true).mockImplementationOnce(() => false)
    expect(ThingList.computed.animationOut.call(mocks)).toEqual(mocks.$app.settings.meta.animation.activation.out)
    expect(ThingList.computed.animationOut.call(mocks)).toEqual(mocks.thingSettings.meta.animation.activation.out)
  })
  test('template', () => {
    expect(wrapper.vm.template()).toEqual(mocks.$app.settings.layout.things.lists.test.template)
  })
  test('activationId', () => {
    const id = chance.integer()
    wrapper.vm.activationId(id)
    const debug = jest.spyOn(wrapper.vm, 'debug')
    const push = jest.spyOn(wrapper.vm.seenIds, 'push')
    expect(debug).toBeCalledWith(id, 'ID')
    expect(wrapper.vm.seenIds).toContain(id) //toEqual throws a error(Received: serializes to the same string). No fix has been found yet
  })
  test('duplicateIdCheck', () => {
    const thing = wrapper.vm.things[0]
    wrapper.vm.$behavior.doesntExist = jest.fn(() => true)
    expect(wrapper.vm.duplicateIdCheck(thing)).toEqual(true)
    wrapper.vm.$behavior.doesntExist = jest.fn(() => false)
    expect(wrapper.vm.duplicateIdCheck(thing)).toEqual(true)
    wrapper.vm.type = 'overlay'
    wrapper.vm.seenIds = [thing.dataObject.data.externalProductId]
    expect(wrapper.vm.duplicateIdCheck(thing)).toEqual(true)
    wrapper.vm.seenIds = []
    expect(wrapper.vm.duplicateIdCheck(thing)).toEqual(false)
    thing.id = chance.integer()
    wrapper.vm.seenIds = [thing.id]
    expect(wrapper.vm.duplicateIdCheck(thing)).toEqual(true)
    wrapper.vm.seenIds = []
    expect(wrapper.vm.duplicateIdCheck(thing)).toEqual(false)
  })
  test('fomoCall', () => {
    const $emit = jest.spyOn(wrapper.vm, '$emit')
    const thing = wrapper.vm.things[0]
    const index = chance.integer()
    const id = chance.integer()
    wrapper.vm.fomoCall(thing, index, id)
    expect(wrapper.vm.seenIds).toContain(id)
    expect($emit).toBeCalledWith('detail', thing, index)
  })
})

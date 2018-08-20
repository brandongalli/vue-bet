import {shallowMount} from '@vue/test-utils'
import MovieDetails from 'components/common/MovieDetails'
import {localVue} from '../../../tools/QuasarComponents'

describe('test DisplayItem', () => {
  let wrapper
  global.window = Object.create(window)
  Object.defineProperty(window, 'SourceDigital', {
    value: { config: { data: { distribution: { type: 'admin' } } } }
  })
  beforeEach(() => {
    wrapper = shallowMount(MovieDetails, {
      localVue,
      propsData: {
        thing: {
          dataObject: {
            name: 'Test Activation',
            mainImageUrl: 'someurl.jpg',
            media: [ { url: 'someotherurl.jpg' } ],
            data: {
              basePrice: 4.99,
              lowestPrice: 1.99,
              rating: 'pg',
              year: '2011',
              genre: 'Foo, Bar',
              description: 'foo',
              format: 'HD',
              duration: '100 Minutes',
              name: 'Title'
            }
          }
        },
        prompt: true
      },
      mocks: {
        $t: jest.fn(),
        $pulse: jest.fn(),
        $analytics: jest.fn(),
        $common: { constants: { events: { action: 'foo' } } },
        debug: jest.fn(),
        $user: { can: jest.fn() },
        $app: { session: { distribution: 'storefront' } },
        $q: {
          dialog: jest.mock(),
          screen: { gt: { md: jest.fn() }, md: jest.fn() },
        }
      }
    })
  })
  test('Check if dist is admin', () => {
    expect(window.SourceDigital.config.data.distribution.type).toEqual('admin')
  })
  test('year', () => {
    const thing = {
      thing: { dataObject: { data: { year: '2011-04-08' } } }
    }
    expect(MovieDetails.computed.year.call(thing)).toEqual('2011')
  })
  test('cast', () => {
    const thing = {
      thing: { dataObject: { data: { cast: 'Actor1, Actor2', credits: [] } } }
    }
    expect(MovieDetails.computed.cast.call(thing)).toEqual('Actor1, Actor2')
    thing.thing.dataObject.data.cast = ''
    thing.thing.dataObject.data.credits = [{name: 'Actor3', creditType: 'Cast'}]
    expect(MovieDetails.computed.cast.call(thing)).toEqual('Actor3')
  })
  test('crew', () => {
    const thing = {
      thing: { dataObject: { data: { crew: 'Person1, Person2', credits: [] } } }
    }
    expect(MovieDetails.computed.crew.call(thing)).toEqual('Person1, Person2')
    thing.thing.dataObject.data.crew = ''
    thing.thing.dataObject.data.credits = [{name: 'Person3', creditType: 'Crew'}]
    expect(MovieDetails.computed.crew.call(thing)).toEqual('Person3')
  })
  test('crewOrCredit', () => {
    const thing = {
      thing: { dataObject: { data: { crew: 'Person1, Person2', credits: [] } } }
    }
    expect(MovieDetails.computed.crewOrCredit.call(thing)).toEqual('Person1, Person2')
    thing.thing.dataObject.data.crew = ''
    thing.thing.dataObject.data.credits = [{name: 'Actor3', creditType: 'Cast'}, {name: 'Person1', creditType: 'Crew'}]
    expect(MovieDetails.computed.crewOrCredit.call(thing)).toEqual([{name: 'Person1', creditType: 'Crew'}])
  })
  test('castOrCredit', () => {
    const thing = {
      thing: { dataObject: { data: { cast: 'Actor1, Actor2', credits: [] } } }
    }
    expect(MovieDetails.computed.castOrCredit.call(thing)).toEqual('Actor1, Actor2')
    thing.thing.dataObject.data.cast = ''
    thing.thing.dataObject.data.credits = [{name: 'Actor3', creditType: 'Cast'}, {name: 'Person1', creditType: 'Crew'}]
    expect(MovieDetails.computed.castOrCredit.call(thing)).toEqual([{name: 'Actor3', creditType: 'Cast'}])
  })
  test('handleChange', () => {
    const e = 'foo'
    wrapper.vm.handleChange(e)
    expect(wrapper.emitted().input[0]).toEqual(['foo'])
  })
  test('handleClick', () => {
    const obj = { obj: 'foo' }
    wrapper.vm.$user.can.mockReturnValue(true)
    wrapper.vm.handleClick(obj)
    expect(wrapper.emitted().changeImage[0]).toEqual([{obj: 'foo'}])
  })
})
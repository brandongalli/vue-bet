import { shallowMount } from '@vue/test-utils'
import dmd from 'components/templates/catalogs/digitalMovieDeals'
import { localVue } from '../../../../tools/QuasarComponents'
import Vuex from 'vuex'

localVue.use(Vuex)
describe('test digitalMovieDeals', () => {
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
    wrapper = shallowMount(dmd, {
      localVue,
      propsData: {
        searchItem: {}
      },
      mocks: {
        $t: jest.fn(),
        $debug: {
          extend: jest.fn()
        },
        $analytics: jest.fn(),
        $common: { constants: { events: { interact: 'foo' } } },
        showCart: false,
        selectedGenres: [],
        color: 'black',
        preview: false,
        showFAQ: false,
        products: true,
        $app: {
          settings: { logo: 'someurl.jpg' },
          user: {
            cart: [],
            activity: { lookingAt: { thing: {} } }
          },
          events: [
            {
              dataObject: { data: { genre: 'Foo, Bar' } },
              target: ''
            },
            {
              dataObject: { data: { genre: 'Foo, Baz' } },
              target: ''
            }
          ]
        },
        $store: store
      }
    })
  })
  test('viewCart', () => {
    wrapper.vm.viewCart()
    expect(wrapper.vm.showCart).toEqual(true)
  })
  test('closeCart', () => {
    wrapper.vm.closeCart()
    expect(wrapper.vm.showCart).toEqual(false)
  })
  test('faqToggle', () => {
    wrapper.vm.faqToggle()
    expect(wrapper.vm.showFAQ).toEqual(true)
  })
  test('genres', () => {
    const app = {
      $app: {
        events: [
          {
            dataObject: { data: { genre: 'Foo, Bar' } },
            target: ''
          },
          {
            dataObject: { data: { genre: 'Foo, Baz' } },
            target: ''
          }
        ]
      }
    }
    expect(dmd.computed.genres.call(app)).toEqual(['Bar', 'Baz', 'Foo'])
  })
  test('featured', () => {
    const app = {
      $app: {
        events: [
          { target: 'title', id: 5 },
          { target: 'featured', id: 1 }
        ]
      }
    }
    expect(dmd.computed.featured.call(app)).toEqual([{ target: 'featured', id: 1 }])
  })
  test('titles', () => {
    const app = {
      selectedGenres: [],
      $app: {
        events: [
          {
            dataObject: { data: { genre: 'Foo, Bar' } },
            target: 'featured'
          },
          {
            dataObject: { data: { genre: 'Foo, Baz' } },
            target: ''
          }
        ]
      }
    }
    expect(dmd.computed.titles.call(app)).toEqual([{ dataObject: { data: { genre: 'Foo, Bar' } }, target: 'featured' }, { dataObject: { data: { genre: 'Foo, Baz' } }, target: '' }])
    app.selectedGenres.push('Bar')
    expect(dmd.computed.titles.call(app)).toEqual([{ dataObject: { data: { genre: 'Foo, Bar' } }, target: 'featured' }])
  })
  test('showModal', () => {
    const app = {
      $app: {
        user: {
          activity: { lookingAt: { thing: 1 } }
        },
      }
    }
    expect(dmd.computed.showModal.call(app)).toEqual(true)
    app.$app.user.activity.lookingAt.thing = null
    expect(dmd.computed.showModal.call(app)).toEqual(false)
  })
})

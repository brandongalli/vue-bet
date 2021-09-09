/* eslint-disable */
/**
 * @jest-environment jsdom
 */

describe("A", () => {
  test("B", async () => {
    expect(true).toBeTruthy()
  })
})

// import Vue from 'vue'
// import { shallowMount, mount, createLocalVue} from '@vue/test-utils'
// import * as All from 'quasar'
// const { Quasar, Notify, Dialog } = All

// const components = Object.keys(All).reduce((object, key) => {
//   const val = All[key]
//   if (val && val.component && val.component.name != null) {
//     object[key] = val
//   }
//   return object
// }, {})

// import EntertainmentPlus from 'src/components/EntertainmentPlus/EntertainmentPlus.vue'

// // Must be installed on _global_ Vue https://github.com/quasarframework/quasar-testing/issues/79#issuecomment-574264791
// Vue.use(Quasar, { components, plugins: {Notify,Dialog} })

// describe('EntertainmentPlus', () => {

//     let localVue
//     let wrapper
//     let vm
//     let shallowWrapper
//     let vmShallow

//   it('renders a div', () => {
//     const localVue = createLocalVue()

//     // Doesn't work!
//     //localVue.use(Quasar, { config: {},plugins: {Screen,Notify,Dialog} }) // , lang: langEn

//     const $route = { path: 'http://localhost' }
//     const $screen = { lt: { sm: false }}
//     const $q = { screen: $screen }
//     const wrapper = shallowMount(EntertainmentPlus,
//     {attachToDocument: false,
//       mocks: {
//         $route, $screen, $q
//       }
//     })
//     expect(wrapper.vm.$route.path).toBe($route.path)
//   })
// })

// import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
// // import APP from 'App.vue'
// import App from 'src/App.vue'
// import loading from 'src/components/loading.vue'
// import diagnostics from 'src/.vue'
// import * as All from 'quasar'
// import Vuex from 'vuex'
// // import config from 'store/config'
// // import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
// conimport { EntertainmentPlus } from 'src/components/EntertainmentPlus/EntertainmentPlus.vue';
// st { Quasar, Notify, Dialog } = All

// const components = Object.keys(All).reduce((object, key) => {
//   const val = All[key]
//   if (val && val.component && val.component.name != null) {
//     object[key] = val
//   }
//   return object
// }, {})

// describe('Mount App', () => {
//   const localVue = createLocalVue()
//   localVue.use(Quasar, { components }) // , lang: langEn

//   const wrapper = shallow(App, {
//     localVue
//   })
//   const vm = wrapper.vm

//   it('passes the sanity check and creates a wrapper', () => {
//     expect(wrapper.isVueInstance()).toBe(true)
//   })

//   it('has a created hook', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('has a mounted hook', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('sets token during mount', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('dispatched hydrate during mount', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('getUrlVars returns as expected', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('removeLocalStorageData clears items as expected', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('triggers pulse focusOnExperience event upon mouseover', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('triggers pulse docusOffExperience event upon mouseleave', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('triggers pulse touch event upon click', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('reloads experience upon route parameter change', () => {
//     expect(typeof vm.increment).toBe('function')
//   })

//   it('accesses the shallowMount', () => {
//     expect(vm.$el.textContent).toContain('rocket muffin')
//     expect(wrapper.text()).toContain('rocket muffin') // easier
//     expect(wrapper.find('p').text()).toContain('rocket muffin')
//   })

//   it('sets the correct default data', () => {
//     expect(typeof vm.counter).toBe('number')
//     const defaultData2 = QBUTTON.data()
//     expect(defaultData2.counter).toBe(0)
//   })

//   it('correctly updates data when button is pressed', () => {
//     const button = wrapper.find('button')
//     button.trigger('click')
//     expect(vm.counter).toBe(1)
//   })

//   it('formats a date without throwing exception', () => {
//     // test will automatically fail if an exception is thrown
//     // MMMM and MMM require that a language is 'installed' in Quasar
//     let formattedString = date.formatDate(Date.now(), 'YYYY MMMM MMM DD')
//     console.log('formattedString', formattedString)
//   })
// })

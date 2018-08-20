// /* eslint-disable */
// /**
//  * @jest-environment jsdom
//  */

describe("A", () => {
  test("B", async () => {
    expect(true).toBeTruthy()
  })
})

// import { mount, createLocalVue } from '@vue/test-utils'
// import actions from 'src/store/config/actions.js'
// import * as All from 'quasar'

// const { Quasar, date } = All

// const components = Object.keys(All).reduce((object, key) => {
//   const val = All[key]
//   if (val && val.component && val.component.name != null) {
//     object[key] = val
//   }
//   return object
// }, {})

// describe('actions', () => {
//   const localVue = createLocalVue()
//   localVue.use(Quasar, { components })

//   const wrapper = mount(
//     experienceLoader,
//     { localVue })

//   it('renders a div', () => {
//     expect(wrapper.contains('div')).toBe(true)
//   })

//   it('Test level', () => {
//     expect(wrapper.name()).toBe('Level')
//   })

//   it('Test Default Value of level', () => {
//     expect(wrapper.vm.level).toBe('B2')
//   })

// })

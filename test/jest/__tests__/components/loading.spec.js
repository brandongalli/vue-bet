/* eslint-disable */
/**
 * @jest-environment jsdom
*/

describe("A", () => {
  test("B", async () => {
    expect(true).toBeTruthy()
  })
})

// import { shallowMount } from '@vue/test-utils'
// import loading from 'src/components/loading.vue'
// import { Vue, Notify } from 'vue'

// const context = {
//   currentTime: 5,
//   session: {
//     id: '',
//     time: 0,
//     distribution: 0
//   },
//   content: {
//     cover: '',
//     media: '',
//     currentTime: 0,
//     playing: false,
//     loading: false,
//     volume: 0,
//     speed: 1,
//     ration: '4:3',
//     language: '',
//     source: ''
//   },
//   user: {},
//   events: [],
//   settings: {
//     variables: {} // The only address space that settings can write to
//   }
// }

// // describe('loading.vue', () => {
// //   it('settings', () => {
// //     const wrapper = shallowMount(loading, { context })
// //     wrapper.setProps({ settings: context.settings })
// //     expect(wrapper.contains('.spinner')).toBe(true)
// //   })
// // })

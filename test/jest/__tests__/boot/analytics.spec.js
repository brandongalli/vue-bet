/*
*  * @jest-environment jsdom
*/

const {analytics} = require('../../../../src/boot/analytics')

describe('test analytics', () => {
  let event
  beforeAll(() => {
    window.ga = (action, options) => {
      event = { action, options }
    }
    analytics('View')
  })
  test('analytics window.ga events needs to be "send"', () => {
    expect(event.action).toStrictEqual('send')
  })
  test('analytics event actions', () => {
    const actions = ['View', 'Intract', 'Action']
    const status = actions.includes(event.options.eventAction) ? true : false
    expect(status).toBeTruthy()
  })
})

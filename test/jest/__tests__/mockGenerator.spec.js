import { createMockJson } from "../tools/mockGenerator";

describe('test mockGenerator', () => {
  test('json is set correctly', () => {
    const mocked = createMockJson('/mockGenerator.vue', jest)
    expect(mocked.$data.someFunction.toString()).toEqual(jest.fn().toString())
    expect(mocked.$parent.$data.debugData.color).toEqual('test')
    expect(mocked.$parent.$data.debugData.message).toEqual('test')
    expect(mocked.$parent.$data.debugData.someFunction.toString()).toEqual(jest.fn().toString())
    expect(mocked.$parent.$options.name).toEqual('test')
    expect(mocked.someFunction.toString()).toEqual(jest.fn().toString())
  })
})

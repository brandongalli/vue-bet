import { mount } from '@vue/test-utils'

import participants from "../../../../../src/components/admin/common/formGenerator/participants";

import { localVue } from "../../../tools/QuasarComponents";


describe('Participants', () => {
  window.confirm = jest.fn(() => true)
  const Chance = require('chance')
  const chance = new Chance()
  const value = [
    {
      'name': chance.name(),
      'nameSortable': chance.name(),
      'as': chance.name()
    },
    {
      'name': chance.name(),
      'nameSortable': chance.name(),
      'as': chance.name()
    },
    {
      'name': chance.name(),
      'nameSortable': chance.name(),
      'as': chance.name()
    },
    {
      'name': chance.name(),
      'nameSortable': chance.name(),
      'as': chance.name()
    }
  ]
  let wrapper
  beforeEach(() => {
    wrapper = mount(participants, {
      localVue,
      propsData: {
        'value': value,
        'options': ''
      }
    })
  })

  test('Computed value should match vale', () => {
    expect(wrapper.vm.computedValue).toEqual(value)
  })

  test('Should remove participant', async () => {
    await wrapper.vm.$nextTick()
    await wrapper.vm.remove(value[0])
    value.shift()
    await expect(wrapper.vm.computedValue).toEqual(value)
  })

  test('should add participant', async () => {
    await wrapper.vm.$nextTick()
    await wrapper.vm.startAdd()
    await expect(wrapper.vm.showAdd).toEqual(true)
    let add = {as: chance.name(), name: chance.name(), nameSortable: chance.name()}
    wrapper.vm.add = add
    await wrapper.vm.finishAdd()
    value.push(add)
    await expect(wrapper.vm.computedValue).toEqual(value)
    await expect(wrapper.vm.showAdd).toEqual(false)
  })

  test('should update the computed value if the prop value is changes', async () => {
    await wrapper.vm.$nextTick()
    const newValue = {
      'name': chance.name(),
      'nameSortable': chance.name(),
      'as': chance.name()
    }
    await wrapper.setProps({'value': newValue})
    await wrapper.vm.$nextTick()
    await expect(wrapper.vm.computedValue).toEqual(newValue)
  })
})

import { mount } from '@vue/test-utils'

import media from "../../../../../src/components/admin/common/formGenerator/media";

import { localVue } from "../../../tools/QuasarComponents";

describe('appPages', () => {
  const Chance = require('chance')
  const chance = new Chance()
  let wrapper
  let value
  beforeEach(() => {
    value = [
      {
        'type': chance.string(),
        'name': chance.name(),
        'as': chance.string(),
        'lastModifiedDate': chance.date(),
        'size': chance.string(),
        'view': chance.string()
      },
      {
        'type': chance.string(),
        'name': chance.name(),
        'as': chance.string(),
        'lastModifiedDate': chance.date(),
        'size': chance.string(),
        'view': chance.string()
      },
      {
        'type': chance.string(),
        'name': chance.name(),
        'as': chance.string(),
        'lastModifiedDate': chance.date(),
        'size': chance.string(),
        'view': chance.string()
      },
      {
        'type': chance.string(),
        'name': chance.name(),
        'as': chance.string(),
        'lastModifiedDate': chance.date(),
        'size': chance.string(),
        'view': chance.string()
      },
    ]
    wrapper = mount(media, {
      localVue,
      propsData: {
        'value': value,
      }
    })
  })
  test('computed value should match value', () => {
    expect(wrapper.vm.computedValue).toEqual(value)
  })
  test('Should remove activation', async () => {
    await wrapper.vm.$nextTick()
    await wrapper.vm.remove(value[0])
    value.shift()
    await expect(wrapper.vm.computedValue).toEqual(value)
  })
  test('should add activation', async () => {
    await wrapper.vm.$nextTick()
    await wrapper.vm.startAdd()
    await expect(wrapper.vm.showAdd).toEqual(true)
    let add = {
      'type': chance.string(),
      'name': chance.name(),
      'as': chance.string(),
      'lastModifiedDate': chance.date(),
      'size': chance.string(),
      'view': chance.string()
    }
    wrapper.vm.add = add
    await wrapper.vm.finishAdd()
    value.push(add)
    await expect(wrapper.vm.computedValue).toEqual(value)
    await expect(wrapper.vm.showAdd).toEqual(false)
  })

  test('should update the computed value if the prop value is changes', async () => {
    await wrapper.vm.$nextTick()
    const newValue = {
      'type': chance.string(),
      'name': chance.name(),
      'as': chance.string(),
      'lastModifiedDate': chance.date(),
      'size': chance.string(),
      'view': chance.string()
    }
    await wrapper.setProps({'value': newValue})
    await wrapper.vm.$nextTick()
    await expect(wrapper.vm.computedValue).toEqual(newValue)
  })

  test('view image', async () => {
    await wrapper.vm.$nextTick()
    await wrapper.vm.viewImage(value[0])
    await expect(wrapper.vm.image).toEqual(value[0].view)
    await expect(wrapper.vm.imageModal).toEqual(true)
  })
})

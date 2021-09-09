import { mount } from '@vue/test-utils'

import appFiles from "../../../../../src/components/admin/common/formGenerator/appFiles";

import { localVue } from "../../../tools/QuasarComponents";

describe('appFiles', () => {
  const Chance = require('chance')
  const chance = new Chance()
  let wrapper
  let value
  beforeEach(() => {
    value = [
      {
        'name': chance.name(),
        'price': chance.dollar(),
        'genre': chance.string(),
        'description': chance.paragraph(),
        'cast': chance.name(),
        'rating': chance.string(),
        'year': chance.year(),
        'duration': chance.minute(),
        'view': chance.url({extensions: ['gif', 'jpg', 'png']})
      },
      {
        'name': chance.name(),
        'price': chance.dollar(),
        'genre': chance.string(),
        'description': chance.paragraph(),
        'cast': chance.name(),
        'rating': chance.string(),
        'year': chance.year(),
        'duration': chance.minute(),
        'view': chance.url({extensions: ['gif', 'jpg', 'png']})
      },
      {
        'name': chance.name(),
        'price': chance.dollar(),
        'genre': chance.string(),
        'description': chance.paragraph(),
        'cast': chance.name(),
        'rating': chance.string(),
        'year': chance.year(),
        'duration': chance.minute(),
        'view': chance.url({extensions: ['gif', 'jpg', 'png']})
      },
      {
        'name': chance.name(),
        'price': chance.dollar(),
        'genre': chance.string(),
        'description': chance.paragraph(),
        'cast': chance.name(),
        'rating': chance.string(),
        'year': chance.year(),
        'duration': chance.minute(),
        'view': chance.url({extensions: ['gif', 'jpg', 'png']})
      },
    ]
    wrapper = mount(appFiles, {
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
      'name': chance.name(),
      'price': chance.dollar(),
      'genre': chance.string(),
      'description': chance.paragraph(),
      'cast': chance.name(),
      'rating': chance.string(),
      'year': chance.year(),
      'duration': chance.minute(),
      'view': chance.url({extensions: ['gif', 'jpg', 'png']})
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
      'name': chance.name(),
      'price': chance.dollar(),
      'genre': chance.string(),
      'description': chance.paragraph(),
      'cast': chance.name(),
      'rating': chance.string(),
      'year': chance.year(),
      'duration': chance.minute(),
      'view': chance.url({extensions: ['gif', 'jpg', 'png']})
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

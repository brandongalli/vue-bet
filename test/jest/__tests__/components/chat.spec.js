import Chat from "../../../../src/components/Chat";
import {shallowMount} from "@vue/test-utils";
import {localVue} from "../../tools/QuasarComponents";
import {createMockJson} from "../../tools/mockGenerator";

describe('test Chat.vue', () => {
  let wrapper
  let mocks = createMockJson('../../../../src/components/Chat.vue', jest)
  mocks.$user = {
    can: jest.fn()
  }
  mocks.$app.session = {
    distribution: 1
  }

  beforeEach(() => {
    wrapper = shallowMount(Chat, {
      localVue,
      mocks: mocks
    })
  })
  test('toggleChat', () => {
    mocks.show = true
    Chat.events.toggleChat.call(mocks)
    expect(mocks.show).toEqual(false)
    Chat.events.toggleChat.call(mocks)
    expect(mocks.show).toEqual(true)
  })
  test('chatMessage', () => {
    mocks.messages = []
    Chat.realtime.chatMessage.call(mocks, 'test')
    expect(mocks.messages).toEqual(['test'])
  })
  test('sendMessage', () => {
    wrapper.vm.sendMessage()
    expect(wrapper.vm.messages).toEqual([{
      user: 'Me',
      data: '',
      avatar: mocks.$app.user.photo.url
    }])
    const $realtime = jest.spyOn(wrapper.vm, '$realtime')
    expect($realtime).toBeCalledWith('chatMessage', '')
  })
})

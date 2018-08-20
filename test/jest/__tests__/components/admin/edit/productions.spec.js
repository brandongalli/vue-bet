import { shallowMount } from "@vue/test-utils";
import productions from "components/admin/edit/productions";
import { localVue } from "../../../../tools/QuasarComponents";
import Vuex from "vuex";

localVue.use(Vuex);
describe("test productions", () => {
  let wrapper;
  const Chance = require("chance");
  const chance = new Chance();

  beforeEach(() => {
    wrapper = shallowMount(productions, {
      localVue,
      propsData: {
        value: {}
      },
      stubs: ["form-generator"]
    });
  });
  test("handle input", () => {
    const emit = chance.string();
    wrapper.vm.handleInput(emit);
    expect(wrapper.emitted().input[0]).toStrictEqual([emit]);
  });

  test("update state", () => {
    const key = chance.string();
    const value = chance.string();
    wrapper.vm.updateState(key, value);
    expect(wrapper.emitted().input[0]).toStrictEqual([{ [key]: value }]);
  });

  test("admin command", () => {
    const data = {
      createActivations: null
    };
    productions.events.adminCommand.call(data, "new.activation");
    expect(data.createActivations).toEqual(true);
  });
});

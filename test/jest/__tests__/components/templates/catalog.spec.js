import { shallowMount } from "@vue/test-utils";
import catalog from "../../../../../src/components/templates/catalog";
import { localVue } from "../../../tools/QuasarComponents";
import Vuex from "vuex";

const behavior = require("../../../../../src/boot/common/behavior");
localVue.use(Vuex);
describe("test catalog", () => {
  let wrapper;
  const store = new Vuex.Store({
    state: {
      config: {
        app: {
          settings: {},
          content: {
            media: {},
          },
        },
      },
      events: {
        media: {
          forEach: jest.fn(),
        },
      },
    },
  });
  beforeEach(() => {
    wrapper = shallowMount(catalog, {
      localVue,
      propsData: {
        searchItem: true,
      },
      mocks: {
        $app: {
          settings: {
            template: null,
          },
        },
        $debug: {
          extend: jest.fn(),
        },
        $pulse: jest.fn(),
      },
    });
  });
  test("mouseover", () => {
    wrapper.vm.mouseover("test");
    expect(wrapper.vm.$pulse).toBeCalledWith("focusOnMedia", "test");
  });
  test("mouseleave", () => {
    wrapper.vm.mouseleave("test");
    expect(wrapper.vm.$pulse).toBeCalledWith("focusOffMedia", "test");
  });
  test("search Item", () => {
    expect(wrapper.vm.$store.commit).toBeCalledWith("config/setThing", true);
  });
});

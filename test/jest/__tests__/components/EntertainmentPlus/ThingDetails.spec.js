import { shallowMount } from "@vue/test-utils";
import ThingDetails from "components/EntertainmentPlus/ThingDetails";
import { localVue } from "../../../tools/QuasarComponents";
import Vuex from "vuex";

localVue.use(Vuex);
describe("test ThingDetails", () => {
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
    wrapper = shallowMount(ThingDetails, {
      localVue,
      propsData: {
        thing: {
          dataObject: {
            data: {
              detailViewIframeSrc: false,
            },
          },
          dataTypeName: "product",
          mapped: true,
        },
        list: null,
      },
      mocks: {
        $app: {
          user: {
            activity: {
              lookingAt: {
                iframe: false,
              },
            },
          },
        },
        $store: {
          commit: jest.fn(),
        },
      },
    });
  });
  test("emit close details", async () => {
    wrapper.vm.$emit("cancel", wrapper.vm.thing);
    expect(wrapper.emitted().cancel[0]).toStrictEqual([wrapper.vm.thing]);
  });

  test("emit show cart", async () => {
    wrapper.vm.$emit("showCart");
    expect(wrapper.emitted().showCart).toBeTruthy();
  });

  test("check thing type", async () => {
    expect(wrapper.vm.thing.dataTypeName).toEqual("product");
  });

  test("open link dialog", () => {
    const link = { id: 1 };
    wrapper.vm.openLinkDialog(link);
    expect(wrapper.vm.$store.commit).toBeCalledWith("config/viewIframe", {
      id: 1,
    });
  });

  test("close iframe", () => {
    wrapper.vm.closeIframe();
    expect(wrapper.vm.$store.commit).toBeCalledWith("config/stopViewingIframe");
  });
});

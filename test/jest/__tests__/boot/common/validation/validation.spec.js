import { createLocalVue } from "@vue/test-utils";
import Validation from "../../../../../../src/boot/common/validation/index";
import vuex from "vuex";

jest.mock("debug");
const Vue = createLocalVue();
Vue.use(vuex);
const store = new vuex.Store({
  state: {},
  mutations: {
    "config/error": jest.fn(),
  },
});
Vue.prototype.$debug = {
  extend: jest.fn(() => jest.fn()),
};
// mock debug
describe("testing common/validations", () => {
  const validation = Validation({ store, Vue });
  let things;
  beforeEach(() => {
    things = [];
  });
  test("Validate when type is undefined", () => {
    const thing = {
      id: Date.now(),
      type: undefined,
    };
    things.push(thing);
    const mapped = validation.validate(things);
    expect(mapped).toStrictEqual([thing]);
  });
  test("Validate when version is present", () => {
    const response = [
      {
        startTimeMs: 0,
        endTimeMs: 0,
        dataObject: {
          mainImageUrl: "https://cdn.sourcesync.io/media/default-icon.png",
        },
        mapped: "S01E01",
      },
    ];
    const thing = {
      id: Date.now(),
      type: undefined,
      version: "S01E01",
    };
    things.push(thing);
    const mapped = validation.validate(things);
    expect(mapped).toStrictEqual(response);
  });
  test("Validate when thing.type is not undefined", () => {
    const response = [
      {
        startTimeMs: 0,
        endTimeMs: 0,
        dataObject: {
          mainImageUrl: "https://cdn.sourcesync.io/media/default-icon.png",
        },
        mapped: "S01E01",
        dataTypeName: "product",
      },
    ];
    const thing = {
      id: Date.now(),
      type: "product",
      version: "S01E01",
    };
    things.push(thing);
    const mapped = validation.validate(things);
    expect(mapped).toStrictEqual(response);
  });
  test("Validate when thing.type is not product or legacy", () => {
    const response = [
      {
        startTimeMs: 0,
        endTimeMs: 0,
        dataObject: {
          mainImageUrl: "https://cdn.sourcesync.io/media/default-icon.png",
        },
        mapped: 1,
        dataTypeName: "product",
      },
    ];
    const thing = {
      id: Date.now(),
      type: "product",
      version: 1,
    };
    things.push(thing);
    const mapped = validation.validate(things);
    expect(mapped).toStrictEqual(response);
  });
});


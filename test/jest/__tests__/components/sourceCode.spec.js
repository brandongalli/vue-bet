import { shallowMount } from "@vue/test-utils";
import ee from 'experience-engine'
import SourceCode from "../../../../src/components/sourceCode.vue";
import { localVue } from "../../tools/QuasarComponents";

describe("test sourceCode.vue", () => {
  let wrapper;
  const unsafe = '<b>Experience Engine</b>'
  const safe = '&lt;b&gt;Experience Engine&lt;/b&gt;'
  const safeBandi = '<strong>Experience Engine</strong>'
  let bandi = true
  beforeEach(() => {
    wrapper = shallowMount(SourceCode, {
      propsData: {
        code: unsafe,
        bandi: !bandi
      },
      mocks: {
        $ee: {
          templates: {
            md: {
              default: ee.templates.md,
            },
            html: ee.templates.html
          }
        }
      }
    });
    bandi = !bandi
  });

  test("compute html without bandi", () => {
    const unsafe = wrapper.vm.html;
    expect(unsafe).toStrictEqual(safe)
  });

  test("compute html with bandi", () => {
    const unsafe = wrapper.vm.html;
    expect(unsafe).toStrictEqual(safeBandi)
  });
});

import { shallowMount } from "@vue/test-utils";
import FomoActivation from "../../../../../src/components/Fomo/FomoActivation.vue";
describe("Testing FomoActivation", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FomoActivation, {
      propsData: {
        thing: {
          id: 1,
          schema: {

          },
          image: 'Image',
          end: 5000,
          start: 1000
        },
        time: 40000,
        index: {}
      },
      mocks: {
        $q: {
          screen: {
            width: 1920
          }
        },
        $pulse: jest.fn()
      }
    });
  });

  const thing = {
    id: 1,
    schema: {
      id: 'schema_1'
    },
    image: 'Image',
    end: 5000,
    start: 1000
  }
  const time = 40000

  test("mounted", () => {
    expect(wrapper.vm.$pulse).toBeCalledWith('activationDisplay', 1)
  })

  test("get thing image", () => {
    const thingImage = wrapper.vm.getThingImage(thing)
    expect(thingImage).toStrictEqual(thing.image)
  })

  test("getThingDisplayTimeLeft", () => {
    const thingTIme = wrapper.vm.getThingDisplayTimeLeft(thing, time)
    console.log("LOG: thingTIme", thingTIme)
    expect(thingTIme).toBe(thing.end - time)
  })

  test("getThingDisplayTime", () => {
    const thingDisplayTime = wrapper.vm.getThingDisplayTime(thing)
    expect(thingDisplayTime).toBe(thing.end - thing.start)
  })

  test("fomoMeter", () => {
    const fomoMeter = wrapper.vm.fomoMeter
    console.log("LOG: fomoMeter", fomoMeter)
    expect(typeof fomoMeter).toBe('number')
  })

  test("fomoImage", () => {
    const fomoImage = wrapper.vm.fomoImage
    expect(fomoImage).toStrictEqual(thing.image)

  })
});

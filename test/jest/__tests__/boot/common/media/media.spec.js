const Media = require("../../../../../../src/boot/common/media/index");
describe("Testing boot/common/media/index.js", () => {
  let media;
  beforeEach(() => {
    media = Media.default();
  });
  test("expect mediaDetails to return html5 video", () => {
    const mediaDetails = media.detect("helloworld.mp4");
    expect(mediaDetails.type).toStrictEqual("video");
    expect(mediaDetails.source).toStrictEqual("html5");
  });
  test("expect mediaDetails to return default", () => {
    const mediaDetails = media.detect();
    expect(mediaDetails.type).toStrictEqual("video");
    expect(mediaDetails.source).toStrictEqual("html5");
  });
  test("expect mediaResult to return youtube", () => {
    const mediaDetails = media.detect("dQw4w9WgXcQ");
    expect(mediaDetails.type).toStrictEqual("video");
    expect(mediaDetails.source).toStrictEqual("youtube");
  });
  test("expect mediaResult to return viemo", () => {
    const mediaDetails = media.detect("148751763");
    expect(mediaDetails.type).toStrictEqual("video");
    expect(mediaDetails.source).toStrictEqual("vimeo");
  });
});

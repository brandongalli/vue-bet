const resemble = require('node-resemble-js')
const fs = require('fs')
function compareImages (image1, image2, percentage) {
  return new Promise(function (resolve, reject) {
    resemble(image1)
      .compareTo(image2)
      .onComplete(function (data) {
        if (data.misMatchPercentage > percentage) {
          resolve(true)
        } else {
          reject()
        }
      })
  })
}

function isPlaying(url, fileName) {
  browser.url(url)
  //waits for two seconds to allow the video to fully load
  browser.pause(2000)
  const playButton = $('button[data-plyr="play"]')
  playButton.click();
  //waits four seconds before taking a screen shot to allow the player controls and title to go away
  browser.pause(4000)
  let screen1 = browser.saveScreenshot(`./${fileName}Before.png`)
  //waits five seconds for the video to play partially
  browser.pause(5000)
  let screen2 = browser.saveScreenshot(`./${fileName}After.png`)
  return browser.call(() => {
    return compareImages(screen1, screen2, 5.0)
  })
}
function checkOverlay(url){
  browser.url(url)
  browser.pause(5000)
  const time = $('.debugTime').getText().split(':')[2]
  expect(Number(time)).toBeGreaterThan(1)
  const firstEventImageURL = browser.execute(() => {
    return window.SourceDigital.config.events[0].dataObject.mainImageUrl
  })
  const activation = $('img[src="' + firstEventImageURL + '"]').isDisplayed()
  return activation
}

describe('Uptime test', () => {
  it('WAS HTML5 Video PROD', () => {
    expect(isPlaying('https://experience.sourcesync.io/34', 'HTML5Prod')).toBe(true)
  })
  it('WAS Iframe Video PROD', () => {
    expect(isPlaying('https://experience.sourcesync.io/3', 'IframeProd')).toBe(true)
  })
  it('WAS Overlay PROD', () => {
    expect(checkOverlay('https://experience.sourcesync.io/live-x-live-ccmf')).toBe(true)
  })
  it('WAS HTML5 Video STG', () => {
    expect(isPlaying('https://experience-stg.sourcesync.io/34', 'HTML5Stg')).toBe(true)
  })
  it('WAS Iframe Video STG', () => {
    expect(isPlaying('https://experience-stg.sourcesync.io/3', 'IframeStg')).toBe(true)
  })
  it('WAS Overlay STG', () => {
    expect(checkOverlay('https://experience-stg.sourcesync.io/live-x-live-ccmf-stg')).toBe(true)
  })
})

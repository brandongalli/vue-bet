function getParameter(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

describe('Test Google Analytics on WAS', () => {
  it('Should work on every activation', () => {
    browser.setTimeout({ 'implicit': 20000 })
    const mockGA = browser.mock('https://www.google-analytics.com/**')
    // The URL will have to be changed to wherever you are testing but it must be the live x live due to the test setup.
    // It will also need changed on line 47
    browser.url('https://experience-stg.sourcesync.io/live-x-live-ccmf-stg')
    browser.pause(500)
    expect(mockGA.calls.length).toBe(6)
    const activations = browser.execute(() => {
      return window.SourceDigital.config.events
    })
    for(let i = 0; i < activations.length; i++){
      let imageUrl = activations[i].dataObject.mainImageUrl
      let button = $('img[src="' + imageUrl + '"]')
      button.waitForDisplayed()
      browser.pause(500)
      let calls = mockGA.calls.length
      let gaURL = mockGA.calls[calls - 1].url
      let eventType = getParameter('ea', gaURL)
      expect(eventType).toEqual('View')
      button.click();
      browser.pause(500)
      calls = mockGA.calls.length
      gaURL = mockGA.calls[calls - 1].url
      eventType = getParameter('ea', gaURL)
      expect(eventType).toEqual('Interact')
      let buttonText = activations[i].dataObject.data.buttonText
      console.log(buttonText)
      button = $("span*=" + buttonText)
      button.click()
      browser.pause(500)
      calls = mockGA.calls.length
      gaURL = mockGA.calls[calls - 1].url
      eventType = getParameter('ea', gaURL)
      expect(eventType).toEqual('Action')
      browser.pause(500)
      browser.url('https://experience-stg.sourcesync.io/live-x-live-ccmf-stg')
    }
  })
})

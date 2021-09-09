// Create the SourceDigitalEmbeds object to help developers see into what's going on within their page...
if (!window.SourceDigitalEmbeds) {
  var SourceDigitalEmbeds = {
  }
} else {
  console.warn('Warning: You have included SourceSync on your page more than once!')
}

// Loader for embeds...
(function ({ log, debug }) {
  var browser = 'browser'
  var ios = 'ios'
  
  // Creates a set of random hex digits "l" length
  function _r (l) {
    var r = ''
    var c = '0123456789abcdef'
    var cl = c.length
    for (var i = 0; i < l; i++) r += c.charAt(Math.floor(Math.random() * cl))
    return r
  }

  // Creates a v4 UUID (i.e. 43512a66-a7fe-4823-9f16-7469446ab98f)
  function uuid () {
    return _r(8) + '-' + _r(4) + '-' + '4' + _r(3) + '-' + _r(4) + '-' + _r(12)
  }

  // Loads a CSS file...
  function loadCSS (url) {
    var link = document.createElement('link')
    link.href = url
    link.type = 'text/css'
    link.rel = 'stylesheet'
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  // Loads a JavaScript file...
  function loadJS (url, id) {
    var scriptTag = document.createElement('script')
    scriptTag.src = url
    scriptTag.setAttribute('distribution', id)
    document.body.appendChild(scriptTag)
  }

  // Gets paramaters from the script URL or otherwise...
  function parameter (name, url) {
    if (!url) url = scriptName()
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    var results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  // Gets the name of this script in order to get parameters...
  function scriptName () {
    var error = new Error(),
      source,
      lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/),
      currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/)

    if ((source = lastStackFrameRegex.exec(error.stack.trim())) && source[1] !== '')
      return source[1]
    else if ((source = currentStackFrameRegex.exec(error.stack.trim())))
      return source[1]
    else if (error.fileName !== undefined)
      return error.fileName
  }

  // Gets optional embed settings from the URL...
  function getSettings () {
    log('Getting settings...')
    const server = parameter('server') ? parameter('server') : '[@@SERVER_HERE@@]'
    const tls = parameter('insecure') ? '' : 's'
    const port = parameter('port') ? ':' + parameter('port') : ''
    const folder = parameter('folder') ? parameter('folder') + '/' : ''
    const settings = {
      url: `http${tls}://${server}${port}/${folder}`,
      attribute: parameter('attribute') ? 'data-sd-' + parameter('attribute') : 'data-sd-experience',
      instant: !!parameter('instant'),
      debug: !!parameter('debug'),
      debugColor: parameter('debugColor') || 'red',
      stylePrefix: parameter('stylePrefix') ? parameter('stylePrefix') : 'SourceDigital',
      noMinimum: !!parameter('noMinimum'),
      hidden: !!parameter('hidden'),
      width: parameter('width') ? parseInt(parameter('width')) : '',
      height: parameter('height') ? parseInt(parameter('height')) : ''
    }
    if (!parameter('nomin')) {
      if (settings.width < 480) settings.width = 480
      if (settings.height < 270) settings.height = 270
    }
    settings.namespace = parameter('attribute') || 'experience'
    return settings
  }

  function toggleFullScreen (iframe, data) {
    const { isIos, value } = data
    const stylePrefix = experience.settings.stylePrefix
    if (value === 'enter' && isIos) {
      iframe.classList.remove(`${stylePrefix}_${browser}`)
      iframe.classList.add(`${stylePrefix}_${ios}`)
    } else {
      iframe.classList.remove(`${stylePrefix}_${ios}`)
      iframe.classList.add(`${stylePrefix}_${browser}`)
    }
    iframe.style = ''
  }

  function processEvent (e, iframe) {
    // Only process messages coming from the same origin...
    if (e.origin !== window.location.origin) return
    log('Got event', e)
    const data = e && e.data ? e.data : {}
    if (iframe && data && data.value && iframe.src === data.value.src) {
      log({ embedder: `iframe id : ${iframe.id}`, data })
    }

    if (data.context === 'SourceDigital') {
      switch (data.message) {
        case 'fullscreen':
          data.ios && toggleFullScreen(iframe, data)
          break
        case 'loadJS':
          loadJS(data.src, iframe.id)
          break
        case 'loadCSS':
          loadCSS(data.src)
          break
        default: log(`${data.method} is not supported`)
      }
    }
  }

  function findExperiences (namespace) {
    const { settings, distributions } = namespace

    const attr = settings.attribute
    log('Finding experiences with these settings:', settings)
    document.querySelectorAll('[' + attr + ']').forEach(function (e) {
      var domId = uuid()
      var id = e.getAttribute(settings.attribute)
      log(`Embedder ${attr} assigned "${id}" id "${domId}"`)
      window.addEventListener('message', (e) => processEvent(e, iframe))
      distributions.push({ domId: domId, id: id })
      // e.id = domId
      const Edomid = document.createAttribute(`${attr}-id`)
      Edomid.value = domId
      e.setAttributeNode(Edomid)
      const { stylePrefix, noMinimum, hidden, width, height, debug, debugColor } = settings
      const debugStyle = debug ? `border: 10px solid ${debugColor};` : ''

      let size = (width && height) ? `min-width:${width}px;min-height:${height}px;` : ''
      if (hidden) size = 'width:0px;height:0px;'

      const iframe = document.createElement('iframe')
      iframe.src = `${settings.url}${id}?embed=true&embedId=${domId}&debug=${settings.debug}`
      iframe.style = `${size}border:none;${debugStyle}`

      // appending styles
      const styles = `
        .${stylePrefix}_${browser}: { ${size} }
        .${stylePrefix}_${ios}: {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
          border: none;
          margin: 0; padding: 0;
          overflow: hidden; z-index: 99999
        }
      `
      const style = document.createElement('style')
      style.innerHTML = styles
      document.querySelector('head').appendChild(style)

      iframe.classList.add(`${stylePrefix}_${browser}`)
      iframe.setAttribute('allowFullScreen', '')
      e.appendChild(iframe)
    })
  }
  // Pull settings from the URL...
  let namespace = {
    settings: getSettings(),
    distributions: []
  }
  window.SourceDigitalEmbeds[namespace.settings.namespace] = namespace
  
  if (!namespace.settings.debug) log = function () {}
  log('SourceSync.io is running on your page!', namespace.settings)

  // Do this when the content finishes loading...
  if (namespace.settings.instant) {
    findExperiences(namespace)
  } else {
    document.addEventListener('DOMContentLoaded', function () { findExperiences(namespace) })
  }
})(console)

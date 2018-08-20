/*
  SOURCE DIGITAL EXAMPLE CODE - PUBLIC DOMAIN / NO LICNESE / NO WARRANTY

  Implementing industry-standard messaging for content players using Player.js and Vue

  Overview:
  Source Digital offers 3 ways to integrate their platform:
  1) Frames - Simple, secure, standard and separate. 1 line to include content.
  2) Embedding - Full set of features.
  3) Messaging - Allows you to interact with Source Digital using your existing players/features.

  Details:

  This example uses Player.js to implement messaging. We recommend Player.js for messaging because
  it is currently the most popular and widely supported messaging standard for content players.

  Player.js is an industry-standard method for linking content players (like video or
  audio players) with 3rd parties (like Source Digital, Microsoft, YouTube, etc). Other 3rd parties
  like YouTube also emit and respond to Player.js messages, allowing you to implement cool features
  with their products.

  Player.js offers full-duplex communication (send/recieve at the same time). This means
  your content player can talk to the 3rd party, and the 3rd party can talk to your
  content player.

  Player.js is agnostic to any content player, meaning you can play audio, video,
  streams, or anything else you can imagine; the player itself can be written in
  any language, use any platform, and appear in any way in a users device.

  Player.js is extremely light-weight. The complete package is 3.8k minfied/gzipped

  Player.js uses named message "types", meaning if you want to implement something
  non-standard, you can just create your own type.

  Player.js uses generic "payloads", meaning if you want to send or listen for
  non-standard information, you can just add the thing you need, and you don't have
  to worry about architecture or scaling issues. It won't hurt anything.

  Player.js offers some standard payloads in their spec. This is so that you can
  simply support the "Player.js" message type, and you will know you can interact
  with any other platform that also suppors the Player.js standard messages. This
  means if your content player speaks "Player.js", someone else can control it if
  you want them to.

  Source Digital supports the complete Player.js specifications. All demos on the
  Player.js website work with our platform.

  --------------------------------------------------------------------------------

  To respond to requests simply create events for: 'player.js:eventNameHere'
 */

import playerjs from 'player.js'
/*
window.onmessage = (event) => {
  // this.$store.commit('config/setTime', event.data.time)
  // this.$app.content.currentTime = event.data.time
  console.log(`Received overlay message: ${JSON.stringify(event.data)}`)
}
*/
const supported = {
  events: [
    'ready',
    // 'play',
    // 'pause',
    // 'ended',
    'timeupdate',
    // 'progress',
    'error',
    'click',
    'activation'
  ],
  methods: [
    'play',
    'pause',
    // 'getPaused',
    // 'mute',
    // 'getMuted',
    // 'setVolume',
    // 'getVolume',
    // 'getDuration',
    'setCurrentTime',
    'getCurrentTime',
    // 'setLoop',
    // 'getLoop',
    'removeEventListener',
    'addEventListener',
    'reboot',
    'orientation'
  ]
}

// Patch the bug in reciever.js line 78 so we can support our own methods...
playerjs.METHODS.all = function () { return supported.methods }

// reciever listens for any player.js messages...
const receiver = new playerjs.Receiver(supported.events, supported.methods)
// const receiver = new playerjs.Receiver()

/*
function resp (value) {
  console.log(value)
}

const myEvents = [
  'play',
  'pause',
  'getDuration',
  'getVolume',
  'setVolume',
  'mute',
  'unmute',
  'getMuted',
  'getLoop',
  'setLoop'
]

supported.methods.forEach(event => {
  receiver.on(event, e => resp(e))
})
receiver.on('play', e => { console.log('WOO PLAY') })
receiver.on('pause', e => { console.log('WOO PAUSE') })
// receiver.on('addEventListener', e => { console.log('WOOt!') })
receiver.ready()
*/

export default (dependancies) => {
  const { Vue } = dependancies

  const { $event, $bus, $debug, $console } = Vue.prototype
  const debug = $debug.extend('Player.js')
  // TODO: Add your own non-standard events here...
  const myEvents = [
    'play',
    'pause',
    'getDuration',
    'getVolume',
    'setVolume',
    'mute',
    'unmute',
    'getMuted',
    'getLoop',
    'setLoop',
    'setCurrentTime'
  ]

  // Loop through each event above, and bind them to the player.js reciever
  myEvents.forEach(event => {
    function binder (event, payload) {
      debug('Recieved Player.js message', event)
      $bus.emit('playerjs', { event, payload })
    }
    receiver.on(event, (e) => binder(event, e))
    // receiver.on('setCurrentTime', (e) => $bus.emit('playerjs_setCurrentTime', e))
  })
  // ready
  $event.on('mediaready', () => {
    receiver.ready()
    receiver.methods.setLoop(false)
  })
  // play
  $event.on('mediaplay', () => {
    receiver.methods.play()
  })
  // pause
  $event.on('mediapause', () => {
    receiver.methods.pause()
  })
  // mute
  $event.on('mediamute', () => {
    $event.emit('playerjs_mute')
    receiver.methods.mute()
  })
  // unmute
  $event.on('mediaunmute', () => {
    $event.emit('playerjs_unmute')
    receiver.methods.unmute()
  })
  // setVolume
  $event.on('mediavolumechange', (data) => {
    $event.emit('playerjs_setVolume', data)
    if (data.v === 0) {
      $event.emit('playerjs_mute')
      receiver.methods.mute()
    } else {
      receiver.methods.unmute()
      receiver.methods.setVolume(data.v)
    }
  })
  // getVolume
  $event.on('playerjs_getVolume', (player) => {
    receiver.methods.getVolume(data => {
      data(player.volume)
    })
  })
  // setLoop
  $event.on('playerjs_setLoop', (value) => {
    receiver.methods.setLoop(value)
  })
  // getloop
  $event.on('playerjs_getLoop', (player) => {
    receiver.methods.getLoop((data) => {
      data(player.loop)
    })
  })
  // get duration
  $event.on('playerjs_getDuration', (player) => {
    receiver.methods.getDuration(callback => {
      callback(player.duration)
    })
  })
  // setCurrentTime
  $event.on('mediaseeking', (data) => {
    receiver.emit('setCurrentTime', data.t)
  })
  // get muted custom
  $event.on('mediagetmuted', (data) => {
    receiver.methods.getMuted((callback) => {
      callback(receiver.volume)
    })
    if (data.v === 0.0) {
      $event.emit('playerjs_getMuted', true)
    } else {
      $event.emit('playerjs_getMuted', true)
    }
  })
  // timeupdate custom
  $event.on('mediatimeupdate', () => {
    receiver.emit('timeupdate', (data) => {
      $bus.emit('playerjs_timeupdate', data)
    })
  })

  // Listen for the window event...
  window.addEventListener('message', (event) => {
    let msg = ''
    try {
      msg = JSON.parse(event.data)
    } catch (error) {
      return
    }
    if (msg.context !== 'player.js') return
    // console.warn('>>>', msg)
    switch (msg.method) {
      case 'addEventListener':
        $console.log(`>> Player.js: addEventListener(${msg.value})`)
        canSend[msg.value] = true
        break
      case 'removeEventListener':
        $console.log(`>> Player.js: removeEventListener(${msg.value})`)
        canSend[msg.value] = false
        break
    }
  })
  function _recieveMessage (name, value = undefined) {
    /*
    let willWork = canSend[name] ? 'Pass' : 'Fail'
    $console.log(`Player.js: ${name}(${willWork})`)
    if (canSend[name]) $bus.emit('playerjs_' + name, value)
    */
    let dValue = value
    if (typeof dValue === 'object') dValue = JSON.stringify(dValue)
    if (typeof dValue === 'function') dValue = '[callback]'
    if (!dValue) dValue = ''
    $console.log(`>> Player.js: ${name}(${dValue})`)
    $bus.emit('playerjs_' + name, value)
  }
  function _listenForEvents (names) {
    names.forEach(name => {
      receiver.on(name, e => _recieveMessage(name, e))
    })
  }
  function _canSend (name) {
    if (canSend[name]) return true
    return false
  }
  function sendMessage (name, value) {
    if (name === 'ready') receiver.ready()
    let sending = false
    if (_canSend(name)) sending = true
    // console.warn('<< Player.js', name, value, sending)
    if (sending) {
      let dValue = value
      if (typeof dValue === 'object') dValue = JSON.stringify(dValue)
      if (!dValue) dValue = ''
      $console.log(`<< Player.js: ${name}(${dValue})`)
      if (name !== 'ready') receiver.emit(name, value)
    } else {
      // $console.log(`xx Player.js: ${name}(${value})`)
    }
  }
  const canSend = { ready: true, reboot: true }
  // Listen for player.js messages...
  // Vue.prototype.$playerjs = receiver
  Vue.prototype.$playerjs = sendMessage

  _listenForEvents(supported.methods)
  // playerjs.addEvent(window)
  return receiver
}

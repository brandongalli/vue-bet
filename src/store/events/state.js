// Absolute minimum configuration needed to boot.  The rest of the config will come from the server.
export default {
  media: [
    'progress',
    'playing',
    'play',
    'pause',
    'timeupdate',
    'volumechange',
    'seeking',
    'seeked',
    'ratechange',
    'ended',
    'enterfullscreen',
    'exitfullscreen',
    'captionsenabled',
    'captionsdisabled',
    'languagechange',
    'controlshidden',
    'controlsshown',
    'ready'
  ],
  user: [
    'activity',
    'interaction',
    'geolocationchange',
    'devicemovement'
  ]
}

// Default config...

import { uid } from 'quasar'
import { window } from '../../../window'
const uuid = () => {
  let uuid = uid()
  return uuid.substr(0, 14) + '4' + uuid.substr(15)
}

// Use the dev environment if nothing was set...
const servers = {
  gateway: 'https://hello.sourcesync.io/api',
  api: 'https://api-dev.sourcesync.io/',
  pulse: 'https://api-dev.sourcesync.io/pulses/',
  host: 'https://experience-dev.sourcesync.io/#/'
}

// Allows for unit tests otherwise window.SourceDigital is undefined using vue-test-utils
let target
if (process.env.SOURCE_TARGET) target = process.env.SOURCE_TARGET
else target = window.SourceDigital ? window.SourceDigital.build.target : 'localhost'

// Set the server environment...
switch (target) {
  case 'localhost':
    servers.api = 'http://localhost:1337/'
    servers.pulse = 'http://localhost:1337/pulses/'
    servers.host = 'http://localhost:8080/#/'
    break
  case 'local_develop':
    servers.api = 'http://localhost:1337/'
    servers.pulse = 'http://localhost:1337/pulses/'
    servers.host = 'http://localhost:8080/#/'
    break
  case 'demo':
    servers.api = 'https://api-demo.gamesync.io/'
    servers.pulse = 'https://api-demo.gamesync.io/pulses/'
    servers.host = 'https://experience-demo.gamesync.io/#/'
    break
  case 'development':
    servers.api = 'https://api-dev.gamesync.io/'
    servers.pulse = 'https://api-dev.gamesync.io/pulses/'
    servers.host = 'https://experience-dev.gamesync.io/#/'
    break
  case 'staging':
    servers.api = 'https://api-stg.gamesync.io/'
    servers.pulse = 'https://api-stg.gamesync.io/pulses/'
    servers.host = 'https://experience-stg.gamesync.io/#/'
    break
  case 'unstable':
    servers.api = 'https://api-unstable.gamesync.io/'
    servers.pulse = 'https://api-unstable.gamesync.io/pulses/'
    servers.host = 'https://experience-unstable.gamesync.io/#/'
    break
  case 'production':
    servers.api = 'https://api.gamesync.io/'
    servers.pulse = 'https://api.gamesync.io/pulses/'
    servers.host = 'https://experience.gamesync.io/#/'
    break
  case 'prime':
    servers.api = 'https://api-prime.gamesync.io/'
    servers.pulse = 'https://api-prime.gamesync.io/pulses/'
    servers.host = 'https://prime.gamesync.io/#/'
    break
}

export default {
  config: 'sourceSyncV1.0',
  source: window.SourceDigital,
  timing: {
    // The amount of times to update the app state.
    // Higher values mean faster updates on newer devices but slower performance on older devices.
    tick: 100,
    // The amount to throttle fast events like focus.
    throttle: 250,
    // The time to wait between sending pulses.
    pulse: 10000,
    activity: {
      counts: {
        5: 'extreme',
        3: 'moderate',
        1: 'light',
        0: 'inactive'
      },
      interval: 5000
    }
  },
  debug: 'sd', // Put a localStorage item "debug" with "exp:*" in it to view debug statements
  loaded: false, // We aren't loaded yet.
  error: false,
  errorMessage: '',
  server: servers.api,
  pulse: servers.pulse,
  gateway: servers.gateway,
  host: servers.host,
  sourceExperienceSession: 'https://source-experience.myciright.com/api/sessions',
  sourceExperienceConsume: 'https://source-experience.myciright.com/api/consume',
  url: JSON.parse(JSON.stringify(window.location.href)),
  admin: {

  },
  app: {
    settings: {
      lockSettings: [
        'meta.source'
      ],
      meta: {
        names: {
          productions: 'Productions',
          distributions: 'Distributions',
          activations: 'Activations',
          properties: 'Properties',
          organizations: 'Organizations',
          domains: 'Domains',
          platform: 'SourceSync',
          apps: 'Experience Apps',
          builder: 'Form Builder'
        },
        source: {
          // Alpha and Beta feature settings go here. This is locked at the source code level; no users can change it.
        },
        clientSettings: {
          ratings: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
          genres: ['Action', 'Adventure', 'Animated', 'BET Preferred', 'Comedy', 'Documentary', 'Drama', 'Family', 'Horror', 'Independent', 'Musical', 'Mystery', 'N/A', 'Romance', 'Science Fiction', 'Special Interest', 'Suspense', 'Teen', 'Thriller', 'Urban', 'Western']
        },
        animation: {
          activation: {
            in: 'easeIn',
            out: 'easeOut'
          }
        }
      },
      behavior: {
        iOSFullscreenEmbedAnnouncement: false,
        iOSFullscreenEmbedBreakout: true,
        autoPlay: false,
        autoPlaywhenDirect: false,
        hideAnnouncements: false,
        hidePlayerControls: false,
        hideProgressBar: false,
        hideFilters: true,
        hidePersonalize: false,
        mute: false,
        preventPause: false,
        fab: false,
        openLinksInFrames: false,
        fomo: false,
        hideVideoInPortraitOnOverlay: false,
        hideSupport: false,
        hideDocs: false
      },
      live: {
        event: {
          messages: {
            pre: 'This event starts in ',
            post: 'This event occurred '
          },
          type: {
            redirect: {
              to: null
            }
          }
        }
      },
      debug: {
        enabled: process.env.NODE_ENV === 'development',
        borders: false,
        borderDepth: 1,
        borderThickness: 1,
        time: false,
        inline: false
      },
      ecommerce: {
        defaultProvider: 'shopify',
        providers: {
          shopify: {
            storefrontAccessToken: '3d8bdecca70760c87378595f03199e9d', // '7db0c95f4041f4ce56a090d9511d0b59',
            domain: 'iggy-azalea-shop.myshopify.com' // 'sourcedigitalstore.myshopify.com'
          },
          woocommerce: {
          },
          magento: {
          },
          fastSpring: {
          }
        }
      },
      layout: {
        template: {
          type: 'overlay'
        },
        activations: {
          details: {
            minWidth: '33.333%', // defaults
            maxWidth: '33.333%' // defaults
          },
          portrait: {
            text: {
              color: '#fff'
            }
          }
        },
        fab: {
          display: true
        },
        loading: {
          display: false
        },
        things: {
          lists: {
            video: {
              template: 'video',
              class: 'card-selection-list overflow-auto'
            },
            interactive: {
              template: 'interactive',
              class: 'card-selection-list overflow-auto'
            },
            cast: {
              template: 'cast',
              class: 'cast-list-grid column no-wrap overflow-auto'
            },
            gallery: {
              template: 'gallery',
              class: 'card-selection-list overflow-auto'
            },
            overlay: {
              template: 'bubble',
              class: 'relative-position index-9 q-pt-xl show-mobile-items bigger-padding-bottom'
            },
            footer: {
              template: 'rigid',
              class: ''
            }
          }
        }
      },
      pulse: {
        enabled: true,
        url: servers.pulse,
        hooks: { // You can define pulse hooks here.
        }
      },
      whisper: {
        enabled: false
      }
    },
    layout: {
      underlay: {
        height: 0,
        width: 0,
        visible: false
      },
      platform: {},
      screen: {},
      orientation: null
    },
    triggers: {
    },
    // Defaults...
    session: {
      id: uuid(),
      time: 0,
      distribution: 0,
      visibleEvents: [],
      invisibleEvents: []
    },
    content: {
      cover: 'https://cdn.sourcesync.io/uploads/default-cover.jpg',
      media: 'C9PJjsRSYmA',
      currentTime: 0,
      playing: false,
      loading: false,
      volume: 0,
      speed: 0,
      ratio: '4:3',
      language: 'en',
      ready: false
    },
    user: {
      cart: [],
      id: 1,
      photo: { url: '' },
      role: { id: 1, name: 'Public', description: 'Public user', type: 'public' },
      settings: {
        user: {
          demographics: {
            age: null,
            income: null,
            rent: null,
            children: null,
            relationship_options: ['Single', 'Married', 'Divorced', 'Widowed', 'Other']
          },
          locations: {
            home: { lat: 0, long: 0 },
            work: { lat: 0, long: 0 }
          },
          likes: {
            film: [
              'Horror',
              'SciFi',
              'Comedy',
              'Action',
              'Western',
              'Crime',
              'Adventure',
              'Animation',
              'Noir',
              'Thriller',
              'Documentary',
              'Romance',
              'Mystery',
              'War',
              'Musical',
              'Biographical',
              'Drama',
              'Indie',
              'Sports',
              'Martial Arts',
              'Silent',
              'Dark',
              'Fantasy',
              'Mockumentary',
              'Art',
              'Parody',
              'Satire',
              'Science',
              'Anime',
              'Cult film',
              'Slapstick'
            ],
            music: [
              'Hip hop',
              'theater',
              'country',
              'soul',
              'reggae',
              'alternative',
              'rock',
              'folk',
              'classical',
              'electronic',
              'dance',
              'funk',
              'pop',
              'blues',
              'house',
              'techno',
              'jazz',
              'heavy metal',
              'punk',
              'disco',
              'gospel',
              'swing',
              'dubstep',
              'rap',
              'ambient',
              'trance',
              'world',
              'Ska',
              'orchestra',
              'drum and bass',
              'hardcore',
              'indie',
              'bluegrass',
              'industrial',
              'psychedelic',
              'progressive',
              'easy listening',
              'emo',
              'jazz fusion',
              'trap',
              'new wave',
              'hardcore punk',
              'k-pop',
              'Africa'
            ]
          }
        }
      },
      activity: {
        current: '',
        previous: [],
        level: 'inactive',
        lookingAt: { x: 0, y: 0 },
        thing: false
      },
      name: {
        first: 'New',
        last: 'User'
      },
      age: 0,
      favorite: {
        retailers: [],
        colors: [],
        categories: []
      },
      location: {
        residence: {
          lat: 0,
          lng: 0,
          placeId: '',
          nearestCity: '',
          zip: '',
          area: ''
        },
        current: {
          lat: 0,
          lng: 0,
          placeId: '',
          nearestCity: '',
          zip: '',
          area: ''
        }
      },
      content: [
        {
          type: 'video',
          label: 'Videos',
          items: []
        },
        {
          type: 'table',
          label: 'Tables',
          items: []
        },
        {
          type: 'grid',
          label: 'Grids',
          items: []
        }
      ]
    }
  }
}

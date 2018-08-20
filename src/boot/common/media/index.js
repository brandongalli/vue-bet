// import { extend } from 'quasar'
import { util } from 'experience-engine'

// Media strategies...
const extensions = {
  'mp4': { type: 'video', source: 'html5' },
  'mp3': { type: 'audio', source: 'mp3' },
  'ogg': { type: 'audio', source: 'ogg' },
  'youtube': { type: 'video', source: 'youtube', detector: media => media.length === 11 }, // YouTube video ids are always 11 chars long
  'vimeo': { type: 'video', source: 'vimeo', detector: media => media > 0 }, // Vimeo vidio ids are always numbers
  'legacy': { type: 'video', source: 'html5', detector: media => media.includes('/') }, // Legacy video must always include :clientId/:productionId
  'vr': { type: 'video', source: 'vr' },
  'ar': { type: 'video', source: 'ar' },
  'default': 'mp4'
}

// Default "player" so rules still have something to work off of in case no player loads for an experience...
let _reference = {
  currentTime: 0,
  playing: false,
  loading: false,
  volume: 0,
  speed: 0,
  ratio: '0:0',
  language: null
}

export default (dependancies) => {
  return {
    // exposes the player reference...
    ref: _reference,
    // Detects the media type based on the string passed...
    detect (media) {
      const defaultResult = extensions[extensions.default]
      if (!media) return defaultResult
      const extension = media.split('.').pop() // Get the extension if there is one
      const strategy = util.get(extensions, extension)
      if (strategy) return strategy // If there's a match, we're done
      let found = defaultResult
      Object.keys(extensions).forEach(ext => { // If no direct match, check each detector
        if (extensions[ext].detector && extensions[ext].detector(media)) found = ext
      })
      return extensions[found]
    }
  }
}

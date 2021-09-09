// import { extend } from 'quasar'
import { date } from 'quasar'
import { util } from 'experience-engine'
const { diff, clone, isEqual, toHumanTime } = util

// Returns the time elapsed since the date provided in human time or seconds...
function timeSince (when, human = true) {
  // For IOS to read the date
  let converted = when.replace(/-/g, '/')
  const seconds = date.getDateDiff(new Date(), converted, 'seconds')
  return human ? toHumanTime(seconds) : seconds
}

function timeUntil (when, human = true) {
  const seconds = timeSince(when, false)
  return human ? toHumanTime(seconds) : -seconds
}

function ucFirst ([ first, ...rest ], locale = navigator.language) {
  return [ first.toLocaleUpperCase(locale), ...rest ].join('')
}

export {
  diff,
  clone,
  isEqual,
  toHumanTime,
  timeSince,
  timeUntil,
  ucFirst
}

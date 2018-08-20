// Returns the time in MS since the experience started, media playing or not
const startTime = new Date()
export function counter (state) {
  return new Date() - startTime
}

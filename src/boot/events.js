import EventEmitter2 from 'eventemitter2'
import debug from 'components/debug'
import vConsole from 'components/console'

const events = (dependencies) => {
}

const borderStyles = [
  // 0
  'solid white',
  // 1
  'solid red',
  // 2
  'solid blue',
  // 3
  'solid green',
  // 4
  'dashed red',
  // 5
  'dashed blue',
  // 6
  'dashed green',
  // 7
  'dotted red',
  // 8
  'dotted blue',
  // 9
  'dotted green'
]

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { Vue } = dependencies

  const event = new EventEmitter2({
    // set this to `true` to use wildcards. It defaults to `false`.
    wildcard: true,
    // the maximum amount of listeners that can be assigned to an event, default 10.
    maxListeners: 20,
    // show event name in memory leak message when more than maximum amount of listeners is assigned, default false
    verboseMemoryLeak: true
  })

  // Make the bus itself available...
  Vue.prototype.$event = event
  Vue.prototype.$bus = event

  // Where the platform commands go...
  Vue.prototype.$console = {
    commands: []
  }

  Vue.component('debug', debug)
  Vue.component('console', vConsole)

  // const debug = Debug('sd:debug')
  // Add a global mixin:
  Vue.mixin({
    mounted () {
      // let name = this.$options.name
      // if (!name) console.warn('All components should all be named. Failing to do so will result in difficulty debugging later.')

      // Register commands on components...
      function register (name, payload, instance) {
        // Run the payload to set up the command and get it's guide and function...
        var config = payload.bind(instance)()
        name = name.toLowerCase()
        // console.log(name, config)
        instance.$console.commands[name] = { guide: config.guide, command: config.command.bind(instance) }
      }

      // Setup debug settings if they exist...
      if (this.$options.debug && this.$app.settings.debug.enabled) {
        this.debug('(auto notification) Mounted')
        // console.log('Mounted', this.$options.name)
        // Set a debug border if required...
        if (this.$app.settings.debug.borders) {
          const thickness = this.$app.settings.debug.borderThickness || 1
          const depth = this.$app.settings.debug.borderDepth || 1
          const thisDepth = this.$options.debug.depth || 0
          const style = this.$options.debug.border || borderStyles[thisDepth]
          // Actually apply the style...
          if (depth >= thisDepth) this.$options._parentVnode.elm.style.border = `${thickness}px ${style}`
          // Make the color used available...
          this.debugData.color = style.split(' ')[1]
          // console.log('DEPTH', depth, thisDepth, '"' + style.split(' ')[1] + '"', this.debugData)
        }
      }
      // Register events if they exist...
      if (this.$options.events) {
        const that = this
        Object.keys(this.$options.events).forEach(event => { this.$event.on(event, this.$options.events[event].bind(that)) })
      }
      // Register realtime events if they exist...
      if (this.$options.realtime) {
        const that = this
        Object.keys(this.$options.realtime).forEach(event => { this.$socket.on(event, this.$options.realtime[event].bind(that)) })
      }
      // Register commands if they exist...
      if (this.$options.commands) {
        Object.keys(this.$options.commands).forEach(command => register(command, this.$options.commands[command], this))
      }
    },
    beforeDestroy () {
      if (this.$options.debug && this.$app.settings.debug.enabled) {
        this.debug('(auto notification) Destroyed')
      }
      if (this.$options.events) {
        // unregister events...
        Object.keys(this.$options.events).forEach(event => { this.$event.on(event, this.$options.events[event]) })
      }
      // Register realtime events if they exist...
      if (this.$options.realtime) {
        // unregister realtime events...
        Object.keys(this.$options.realtime).forEach(event => { this.$event.on(event, this.$options.realtime[event]) })
      }
    },
    data () {
      if (this.$app.settings.debug.enabled && this.$options.debug && this.$options.debug.context) {
        // Inline debugging...
        if (this.$app.settings.debug.inline) {
          return {
            debug (...args) {
              let message = [...args].join(' ')
              if (message === this.debugData.lastMessage) {
                this.debugData.lastMessage = message
                this.debugData.dupeCount++
                message += `(${this.debugData.dupeCount})`
                this.debugData.message = message
              } else {
                this.debugData.lastMessage = JSON.parse(JSON.stringify(this.debugData.message))
                this.debugData.message = message
              }
              // this.debugData.messages.push(message)
            },
            debugData: {
              message: '',
              lastMessage: '',
              dupeCount: 0
              // messages: []
            }
          }
        // Console debugging...
        } else {
          return { debug: this.$debug.extend(this.$options.debug.context), debugData: { dupeCount: 0, message: '' } }
        }
      } else {
        return { debug: () => {}, debugData: {} }
      }
    }
  })

  // Provide the event framework...
  Vue.prototype.$events = events(dependencies)
}

<template>
  <div id="AppLayoutLoader">
    <debug />
    <component :is="'layout-'+layout" />
  </div>
</template>

<script>
import layoutLbar from 'layouts/LBar'
import layoutFull from 'layouts/Full'
import layoutOverlay from 'layouts/Overlay'
import layoutSecondscreen from 'layouts/SecondScreen'

export default {
  name: 'LayoutLoader',
  components: {
    layoutLbar,
    layoutFull,
    layoutOverlay,
    layoutSecondscreen
  },
  data () {
    return {
      debug: this.$debug.extend('layout-loader')
    }
  },
  computed: {
    layout () {
      let layouts = ['lbar', 'overlay', 'full', 'secondscreen']
      let layout = this.$common.get(this.$app, 'settings.gamesync.layout.name')
      if (layouts.includes(layout.toLowerCase())) {
        this.debug(`Layout "${layout}" loaded`)
        return layout.toLowerCase()
      }
      this.debug(`Layout "${layout}" not found, using default ("${layouts[0]})"`)
      return layouts[0]
    }
  }
}
</script>

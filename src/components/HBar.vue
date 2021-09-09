<template>
  <q-toolbar>
    <!-- If this target has toggles, draw them -->
    <q-btn
      v-for="toggle in thisComponent.toggle" :key="toggle"
      flat dense round @click="$bus.emit('app.layout.areas.toggle', toggle)" aria-label="Menu" icon="menu"
    />
    <!-- draw things -->
    <thing-mini v-for="thing in things" :key="thing.id" class="q-ma-sm" :thing="thing" />
  </q-toolbar>
</template>

<script>
import ThingMini from 'components/things/ThingMini'
export default {
  name: 'h-bar',
  props: ['target', 'things'],
  components: {
    ThingMini
  },
  data () {
    return {
      layout: this.$store.state.config.app.settings.gamesync.layout
    }
  },
  computed: {
    thisComponent () {
      return this.layout.areas[this.target]
    }
  }
}
</script>

<template>
  <q-list dark>
    <!-- If this target has toggles, draw them -->
    <q-btn
      v-for="toggle in thisComponent.toggle" :key="toggle"
      flat dense round @click="$bus.emit('app.layout.areas.toggle', toggle)" aria-label="Menu" icon="menu"
    />
    <Sync v-if="syncing" :syncing="syncing" @syncState="syncState" />
    <!-- draw things -->
    <thing-menu v-else v-for="thing in things" :key="thing.id" class="q-ma-sm" :thing="thing" />
  </q-list>
</template>

<script>
import Sync from './Sync'
import ThingMenu from 'components/things/ThingMenu'
export default {
  name: 'v-bar',
  props: ['target', 'things'],
  components: {
    ThingMenu,
    Sync
  },
  data () {
    return {
      layout: this.$store.state.config.app.settings.gamesync.layout,
      syncing: true
    }
  },
  methods: {
    syncState (value) {
      this.syncing = value
    }
  },
  computed: {
    thisComponent () {
      return this.layout.areas[this.target]
    }
  }
}
</script>

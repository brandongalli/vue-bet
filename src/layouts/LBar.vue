<template>
  <q-layout :view="layout.view" :class="layout.class">
    <q-drawer side="left" v-model="layout.areas.left.show" :content-class="layout.areas.left.class">
      <v-bar target="left" :things="things" />
    </q-drawer>
    <q-drawer side="right" v-model="layout.areas.right.show" :content-class="layout.areas.right.class">
      <v-bar target="right" :things="things" />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-header v-if="layout.areas.top.show" :class="layout.areas.top.class">
      <h-bar target="top" :things="things" />
    </q-header>
    <q-footer v-if="layout.areas.bottom.show" :class="layout.areas.bottom.class">
      <h-bar target="bottom" :things="things" />
    </q-footer>
  </q-layout>
</template>

<script>
import VBar from 'components/VBar'
import HBar from 'components/HBar'
export default {
  name: 'LayoutLBar',
  components: {
    VBar,
    HBar
  },
  data () {
    return {
      things: this.$store.state.config.app.events,
      layout: this.$store.state.config.app.settings.gamesync.layout
    }
  }
}
</script>

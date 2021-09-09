<template>
  <q-layout :view="layout.view" :class="layout.class">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutFull',
  data () {
    return {
      layout: this.$store.state.config.app.settings.gamesync.layout
    }
  }
}
</script>

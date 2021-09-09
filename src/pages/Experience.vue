<template>
  <q-page style="overflow: hidden;">
    <iframe :src="frameSource" border=0 style="border:none;width:100%;min-height:inherit;" allow="autoplay"/>
  </q-page>
</template>

<script>
export default {
  name: 'PageExperience',
  computed: {
    frameSource () {
      return 'https://experience.sourcesync.io/' + this.$app.settings.gamesync.distribution || 'default'
    }
  }
}
</script>

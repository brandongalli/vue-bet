<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{$config.app.title}}
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          @click="handleClose"
          aria-label="Close"
        >
          <q-icon name="close" />
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL,
    handleClose () {
    }
  }
}
</script>

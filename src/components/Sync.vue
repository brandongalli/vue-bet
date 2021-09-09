<template>
    <div class="full-height row flex-center">
      <div class="text-center q-pa-md">
        <div class="text-h4 text-weight-light text-grey-5 q-mb-md">{{ loadText }}</div>
        <q-btn round :loading="loading" color="grey-4" @click="simulateProgress()" icon="graphic_eq">
          <template v-slot:loading>
            <q-spinner-gears />
          </template>
        </q-btn>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Sync',
  props: {
    syncing: Boolean
  },
  data () {
    return {
      loading: false,
      loadText: 'Search or Sync'
    }
  },
  methods: {
    simulateProgress () {
      this.loading = true
      this.loadText = 'Syncing'
      // simulate a delay
      setTimeout(() => {
        this.loading = false
        this.syncing = false
        this.$emit('syncState', this.syncing)
      }, 2000)
    }
  }
}
</script>

<template>
  <q-item tag="a" target="_blank" rel="noopener" :href="thing.data.url">
    <q-item-section avatar>
      <q-avatar>
        <img :src="thing.meta.thumbnail">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ thing.meta.name }}</q-item-label>
      <q-item-label caption>{{ thing.data.details }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'thingMenu',
  props: ['thing']
}
</script>

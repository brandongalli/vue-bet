<template>
  <q-card class="bg-red-9" flat bordered>
    <q-card-section horizontal>
      <q-card-section>
        {{ thing.meta.name }}
      </q-card-section>
      <q-img
        class="col-5"
        :src="thing.meta.thumbnail"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'thingMini',
  props: ['thing']
}
</script>

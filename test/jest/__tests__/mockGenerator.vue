<template>
  <span v-if="$app.settings.debug.enabled" class="debugWrapper">
    <span v-if="$app.settings.debug.inline" class="debugName" :style="{ 'background' : $parent.$data.debugData.color }">
      {{name}}{{showText}}{{message}}
    </span>
    <vue-json-pretty v-if="json" :data="json" :deep="level || 0" />
  </span>
</template>

<script>
  import VueJsonPretty from 'vue-json-pretty'

  export default {
    props: ['show', 'json', 'level'],
    components: { VueJsonPretty },
    computed: {
      showText () {
        if (this.show) return ` (${this.show})`
        return ''
      },
      color () {
        return this.$parent.$data.debugData.color
      },
      name () {
        return this.$parent.$options.name
      },
      message () {
        if (this.$parent.$data.debugData.message) return `:${this.$parent.$data.debugData.message}`
        return ''
      },
      test () {
        this.$data.someFunction()
        this.someFunction()
        this.$parent.$data.debugData.someFunction()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .debugWrapper
    position relative
    left 0
    top: 0
    z-index 99999
    font-size 10px

  .debugName
    margin 0
    padding 0
</style>

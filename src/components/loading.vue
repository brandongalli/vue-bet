<template>
  <div>
    <div v-if="$app.settings.layout.loading.display" class="column items-center fixed-center text-white fade-in" style="animation-duration: 0.25s">
      <q-spinner color="primary" size="32px" :thickness="5" style="margin: 1rem" />
      <p>v{{source.build.version}} {{$t('pleaseWait')}}</p>
      <p>{{$route.params.experience}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      source: window.SourceDigital
    }
  }
}
</script>

<style lang="stylus" scoped>
  .fade-in
    opacity 1
    animation-name fadeInOpacity
    animation-iteration-count 1
    animation-timing-function ease-in
    animation-duration 2s
  @keyframes fadeInOpacity
    0%
      opacity 0
    100%
      opacity 1
</style>

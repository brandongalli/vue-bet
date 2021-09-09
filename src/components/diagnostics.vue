<template>
  <div class="fade-in">
    <!-- When an error happened -->
    <div v-if="$config.error">
      <div class="welcome">
      </div>
      <div class="landing flex flex-center">
        <div>
          <h4>{{$t('pages.index.error')}}</h4>
          <h5>{{source.config.data.distribution.slug}}</h5>
          {{$config.errorMessage}}
          <p>v{{source.build.version}} ({{source.build.target}}) using {{source.sourceCodeApi}}</p>
        </div>
      </div>
    </div>
    <!-- When everything worked -->
    <div v-else>
      <div class="welcome">
      </div>
      <div class="landing flex flex-center">
        <div>
          <h4>{{$t('pages.index.welcome')}}</h4>
          <a href="https://docs.sourcedigital.net">{{$t('pages.index.setup')}}</a>
          <p>v{{source.build.version}}</p>
        </div>
      </div>
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

<style scoped>
  .welcome {
    width: 400vw;
    height: 400vh;
    top: 50%;
    left: 50%;
    margin-top: -200vh;
    margin-left: -200vw;
    background-size: 240px;
    animation: logo-rotate 200s linear infinite;
    backface-visibility: visible;
    background-color: #000;
    position: fixed;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTA2IDkwaDJ2MmgtMnpNNzQgNjNoMXYxaC0xek0yMyA2NmgxdjFoLTF6TTUwIDExMGgxdjFoLTF6TTYzIDEyOGgxdjFoLTF6TTQ1IDE0OWgxdjFoLTF6TTkyIDE1MWgxdjFoLTF6TTU4IDhoMXYxaC0xek0xNDcgMzNoMnYyaC0yek05MSA0M2gxdjFoLTF6TTE2OSAyOWgxdjFoLTF6TTE4MiAxOWgxdjFoLTF6TTE2MSA1OWgxdjFoLTF6TTEzOCA5NWgxdjFoLTF6TTE5OSA3MWgzdjNoLTN6TTIxMyAxNTNoMnYyaC0yek0xMjggMTYzaDF2MWgtMXpNMjA1IDE3NGgxdjFoLTF6TTE1MiAyMDBoMXYxaC0xek01MiAyMTFoMnYyaC0yek0wIDE5MWgxdjFIMHpNMTEwIDE4NGgxdjFoLTF6Ii8+PC9zdmc+);
  }
  .landing {
    text-align: center;
    color: white;
    position: relative;
    width: 100%;
    min-width: 200px;
    min-height: 100vh;
    padding: 40px;
  }
  .landing a {
    color: white;
    text-decoration: none;
  }
  @keyframes logo-rotate {
    to {
        transform: rotate(360deg)
    }
  }
  .fade-in {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 2s;
  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

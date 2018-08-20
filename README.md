# BETSource Application MVP

This was forked from the experience-engine repo on 6/15/21 by Nick Steele.

## Execution order
1. Base config: /front/quasar.conf.js executes, watches SOURCE_ENV to determine build environment. Writes into the config boot file.
2. Boot process: files listed in the above config file are executed from /front/src/boot/*
3. /front/src/index.template.html executes, using variables defined above. This file is only used in development.
4. /front/src/router/index.js executes (but does not route).
5. /front/src/store/index.js executes.
6. /front/src/App.vue executes.
7. The app tries to hydrate itself (an action in /front/src/store/config/actions.js), provides it via $config.
8. If the hydration process fails, /front/src/components/diagnostics.vue is shown, otherwise the router routes (loaded in #4 above).
9. /front/src/layouts/Loader.vue is loaded (which loads the hot layout defined in $app.settings.gamesync.layout)
10. The page requested is loaded from the router and injected into the layout using ```<router-view/>```

## Setup
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn run dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
yarn run build build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

// main.js

// This is needed ONLY if NOT chosen to import everything from Quasar
// when you installed vue-cli-plugin-quasar.

import Vue from 'vue'

import {
  Quasar,
  Notify
} from 'quasar'

Vue.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    [Object]: {
      /* look at QUASARCONFOPTIONS from the API card (bottom of page) */
    }
  }
})

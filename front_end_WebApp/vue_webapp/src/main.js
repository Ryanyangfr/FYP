// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueSession from 'vue-session';
import { store } from './store';

// import VueSocketio from 'vue-socket.io';

import * as VueGoogleMaps from 'vue2-google-maps'

library.add(faBars)
library.add(faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueMaterial)

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueSession);
// Vue.use(VueSocketio, 'http://54.255.245.23:3000/');
/* eslint-disable no-new */

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyAxCjFVo3ywy2FtsAHCXzz_4UJ5YS0fB9w',
//     libraries: 'places'
//   },
// })

new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})

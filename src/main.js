import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import { store } from './store'
import router from './router'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import './assets/css/main.css'
import './assets/css/multiselect.css'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import './assets/img/favicon-16x16.png'
import InfiniteLoading from 'vue-infinite-loading'
import RiptidesIcon from './components/RiptidesIcon.vue'
import SpotifyIcon from './components/SpotifyIcon.vue'

let VueScrollTo = require('vue-scrollto')

Vue.use(Vuetify, {
  icons: {
    'riptides': {
      component: RiptidesIcon
    },
    'spotify': {
      component: SpotifyIcon
    }
  }
})
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueScrollTo)
Vue.use(InfiniteLoading, {
  slots: {
    noResults: 'No more results',
    noMore: 'No more results',
  },
})
Vue.config.productionTip = false

axios.defaults.baseURL = process.env.API_URL;

let socketUrl = process.env.CHAT_SOCKET_URL;
let debug = process.env.NODE_ENV !== 'prod';

if (process.env.NODE_ENV === 'prod') {
  Vue.config.devtools=false
}

Vue.use(new VueSocketIO({
    debug: debug,
    connection: SocketIO(socketUrl, {
      query: {token: store.getters.headers.Authorization},
      path: '/socket/socket.io'
    }),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

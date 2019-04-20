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

let VueScrollTo = require('vue-scrollto')

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueScrollTo)
Vue.config.productionTip = false

axios.defaults.baseURL = process.env.API_URL;

let socketUrl = process.env.CHAT_SOCKET_URL;

Vue.use(new VueSocketIO({
    debug: true,
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

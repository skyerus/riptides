import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import index from './modules/index'
import user from './modules/user'

Vue.use(Vuex);

let debug = process.env.NODE_ENV !== 'prod';

if (process.env.NODE_ENV !== 'prod') {
  Vue.config.devtools = true
}

export const store = new Vuex.Store({
  modules: {
    index,
    user
  },
  strict: debug,
  plugins: [createPersistedState()]
});
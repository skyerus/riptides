const getDefaultState = () => {
  return {
    isLoggedIn: false,
    loginPopup: false,
    formError: '',
    headers: {
      "Content-Type": "application/json",
      "Authorization": ''
    },
    ajaxLoading: false,
    snackbar: {
      active: false,
      text: ''
    },
    config: {
      spotify: null
    }
  }
};

const state = getDefaultState();

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  loginPopup: state => state.loginPopup,
  snackbarActive: state => state.snackbar.active,
  snackbarText: state => state.snackbar.text,
  headers: state => state.headers,
  formError: state => state.formError,
  config: state => state.config,
  spotify: state => state.config.spotify,
};

const actions = {
  toggleLoggedIn({commit, state}, loggedIn) {
    this._vm.$socket.close();
    this._vm.$socket.io.opts.query = {token: this.getters.headers.Authorization};
    this._vm.$socket.open();
    commit('toggleLoggedIn', loggedIn);
  },

  switchLoginPopup({commit, state}, loginPopup) {
    commit('switchLoginPopup', loginPopup);
  },

  updateToken({commit, state}, token) {
    commit('updateToken', token);
  },

  hideSnackbar({commit, state}) {
    commit('toggleSnackbar', false);
    commit('snackbarText', '');
  },

  showSnackbar({commit, state, dispatch}, text) {
    dispatch('snackbarText', text).then(() => {
      commit('toggleSnackbar', true);
    })
  },

  formError({commit, state}, {message, timeout}) {
    commit('formError', message)
    setTimeout(() => { commit('formError', '') }, timeout)
  },

  snackbarText({commit, state}, text) {
    commit('snackbarText', text);
  },

  setConfig({commit}, data) {
    commit('setConfig', data);
  },

  spotifyAuthorized({commit}) {
    commit('spotifyAuthorized');
  },

  resetIndexState({commit}) {
    commit('resetState');
  },
};

const mutations = {
  toggleLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },

  switchLoginPopup(state, loginPopup) {
    state.loginPopup = loginPopup;
  },

  ajaxLoading(state, loading) {
    state.ajaxLoading = loading;
  },
  updateToken(state,token) {
    state.headers.Authorization = 'Bearer ' + token;
  },
  toggleSnackbar(state, bool) {
    state.snackbar.active = bool;
  },
  snackbarText(state, text) {
    state.snackbar.text = text;
  },
  formError(state, text) {
    state.formError = text;
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setConfig(state, config) {
    state.config = config;
  },
  spotifyAuthorized(state) {
    state.config.spotify = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
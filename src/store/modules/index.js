const getDefaultState = () => {
  return {
    loginPopup: false,
    loginError: '',
    signupError: '',
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
  loginPopup: state => state.loginPopup,
  snackbarActive: state => state.snackbar.active,
  snackbarText: state => state.snackbar.text,
  headers: state => state.headers,
  loginError: state => state.loginError,
  signupError: state => state.signupError,
  config: state => state.config,
  spotify: state => state.config.spotify
};

const actions = {
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

  loginError({commit, state}, text) {
    commit('loginError', text);
  },

  signupError({commit}, text) {
    commit('signupError', text);
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
  loginError(state, text) {
    state.loginError = text;
  },
  signupError(state, text) {
    state.signupError = text;
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
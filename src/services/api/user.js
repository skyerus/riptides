import axios from 'axios'
import { store } from '../../store'
import handler from './handler';
import BuildQuery from "./BuildQuery"

export default {
  login(password) {
    return axios({
      method: 'post',
      url: 'api/login',
      headers: store.getters.headers,
      data: {
        username: store.getters.usernameInput,
        password: password
      }
    }).then((response) => {
      return response;
    }).catch((error) => {
      if (error.response.status === 401) {
        store.dispatch('formError', {
          message: 'Incorrect credentials',
          timeout: 3000
        })
      } else {
        store.dispatch('showSnackbar', 'Oops, something went wrong. Please try again later');
      }
      throw error;
    });
  },
  signup(password) {
    return axios({
      method: 'post',
      url: 'api/user',
      headers: store.getters.headers,
      data: {
        username: store.getters.usernameInput,
        email: store.getters.emailInput,
        password: password
      }
    }).then((response) => {
      return response;
    }).catch((error) => {
      if (error.response.status === 409) {
        store.dispatch('formError', {
          message: error.response.data.message,
          timeout: 3000
        })
      } else {
        store.dispatch('showSnackbar', 'Oops, something went wrong. Please try again later');
      }
      throw error;
    });
  },

  getFollowingCount(username) {
    return axios({
      method: 'get',
      url: `api/auth/user/${username}/following/count`,
      headers: store.getters.headers,
    }).then((response) => {
      store.dispatch('setNumberOfFollowing', response.data.count);
    }).catch((error) => {
      handler.handleResponse(error, this.getFollowingCount, [username]);
    });
  },

  getFollowersCount(username) {
    return axios({
      method: 'get',
      url: `api/auth/user/${username}/followers/count`,
      headers: store.getters.headers,
    }).then((response) => {
      store.dispatch('setNumberOfFollowers', response.data.count);
    }).catch((error) => {
      handler.handleResponse(error, this.getFollowersCount, [username]);
    });
  },

  fetchFollowing(username, query) {
    return axios({
      method: 'get',
      url: `api/auth/user/${username}/following${BuildQuery.buildQuery(query)}`,
      headers: store.getters.headers,
    })
  },

  getFollowing(username, query) {
    this.fetchFollowing(username, query).then((response) => {
      store.dispatch('setFollowing', response.data.following)
    }).catch((error) => {
      handler.handleResponse(error, this.getFollowing, [username, query]);
    });
  },

  pushFollowing(username, query) {
    this.fetchFollowing(username, query).then((response) => {
      store.dispatch('pushFollowing', response.data.following)
    }).catch((error) => {
      handler.handleResponse(error, this.pushFollowing, [username, query]);
    });
  },

  fetchFollowers(username, query) {
    return axios({
      method: 'get',
      url: `api/auth/user/${username}/followers${BuildQuery.buildQuery(query)}`,
      headers: store.getters.headers,
    })
  },

  getFollowers(username, query) {
    this.fetchFollowers(username, query).then((response) => {
      store.dispatch('setFollowers', response.data.followers)
    }).catch((error) => {
      handler.handleResponse(error, this.getFollowers, [username, query]);
    });
  },

  pushFollowers(username, query) {
    this.fetchFollowers(username, query).then((response) => {
      store.dispatch('pushFollowers', response.data.followers)
    }).catch((error) => {
      handler.handleResponse(error, this.pushFollowers, [username, query]);
    });
  },

  getUser(username) {
    return axios({
      method: 'get',
      url: 'api/auth/user/' + username,
      headers: store.getters.headers,
    }).then((response) => {
      store.dispatch('setUser', response.data.user);
      store.dispatch('setUserFollowing', response.data.following);
    }).catch((error) => {
      handler.handleResponse(error, this.getUser, [username]);
    });
  },

  followUser(username) {
    return axios({
      method: 'put',
      url: 'api/auth/user/follow/' + username,
      headers: store.getters.headers,
    })
  },

  unfollowUser(username) {
    return axios({
      method: 'delete',
      url: 'api/auth/user/unfollow/' + username,
      headers: store.getters.headers,
    })
  },

  getMyConfig() {
    return axios({
      method: 'get',
      url: 'api/auth/me/config',
      headers: store.getters.headers,
    }).then((response) => {
      store.dispatch('setMyUser', response.data.user);
      store.dispatch('setConfig', response.data.config);
    }).catch((error) => {
      handler.handleResponse(error, this.getMyConfig, []);
    });
  },

  uploadAvatar(file) {
    let formData = new FormData()
    formData.append('file', file)

    return axios({
      method: 'post',
      url: 'api/auth/avatar',
      data: formData,
      headers: {
        ...store.getters.headers,
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      this.getMyConfig()
    }).catch((error) => {
      handler.handleResponse(error, this.uploadAvatar, [file])
    })
  },

  requestResetPassword(username) {
    return axios({
      method: 'post',
      url: `api/user/${username}/forgot/password`,
    })
  },

  resetPassword(username, token, password) {
    return axios({
      method: 'post',
      url: 'api/user/reset/password',
      data: {
        username: username,
        token: token,
        password: password
      }
    })
  }
}
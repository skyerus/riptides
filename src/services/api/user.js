import axios from 'axios'
import { store } from '../../store'
import handler from './handler';

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
        store.dispatch('loginError', 'Incorrect credentials').then(() => {
          setTimeout(() => {
            store.dispatch('loginError', '')
          }, 5000);
        });
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
        store.dispatch('signupError', error.response.data.error).then(() => {
          setTimeout(() => {
            store.dispatch('signupError', '')
          }, 5000);
        });
      } else {
        store.dispatch('showSnackbar', 'Oops, something went wrong. Please try again later');
      }
      throw error;
    });
  },

  getFollowing(username) {
    return axios({
      method: 'get',
      url: 'api/auth/user/' + username + '/following',
      headers: store.getters.headers,
    }).then((response) => {
      store.dispatch('setFollowing', response.data.following);
      store.dispatch('setNumberOfFollowing', response.data.total);
    }).catch((error) => {
      handler.handleResponse(error, this.getFollowing, [username]);
    });
  },

  getFollowers(username) {
    return axios({
      method: 'get',
      url: 'api/auth/user/' + username + '/followers',
      headers: store.getters.headers,
    }).then((response) => {
      store.dispatch('setFollowers', response.data.followers);
      store.dispatch('setNumberOfFollowers', response.data.total);
    }).catch((error) => {
      handler.handleResponse(error, this.getFollowers, [username]);
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
}
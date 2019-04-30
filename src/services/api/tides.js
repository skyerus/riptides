import axios from 'axios'
import { store } from '../../store'
import BuildQuery from "./BuildQuery"

export default {
  getGenres() {
    return axios({
      method: 'get',
      url: '/api/auth/tides/genres',
      headers: store.getters.headers
    })
  },

  createTide(genreValues, tagValues, name, about) {
    return axios({
      method: 'post',
      url: '/api/auth/tides',
      headers: store.getters.headers,
      data: {
        name: name,
        genres: genreValues,
        tags: tagValues,
        about: about
      }
    })
  },

  getTides(query) {
    let url = store.getters.isLoggedIn ? 'api/auth/tides' : 'api/tides'
    return axios({
      method: 'get',
      url: `${url}${BuildQuery.buildQuery(query)}`,
      headers: store.getters.headers
    })
  },

  getUserTides(username, query) {
    return axios({
      method: 'get',
      url: `api/auth/user/${username}/tides${BuildQuery.buildQuery(query)}`,
      headers: store.getters.headers
    })
  },

  getFavoriteTides(username, query) {
    return axios({
      method: 'get',
      url: `api/auth/user/${username}/tides/favorite${BuildQuery.buildQuery(query)}`,
      headers: store.getters.headers
    })
  },

  favoriteTide(id) {
    return axios({
      method: 'put',
      url: `api/auth/tides/${id}/favorite`,
      headers: store.getters.headers
    })
  },

  unfavoriteTide(id) {
    return axios({
      method: 'put',
      url: `api/auth/tides/${id}/unfavorite`,
      headers: store.getters.headers
    })
  },
}
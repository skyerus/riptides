import axios from 'axios'
import { store } from '../../store'

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

  getTides() {
    return axios({
      method: 'get',
      url: 'api/tides',
      headers: store.getters.headers
    })
  }
}
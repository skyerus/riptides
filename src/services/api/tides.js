import axios from 'axios'
import { store } from '../../store'
import handler from './handler';

export default {
  getGenres() {
    return axios({
      method: 'get',
      url: '/api/tides/genres',
      headers: store.getters.headers
    })
  },

  createTide(genreValues, tagValues, name, about) {
    return axios({
      method: 'post',
      url: '/api/tides',
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
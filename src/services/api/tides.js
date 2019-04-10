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
  }
}
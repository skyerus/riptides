import axios from 'axios'
import { store } from '../../store'
import handler from './handler';

export default {
  authorize(code) {
    return axios({
      method: 'post',
      url: '/api/auth/spotify/authorize',
      headers: store.getters.headers,
      data: {
        code: code
      }
    }).then((response) => {
      store.dispatch('showSnackbar', 'Connected account with Spotify');
      store.dispatch('spotifyAuthorized');
    }).catch((error) => {
      return handler.handleResponse(error, this.authorize, [code]);
    });
  },
  play(id) {
    return axios({
      method: 'put',
      url: `/api/auth/spotify/v1/me/player/play/${id}`,
      headers: store.getters.headers
    }).catch((error) => {
      return handler.handleResponse(error, this.play, [id]);
    });
  }
}
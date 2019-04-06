import {store} from '../../store'

export default {
  handleResponse(error, axios, params) {
    if (error.response.status === 401) {
      store.dispatch('toggleLoggedIn', false);
      store.dispatch('switchLoginPopup', true).then(() => {
        store.dispatch('loginError', 'Your session has expired').then(() => {
          setTimeout(() => {
            store.dispatch('loginError', '')
          }, 5000);
        })
      });
      store.dispatch('updateToken', '').then(() => {
        this.checkLoggedIn(0).then((loggedIn) => {
          if (loggedIn === true) {
            return axios(...params);
          }
        })
      });
    } else {
      store.dispatch('showSnackbar', 'Oops, something went wrong. Please try again later');
    }
    throw error;
  },

  checkLoggedIn(i) {
    return new Promise((resolve, reject) => {
      if (i === 60) {
        resolve(false);
      } else if (!store.getters.isLoggedIn) {
        i++;
        setTimeout(() => {
          this.checkLoggedIn(i).then((res) => {
            resolve(res);
          })
        }, 1000)
      } else {
        resolve(true);
      }
    })
  },
}
import {store} from '../../store'

export default {
  handleResponse(error, axios = null, params = null) {
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
            if (axios !== null) {
              return axios(...params);
            }
          } else {
            store.dispatch('resetUserState')
            store.dispatch('resetIndexState')
          }
        })
      });
    } else if (error.response.status === 500) {
      store.dispatch('showSnackbar', 'Oops, something went wrong. Please try again later');
    } else {
      store.dispatch('showSnackbar', error.response.data.message);
    }
    throw error;
  },

  handleSocketError(errorCode) {
    return this.handleResponse({
      response: {
        status: errorCode
      }
    });
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
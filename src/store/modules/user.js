const getDefaultState = () => {
  return {
    usernameInput: '',
    emailInput: '',
    following: null,
    followers: null,
    numberOfFollowers: null,
    numberOfFollowing: null,
    myUser: {
      username: ''
    },
    user: {
      user: null,
      following: null
    }
  }
};

const state = getDefaultState();

const getters = {
  emailInput: state => state.emailInput,
  usernameInput: state => state.usernameInput,
  username: state => state.myUser.username,
  following: state => state.following,
  followers: state => state.followers,
  numberOfFollowers: state => state.numberOfFollowers,
  numberOfFollowing: state => state.numberOfFollowing,
  myUser: state => state.myUser,
  user: state => state.user.user,
  isFollowing: state => state.user.following,
};

const actions = {
  updateUsernameInput({commit}, username) {
    commit('updateUsernameInput', username);
  },
  updateEmailInput({commit}, email) {
    commit('updateEmailInput', email);
  },
  resetUserState({commit}) {
    commit('resetState');
  },
  setFollowing({commit}, following) {
    commit('setFollowing', following);
  },
  setFollowers({commit}, followers) {
    commit('setFollowers', followers);
  },
  setNumberOfFollowing({commit}, num) {
    commit('setNumberOfFollowing', num);
  },
  setNumberOfFollowers({commit}, num) {
    commit('setNumberOfFollowers', num);
  },
  setUser({commit}, user) {
    commit('setUser', user);
  },
  setUserFollowing({commit}, user) {
    commit('setUserFollowing', user);
  },
  setMyUser({commit}, user) {
    commit('setMyUser', user);
  },
  setFollowingByIndex({commit}, params) {
    commit('setFollowingByIndex', params);
  },
  setFollowerByIndex({commit}, params) {
    commit('setFollowerByIndex', params);
  },
  followUser({commit}, bool) {
    commit('followUser', bool);
  }
};

const mutations = {
  updateUsernameInput(state, username) {
    state.usernameInput = username;
  },
  updateEmailInput(state, email) {
    state.emailInput = email;
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setFollowing(state, following) {
    state.following = following;
  },
  setFollowers(state, followers) {
    state.followers = followers;
  },
  setNumberOfFollowing(state, num) {
    state.numberOfFollowing = num;
  },
  setNumberOfFollowers(state, num) {
    state.numberOfFollowers = num;
  },
  setUser(state, user) {
    state.user.user = user;
  },
  setMyUser(state, user) {
    state.myUser = user;
  },
  setUserFollowing(state, user) {
    state.user.following = user;
  },
  setFollowingByIndex(state, params) {
    state.following[params.index].following = params.bool;
  },
  setFollowerByIndex(state, params) {
    state.followers[params.index].following = params.bool;
  },
  followUser(state, bool) {
    state.user.following = bool;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
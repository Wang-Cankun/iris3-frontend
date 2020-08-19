import User from '~/services/User.js'

export const state = () => ({
  user: [],
  token: [],
  snack: '',
})
export const mutations = {
  SET_USER(state, users) {
    state.user = users
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_SNACK(state, snack) {
    state.snack = snack
  },
}
export const actions = {
  fetchToken({ commit }) {
    return User.getToken().then((response) => {
      commit('SET_TOKEN', response.data)
    })
  },
  fetchProfile({ commit }) {
    return User.getProfile().then((response) => {
      commit('SET_USER', response.data)
    })
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}

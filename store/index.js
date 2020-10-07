export const state = () => ({
  profile: [],
  snack: '',
  token: '',
  jobid: '',
})
export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
  SET_SNACK(state, snack) {
    state.snack = snack
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_JOBID(state, jobid) {
    state.jobid = jobid
  },
}
export const actions = {
  async fetchProfile({ commit }, email) {
    const profile = await this.$axios.$get('/users/' + email)
    commit('SET_PROFILE', profile)
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

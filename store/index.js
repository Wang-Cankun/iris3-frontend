export const state = () => ({
  profile: [],
  snack: '',
  token: '',
  jobid: '',
  species: '',
  files: {},
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
  SET_PLOT_EVENT(state, jobid) {
    state.jobid = jobid
  },
  SET_SPECIES(state, species) {
    state.species = species
  },
  SET_UPLOAD_FILES(state, files) {
    state.files = files
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

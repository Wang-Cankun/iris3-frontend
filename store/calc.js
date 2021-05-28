export const state = () => ({
  flag: [],
  deg: [],
})

export const mutations = {
  SET_DEG(state, deg) {
    state.deg = deg
  },
  SET_FLAG(state, item) {
    state.flag.push(item)
  },
  RESET_FLAG(state) {
    state.flag = []
  },
}

export const actions = {
  updateDeg({ commit }, deg) {
    commit('SET_DEG', deg)
  },
  updateFlag({ commit }, flag) {
    commit('SET_FLAG', flag)
  },
  resetFlag({ commit }) {
    commit('RESET_FLAG')
  },
}

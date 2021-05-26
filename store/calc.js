export const state = () => ({
  deg: [],
})

export const mutations = {
  SET_DEG(state, deg) {
    state.deg = deg
  },
}

export const actions = {
  updateDeg({ commit }, deg) {
    commit('SET_DEG', deg)
  },
}

export const state = () => ({
  flag: true,
  deg: [],
})

export const mutations = {
  SET_DEG(state, deg) {
    state.deg = deg
  },
  SET_FLAG(state, flag) {
    state.flag = flag
  },
}

export const actions = {
  updateDeg({ commit }, deg) {
    commit('SET_DEG', deg)
  },
  updateFlag({ commit }, flag) {
    commit('SET_FLAG', flag)
  },
}

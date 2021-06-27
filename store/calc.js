export const state = () => ({
  flag: [],
  deg: [],
  enrichr: [],
  gsea: [],
})

export const mutations = {
  SET_DEG(state, deg) {
    state.deg = deg
  },
  SET_ENRICHR(state, enrichr) {
    state.enrichr = enrichr
  },
  SET_GSEA(state, gsea) {
    state.gsea = gsea
  },
  SET_FLAG(state, item) {
    state.flag.push(item)
  },
  RESET_FLAG(state) {
    state.flag = []
  },
}

export const actions = {
  updateFlag({ commit }, flag) {
    commit('SET_FLAG', flag)
  },
  resetFlag({ commit }) {
    commit('RESET_FLAG')
  },
  updateDeg({ commit }, deg) {
    commit('SET_DEG', deg)
  },
  updateEnrichr({ commit }, enrichr) {
    commit('SET_ENRICHR', enrichr)
  },
  updateGsea({ commit }, gsea) {
    commit('SET_GSEA', gsea)
  },
}

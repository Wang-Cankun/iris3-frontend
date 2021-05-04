export const state = () => ({
  jobProgress: [],
})

export const mutations = {
  SET_JOB_PROGRESS(state, jobProgress) {
    state.jobProgress.push(jobProgress)
  },
  CLEAR_JOB_PROGRESS(state) {
    state.jobProgress = []
  },
}

export const actions = {
  FORMAT_JOB_PROGRESS({ commit }, jobProgress) {
    if (!jobProgress) {
      jobProgress = 'Error while reading job progress...'
    }
    const progressFormat = `${new Date().toLocaleString()}: ${jobProgress}`
    commit('SET_JOB_PROGRESS', progressFormat)
  },
}

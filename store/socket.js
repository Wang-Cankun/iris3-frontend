export const state = () => ({
  jobProgress: [],
  uploadProgress: 0,
})

export const mutations = {
  SET_UPLOAD_PROGRESS(state, uploadProgress) {
    console.log(uploadProgress)
    state.uploadProgress = uploadProgress
  },
  SET_JOB_PROGRESS(state, jobProgress) {
    state.jobProgress.push(jobProgress)
  },
  CLEAR_JOB_PROGRESS(state) {
    state.jobProgress = []
    state.uploadProgress = 0
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

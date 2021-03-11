export const state = () => ({
  content: '',
  color: '',
})

export const mutations = {
  showAlert(state, payload) {
    state.content = payload.content
    state.color = payload.color
  },
}

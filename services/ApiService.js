import axios from 'axios'

const apiClient = axios.create({
  // baseURL: `https://bmbls.bmi.osumc.edu/api/scread`,
  baseURL: process.env.API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
const uploadClient = axios.create({
  // baseURL: `https://bmbls.bmi.osumc.edu/api/scread`,
  baseURL: process.env.API_URL,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export default {
  uploadFiles(formData) {
    return uploadClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getDatasets() {
    return apiClient.get('/dataset')
  },

  postCommand(endpoint, command) {
    this.$axios
      .post(endpoint, command)
      .then((response) => {
        let i = 0
        const checkComplete = setInterval(async () => {
          await this.$axios
            .get('iris3/api/queue/' + response.data.id)
            .then((response) => {
              if (response.data.returnvalue !== null) {
                clearInterval(checkComplete)
                return response.data.returnvalue
              }
              if (++i === 10) {
                clearInterval(checkComplete)
                return 0
              }
            })
        }, 1000)
      })
      .catch((error) => {
        this.$notifier.showMessage({
          content: 'Error: ' + error,
          color: 'error',
        })
      })
  },
}

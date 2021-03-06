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
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  },
  uploadFiles(formData) {
    return uploadClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  wait(ms) {
    return new Promise((resolve) => {
      console.log(`waiting ${ms} ms...`)
      setTimeout(resolve, ms)
    })
  },

  async pollQueue(queueId, ms, maxAttempts = 5000) {
    let result = await apiClient.get('deepmaps/api/queue/' + queueId)
    let attempts = 0
    while ((result.data.returnvalue === null) & (attempts < maxAttempts)) {
      await this.wait(ms)
      attempts++
      result = await apiClient.get('deepmaps/api/queue/' + queueId)
    }

    return result.data.returnvalue || 0
  },

  async postCommand(endpoint, command = {}) {
    const queueId = await apiClient
      .post(endpoint, command)
      .then((response) => response.data.id)
      .catch((error) => {
        this.$notifier.showMessage({
          content: 'Error: ' + error,
          color: 'error',
        })
      })

    const result = await this.pollQueue(queueId, 2000)

    return result
  },
}

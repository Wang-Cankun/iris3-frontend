import axios from 'axios'

const apiClient = axios.create({
  // baseURL: `https://bmbls.bmi.osumc.edu/api/scread`,
  baseURL: `http://localhost:3000/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export default {
  getToken(username, password) {
    return apiClient.post('/auth/login', {
      username: 'cankun.wang@osumc.edu',
      password: '123456',
    })
  },
  getProfile(key) {
    return apiClient.get('/profile/' + key)
  },
}

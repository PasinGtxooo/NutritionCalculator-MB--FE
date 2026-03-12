import apiClient from './apiClient'

const authApi = {
  register(payload) {
    return apiClient.post('/auth/signup', payload, {
            headers: { 'Content-Type': 'application/json' },
          })
  },

  login(payload) {
    return apiClient.post('/auth/signin', payload, {
            headers: { 'Content-Type': 'application/json' },
          })
  },
  getUserByToken() {
    return apiClient.get('/user/jwt', {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  checkUsername(username) {
    return apiClient.get(`/auth/check-username?username=${encodeURIComponent(username)}`)
  }
}

export default authApi

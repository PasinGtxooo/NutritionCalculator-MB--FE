import apiClient from './apiClient'

const userApi = {
  getUserByJwt() {
    return apiClient.get('/user/jwt', {
            headers: { 'Content-Type': 'application/json' },
          })
  },
  updateUserByJwt(payload) {
    return apiClient.patch('/user/jwt', payload, {
            headers: { 'Content-Type': 'application/json' },
          })
  },
}

export default userApi

import axios from 'axios'
import router from '../router'

const apiClient = axios.create({
  //baseURL: 'http://localhost:8080',
  baseURL: 'https://be-latest-saif.onrender.com',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      router.push({ name: 'signin' })
    }
    return Promise.reject(error)
  }
)

export default apiClient

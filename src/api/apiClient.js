import axios from 'axios'

const apiClient = axios.create({
  //baseURL: 'http://localhost:8080',
  baseURL: 'https://be-latest-saif.onrender.com',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  console.log('🚀 Axios interceptor token:', token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient

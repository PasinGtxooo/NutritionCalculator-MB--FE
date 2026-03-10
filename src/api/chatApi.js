import apiClient from './apiClient'

const chatApi = {
  sendMessage(message) {
    return apiClient.post('/api/ai/chat', { message })
  },

  getHistory() {
    return apiClient.get('/api/ai/chat/history')
  },

  clearHistory() {
    return apiClient.delete('/api/ai/chat/history')
  }
}

export default chatApi

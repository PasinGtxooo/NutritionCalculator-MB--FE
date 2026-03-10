import apiClient from './apiClient'

const foods = {
  getFoods() {
    return apiClient.get('/foods')
  },

  // สำหรับ text อย่างเดียว (JSON)
  analyzeText(data) {
    return apiClient.post('/foods/analyze-text', data, {
      headers: { 'Content-Type': 'application/json' }
    })
  },

  // Step 1: ให้ AI อ่านรูปแล้วส่งชื่ออาหารกลับ (ยังไม่บันทึก)
  identifyFood(formData) {
    return apiClient.post('/foods/identify', formData, {
      headers: { 'Content-Type': undefined }
    })
  },

  // สำหรับ image หรือ image+text (multipart/form-data)
  analyzeWithImage(formData) {
    return apiClient.post('/foods/analyze', formData, {
      headers: { 'Content-Type': undefined }  // ให้ axios ตั้งค่า boundary เอง
    })
  },

  // ดึงผลวิเคราะห์รายสัปดาห์ (จาก f_weekly ของ food ตัวล่าสุด)
  getWeeklyAnalysis() {
    return apiClient.get('/foods/weekly-analysis')
  },

  // legacy method สำหรับ createFood ปกติ
  addFood(payload) {
    return apiClient.post('/foods', payload)
  }
}

export default foods

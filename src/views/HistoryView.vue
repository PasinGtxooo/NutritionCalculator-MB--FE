<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Premium Header (เหมือน Homepage) -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 shadow-sm">
  <div class="max-w-7xl mx-auto px-6 py-4">
    <!-- 3 columns: left / center / right -->
    <div class="grid grid-cols-3 items-center">
      
      <!-- Left -->
      <div class="flex justify-start">
        <button
          @click="router.push('/homepage')"
          class="group relative flex items-center gap-2 px-4 py-2 rounded-xl
                 bg-gradient-to-r from-green-100/60 to-emerald-100/60
                 backdrop-blur-xl border border-white/40
                 shadow-lg shadow-green-500/10 hover:shadow-green-500/20
                 transition-all duration-300"
        >
          <span class="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          <span class="text-sm font-semibold text-green-700">Back Home</span>
        </button>
      </div>

      <!-- Center (always truly centered) -->
      <div class="flex justify-center">
        <div class="flex items-center gap-3">
          <div
            @click="router.push('/homepage')"
            class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 
                   flex items-center justify-center text-2xl
                   shadow-lg shadow-green-500/30
                   hover:shadow-xl hover:shadow-green-500/40
                   transform hover:scale-110 active:scale-95
                   transition-all duration-300 cursor-pointer"
          >
          <img src="/logoGreenHealth2remove.png" alt="Logo" class="w-9 h-9 rounded-2xl object-cover" />
          </div>

          <h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
            Green Health Buddy Nutrition Advisor
          </h1>
        </div>
      </div>

      <!-- Right -->
      <div class="flex justify-end">
       
      </div>

    </div>
  </div>
</header>

    <div class="flex max-w-7xl mx-auto">
      <aside class="hidden lg:flex flex-col w-64 bg-white/50 backdrop-blur-xl border-r border-slate-200/50 min-h-[calc(100vh-73px)] sticky top-[73px]">
        <nav class="flex-1 p-4 space-y-2">
          <button
            v-for="item in navigation"
            :key="item.id"
            @click="item.link ? router.push(item.link) : router.push('/homepage')"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105',
              item.id === 'history'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                : 'text-slate-600 hover:bg-slate-100'
            ]"
          >
            <span class="text-xl">{{ item.icon }}</span>
            <span class="font-medium">{{ item.label }}</span>
            <span v-if="item.id === 'history'" class="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></span>
          </button>
        </nav>

        <!-- Sidebar Footer -->
        <div class="p-4 space-y-3 border-t border-slate-200/50">
          <button @click="router.push('/profile')" class="w-full p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md transition-shadow duration-300 text-left">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold shadow-lg">
                {{ user?.username?.charAt(0).toUpperCase() || 'U' }}
              </div>
              <div>
                <div class="font-semibold text-slate-800">{{ user?.username || 'Username' }}</div>
              </div>
            </div>
          </button>
          <button
            @click="logout"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-105"
          >
            <span class="text-xl">🚪</span>
            <span class="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 pb-24 lg:pb-8 lg:p-8">
        <div class="space-y-6 animate-fade-in">

          <!-- Page Header + Search -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 class="text-3xl font-bold text-slate-800 mb-1">ประวัติอาหาร</h2>
              <p class="text-slate-500 text-sm">บันทึกมื้ออาหารทั้งหมดของคุณ</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="ค้นหาอาหาร..."
                  class="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white text-sm"
                />
              </div>
              <button
                @click="exportToPDF"
                :disabled="filteredLogs.length === 0 || isExporting"
                class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {{ isExporting ? '⏳ กำลังสร้าง...' : '📄 Export PDF' }}
              </button>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-white rounded-2xl p-5 shadow-lg text-center hover:shadow-xl transition-shadow border-l-4 border-indigo-400">
              <div class="text-2xl mb-2">📊</div>
              <div class="text-2xl font-bold text-slate-800">{{ totalMeals }}</div>
              <div class="text-xs text-slate-400 mt-0.5">มื้อทั้งหมด</div>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-lg text-center hover:shadow-xl transition-shadow border-l-4 border-emerald-400">
              <div class="text-2xl mb-2">📅</div>
              <div class="text-2xl font-bold text-slate-800">{{ totalDays }}</div>
              <div class="text-xs text-slate-400 mt-0.5">วันที่บันทึก</div>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-lg text-center hover:shadow-xl transition-shadow border-l-4 border-orange-400">
              <div class="text-2xl mb-2">🔥</div>
              <div class="text-2xl font-bold text-slate-800">{{ avgCalories }}</div>
              <div class="text-xs text-slate-400 mt-0.5">kcal เฉลี่ย/วัน</div>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="flex justify-center py-16">
            <div class="w-10 h-10 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredLogs.length === 0" class="bg-white rounded-2xl p-14 text-center shadow-lg">
            <div class="text-6xl mb-4">🍽️</div>
            <p class="text-slate-500 font-medium text-lg">{{ searchQuery ? 'ไม่พบอาหารที่ค้นหา' : 'ยังไม่มีประวัติอาหาร' }}</p>
            <button v-if="!searchQuery" @click="router.push('/homepage')" class="mt-5 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
              กลับไปเพิ่มอาหาร
            </button>
          </div>

          <!-- Grouped by Date -->
          <div v-else>
            <div v-for="group in groupedLogs" :key="group.date" class="mb-6">
              <!-- Date Header -->
              <div class="flex items-center gap-3 mb-3">
                <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                  <span class="text-sm">📅</span>
                  <span class="text-sm font-bold">{{ group.label }}</span>
                </div>
                <div class="flex-1 h-px bg-slate-200"></div>
                <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">
                  🔥 {{ group.totalCalories.toLocaleString() }} kcal
                </div>
                <div class="text-xs text-slate-400 font-medium">{{ group.items.length }} มื้อ</div>
              </div>

              <!-- Food Cards -->
              <div class="space-y-3">
                <div
                  v-for="(item, idx) in group.items"
                  :key="idx"
                  class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div class="flex">
                    <!-- Image -->
                    <div class="w-28 h-28 flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden">
                      <img v-if="item.image" :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <span v-else class="text-4xl opacity-40">🍽️</span>
                    </div>
                    <!-- Info -->
                    <div class="flex-1 p-4 flex flex-col justify-between min-w-0">
                      <div>
                        <div class="flex items-center justify-between gap-2">
                          <h4 class="font-bold text-slate-800 truncate text-sm">{{ item.name }}</h4>
                          <span class="text-xs text-slate-400 flex-shrink-0 bg-slate-50 px-2 py-0.5 rounded-full">{{ item.time }}</span>
                        </div>
                        <div v-if="item.text && item.text !== item.name" class="text-xs text-slate-400 mt-0.5 truncate">{{ item.text }}</div>
                      </div>
                      <!-- Nutrition Pills -->
                      <div class="flex flex-wrap gap-1.5 mt-2">
                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold shadow-sm">
                          🔥 {{ item.calories }}
                        </span>
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                          💪 {{ item.protein }}g
                        </span>
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                          🍚 {{ item.carbs }}g
                        </span>
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold">
                          🥑 {{ item.fat }}g
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- Mobile Navigation (เหมือน Homepage) -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/50 shadow-lg z-50">
      <div class="flex justify-around p-2">
        <button
          v-for="item in navigation"
          :key="item.id"
          @click="item.link ? router.push(item.link) : router.push('/homepage')"
          :class="[
            'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300',
            item.id === 'history'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
              : 'text-slate-600'
          ]"
        >
          <span class="text-2xl">{{ item.icon }}</span>
          <span class="text-xs font-medium">{{ item.label }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '../api/authApi'
import foodApi from '../api/foodApi'

const router = useRouter()
const user = ref(null)

const navigation = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard', link: '/homepage' },
  { id: 'history', icon: '📋', label: 'ประวัติอาหาร', link: '/history' }
]

const logout = () => {
  if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
    router.push('/signin')
  }
}
const foodLogs = ref([])
const loading = ref(true)
const searchQuery = ref('')
const isExporting = ref(false)
const parseDateTime = (dt) => {
  if (!dt) return null
  if (Array.isArray(dt)) {
    // backend เก็บเวลาไทย (UTC+7) → ลบ 7 เพื่อได้ UTC จริง
    return new Date(Date.UTC(dt[0], dt[1] - 1, dt[2], (dt[3] || 0) - 7, dt[4] || 0, dt[5] || 0))
  }
  return new Date(dt)
}

// แปลง Date → hour ในเวลาไทย UTC+7
const getBangkokHour = (date) =>
  parseInt(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Bangkok', hour: 'numeric', hour12: false }).format(date))

// แปลง Date → "HH:MM" ในเวลาไทย
const getBangkokTimeStr = (date) =>
  new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', hour12: false }).format(date)

// แปลง Date → "YYYY-MM-DD" ในเวลาไทย
const getBangkokDateKey = (date) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok' }).format(date)

const parseAi = (log) => {
  let name = log.text || 'ไม่ระบุ'
  let calories = 0, protein = 0, carbs = 0, fat = 0

  if (log.ai) {
    try {
      const ai = JSON.parse(log.ai)
      name = ai.name || ai.matchedFood || name
      calories = Math.round(ai.calories || 0)
      protein = Math.round(ai.protein || 0)
      carbs = Math.round(ai.carbs || 0)
      fat = Math.round(ai.fat || 0)
    } catch {}
  }

  const dt = parseDateTime(log.datetimeFood) || new Date()
  const hour = getBangkokHour(dt)
  let period = 'เย็น'
  if (hour < 11) period = 'เช้า'
  else if (hour < 15) period = 'กลางวัน'

  const time = `${period} ${getBangkokTimeStr(dt)}`

  return {
    name,
    calories,
    protein,
    carbs,
    fat,
    time,
    date: dt,
    text: log.text,
    image: log.imagePath || null
  }
}

const filteredLogs = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const parsed = foodLogs.value.map(parseAi)
  if (!q) return parsed
  return parsed.filter(item =>
    item.name.toLowerCase().includes(q) ||
    (item.text && item.text.toLowerCase().includes(q))
  )
})

const formatDateLabel = (date) => {
  const d = new Date(date)
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Bangkok', year: 'numeric', month: 'numeric', day: 'numeric' })
  const parts = fmt.formatToParts(d)
  const p = Object.fromEntries(parts.map(x => [x.type, x.value]))
  return `${parseInt(p.day)} ${months[parseInt(p.month) - 1]} ${p.year}`
}

const groupedLogs = computed(() => {
  const groups = {}
  filteredLogs.value.forEach(item => {
    const key = getBangkokDateKey(new Date(item.date))

    if (!groups[key]) {
      groups[key] = { date: key, label: formatDateLabel(item.date), totalCalories: 0, items: [] }
    }

    groups[key].totalCalories += item.calories
    groups[key].items.push(item)
  })

  return Object.values(groups).sort((a, b) => b.date.localeCompare(a.date))
})

const totalMeals = computed(() => foodLogs.value.length)

const totalDays = computed(() => {
  const days = new Set()
  foodLogs.value.forEach(log => {
    const dt = parseDateTime(log.datetimeFood)
    if (dt) days.add(dt.toISOString().split('T')[0])
  })
  return days.size
})

const avgCalories = computed(() => {
  if (totalDays.value === 0) return 0
  let total = 0

  foodLogs.value.forEach(log => {
    if (log.ai) {
      try {
        const ai = JSON.parse(log.ai)
        total += ai.calories || 0
      } catch {}
    }
  })

  return Math.round(total / totalDays.value)
})


const exportToPDF = async () => {
  isExporting.value = true

  try {
    const dateStr = new Date().toLocaleDateString('th-TH')
    const rows = groupedLogs.value.flatMap(group =>
      group.items.map(item => `
        <tr>
          <td>${group.label}</td>
          <td>${item.time}</td>
          <td>${item.name || '-'}</td>
          <td style="text-align:right">${item.calories ?? 0}</td>
          <td style="text-align:right">${item.protein ?? 0} g</td>
          <td style="text-align:right">${item.carbs ?? 0} g</td>
          <td style="text-align:right">${item.fat ?? 0} g</td>
        </tr>`)
    ).join('')

    const container = document.createElement('div')
    container.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;padding:32px;font-family:Sarabun,sans-serif;font-size:13px'
    container.innerHTML = `
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
      <h2 style="color:#16a34a;margin:0 0 6px">Green Health Buddy Report</h2>
      <p style="color:#555;margin:0 0 4px">ผู้ใช้: ${user.value?.firstname && user.value.lastname ? `${user.value.firstname} ${user.value.lastname}` : '-'}</p>
      <p style="color:#555;margin:0 0 20px">วันที่ส่งออก: ${dateStr}</p>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#16a34a;color:#fff">
            <th style="padding:6px 8px;text-align:left">วันที่</th>
            <th style="padding:6px 8px;text-align:left">เวลา</th>
            <th style="padding:6px 8px;text-align:left">ชื่ออาหาร</th>
            <th style="padding:6px 8px;text-align:right">Kcal</th>
            <th style="padding:6px 8px;text-align:right">โปรตีน</th>
            <th style="padding:6px 8px;text-align:right">คาร์บ</th>
            <th style="padding:6px 8px;text-align:right">ไขมัน</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:16px;color:#333">
        รวม ${totalMeals.value} มื้อ | ${totalDays.value} วัน | เฉลี่ย ${avgCalories.value} kcal/วัน
      </p>`

    container.querySelectorAll('tbody tr:nth-child(even)').forEach(tr => {
      tr.style.background = '#f0fdf4'
    })
    container.querySelectorAll('tbody td').forEach(td => {
      td.style.padding = '5px 8px'
      td.style.borderBottom = '1px solid #e2e8f0'
    })

    document.body.appendChild(container)
    await document.fonts.ready

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        clonedDoc.head.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => {
          if (!el.href?.includes('fonts.googleapis.com')) el.remove()
        })
      }
    })
    document.body.removeChild(container)

    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    const imgW = pageW - 20
    const imgH = (canvas.height * imgW) / canvas.width

    let y = 10
    let remaining = imgH
    while (remaining > 0) {
      const sliceH = Math.min(remaining, pageH - 20)
      const srcY = (imgH - remaining) / imgH * canvas.height
      const srcH = sliceH / imgH * canvas.height

      const sliceCanvas = document.createElement('canvas')
      sliceCanvas.width = canvas.width
      sliceCanvas.height = srcH
      sliceCanvas.getContext('2d').drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH)
      doc.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 10, y, imgW, sliceH)

      remaining -= sliceH
      if (remaining > 0) { doc.addPage(); y = 10 }
    }

    doc.save(`nutrition-report-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (err) {
    console.error('Export PDF failed:', err)
  } finally {
    isExporting.value = false
  }
}

onMounted(async () => {
   try {
    const res = await authApi.getUserByToken();
    console.log('API response:', res.data);

    if (!res.data || !res.data.data) {
      throw new Error('User data missing');
    }
    user.value = res.data.data;
  } catch (err) {
    console.error('Failed to load user data:', err);
  }

  try {
    const res = await foodApi.getFoods()
    foodLogs.value = res.data || []
  } catch (err) {
    console.error('Failed to load food logs:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

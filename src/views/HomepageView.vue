<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Premium Header -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-2xl shadow-lg shadow-green-500/30 transform hover:scale-105 transition-transform duration-300">
              <img src="/logoGreenHealth2remove.png" alt="Logo" class="w-9 h-9 rounded-2xl object-cover" />
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Green Health Buddy Nutrition Advisor
            </h1>
          </div>
        </div>
      </div>
    </header>

    <div class="flex max-w-7xl mx-auto">
      <!-- Elegant Sidebar -->
      <aside class="hidden lg:flex flex-col w-64 bg-white/50 backdrop-blur-xl border-r border-slate-200/50 min-h-[calc(100vh-73px)] sticky top-[73px]">
        <nav class="flex-1 p-4 space-y-2">
          <button
            v-for="item in navigation"
            :key="item.id"
            @click="item.link ? router.push(item.link) : (currentPage = item.id)"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105',
              currentPage === item.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                : 'text-slate-600 hover:bg-slate-100'
            ]"
          >
            <span class="text-xl">{{ item.icon }}</span>
            <span class="font-medium">{{ item.label }}</span>
            <span v-if="currentPage === item.id" class="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></span>
          </button>
        </nav>

        <!-- Sidebar Footer -->
        <div class="p-4 space-y-3 border-t border-slate-200/50">
          <div class="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md transition-shadow duration-300">
            <button @click="router.push('/profile')" class="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold shadow-lg">
                {{ user?.username?.charAt(0).toUpperCase() || 'U' }}
              </div>
              <div>
                <div class="font-semibold text-slate-800">{{ user?.username || 'Username' }}</div>
              </div>
            </button>
          </div>
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
        
        <!-- ==================== DASHBOARD ==================== -->
        <div v-if="currentPage === 'dashboard'" class="space-y-6">

          <!-- Hero Greeting Banner -->
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 p-6 text-white shadow-2xl">
            <div class="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full"></div>
            <div class="absolute -bottom-8 -left-8 w-36 h-36 bg-white/10 rounded-full"></div>
            <div class="relative">
              <p class="text-green-100 text-sm font-medium">{{ greeting }}</p>
              <h2 class="text-3xl font-bold mt-1">สวัสดี, {{ user?.username || 'ผู้ใช้' }}! 👋</h2>
              <p class="text-green-100 text-sm mt-2">{{ todayDateStr }} • มาดูโภชนาการวันนี้กัน</p>
            </div>
          </div>

          <!-- Top 2-column: Calorie Ring + Macro Bars -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <!-- Calorie Donut Ring -->
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <div class="flex items-center gap-2 mb-5">
                <span class="text-xl">🔥</span>
                <h3 class="text-lg font-bold text-slate-800">แคลอรี่วันนี้</h3>
              </div>
              <div class="flex items-center gap-6">
                <!-- SVG Donut -->
                <div class="relative flex-shrink-0">
                  <svg width="150" height="150" class="-rotate-90">
                    <circle cx="75" cy="75" r="58" fill="none" stroke="#f1f5f9" stroke-width="14"/>
                    <circle cx="75" cy="75" r="58" fill="none"
                      stroke="url(#calGrad)"
                      stroke-width="14"
                      stroke-linecap="round"
                      :stroke-dasharray="364.42"
                      :stroke-dashoffset="364.42 * (1 - Math.min(caloriePercent, 100) / 100)"
                      class="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="calGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#f97316"/>
                        <stop offset="100%" stop-color="#ef4444"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-2xl font-bold text-slate-800">{{ caloriePercent }}%</span>
                    <span class="text-xs text-slate-400">ของเป้า</span>
                  </div>
                </div>
                <!-- Numbers -->
                <div class="flex-1 space-y-3">
                  <div>
                    <div class="text-3xl font-bold text-slate-800">{{ todayStats.calories.toLocaleString() }}</div>
                    <div class="text-slate-400 text-sm">kcal วันนี้</div>
                  </div>
                  <div class="h-px bg-slate-100"></div>
                  <div class="flex justify-between text-sm">
                    <div>
                      <div class="text-slate-400 text-xs">เป้าหมาย</div>
                      <div class="font-semibold text-slate-700">{{ (user?.tdee ? Math.floor(user.tdee) : 2000).toLocaleString() }}</div>
                    </div>
                    <div class="text-right">
                      <div class="text-slate-400 text-xs">{{ calorieRemaining >= 0 ? 'เหลือ' : 'เกิน' }}</div>
                      <div :class="['font-semibold', calorieRemaining >= 0 ? 'text-green-600' : 'text-red-500']">
                        {{ Math.abs(calorieRemaining).toLocaleString() }}
                      </div>
                    </div>
                  </div>
                  <div :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold', calorieRemaining >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600']">
                    <span>{{ calorieRemaining >= 0 ? '✅' : '⚠️' }}</span>
                    <span>{{ calorieRemaining >= 0 ? 'อยู่ในเป้าหมาย' : 'เกินเป้าหมายแล้ว' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Macro Breakdown Bars -->
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2">
                  <span class="text-xl">📊</span>
                  <h3 class="text-lg font-bold text-slate-800">สารอาหารหลักวันนี้</h3>
                </div>
                <!-- Goal Selector Pills -->
                <div class="flex gap-1.5">
                  <button
                    v-for="g in goalOptions"
                    :key="g.id"
                    @click="setGoal(g.id)"
                    :class="[
                      'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200',
                      nutritionGoal === g.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    ]"
                  >
                    <span>{{ g.icon }}</span>
                    <span>{{ g.label }}</span>
                  </button>
                </div>
              </div>
              <div class="space-y-5">
                <!-- Protein -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <div class="flex items-center gap-2">
                      <div class="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                      <span class="text-sm font-semibold text-slate-700">💪 โปรตีน</span>
                    </div>
                    <span class="text-sm font-bold text-blue-600">{{ todayStats.protein }}g <span class="text-slate-400 font-normal text-xs">/ {{ macroGoals.protein }}g</span></span>
                  </div>
                  <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
                      :style="{ width: Math.min(100, macroGoals.protein > 0 ? Math.round(todayStats.protein / macroGoals.protein * 100) : 0) + '%' }"></div>
                  </div>
                </div>
                <!-- Carbs -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <div class="flex items-center gap-2">
                      <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <span class="text-sm font-semibold text-slate-700">🍚 คาร์โบไฮเดรต</span>
                    </div>
                    <span class="text-sm font-bold text-amber-600">{{ todayStats.carbs }}g <span class="text-slate-400 font-normal text-xs">/ {{ macroGoals.carbs }}g</span></span>
                  </div>
                  <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000"
                      :style="{ width: Math.min(100, macroGoals.carbs > 0 ? Math.round(todayStats.carbs / macroGoals.carbs * 100) : 0) + '%' }"></div>
                  </div>
                </div>
                <!-- Fat -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <div class="flex items-center gap-2">
                      <div class="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                      <span class="text-sm font-semibold text-slate-700">🥑 ไขมัน</span>
                    </div>
                    <span class="text-sm font-bold text-rose-600">{{ todayStats.fat }}g <span class="text-slate-400 font-normal text-xs">/ {{ macroGoals.fat }}g</span></span>
                  </div>
                  <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-1000"
                      :style="{ width: Math.min(100, macroGoals.fat > 0 ? Math.round(todayStats.fat / macroGoals.fat * 100) : 0) + '%' }"></div>
                  </div>
                </div>
                <!-- Macro split bar -->
                <div class="pt-1">
                  <div class="text-xs text-slate-400 mb-1.5">สัดส่วนสารอาหาร (kcal)</div>
                  <div class="flex h-2 rounded-full overflow-hidden gap-0.5">
                    <div class="bg-blue-400 transition-all duration-1000" :style="{ width: macroSplit.protein + '%' }"></div>
                    <div class="bg-amber-400 transition-all duration-1000" :style="{ width: macroSplit.carbs + '%' }"></div>
                    <div class="bg-rose-400 transition-all duration-1000" :style="{ width: macroSplit.fat + '%' }"></div>
                  </div>
                  <div class="flex justify-between text-xs text-slate-400 mt-1">
                    <span>P {{ macroSplit.protein }}%</span>
                    <span>C {{ macroSplit.carbs }}%</span>
                    <span>F {{ macroSplit.fat }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 4 Info Cards row -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white rounded-2xl p-5 shadow-lg border-l-4 border-yellow-400 hover:shadow-xl transition-shadow">
              <div class="text-2xl mb-2">⚡</div>
              <div class="text-xs text-slate-400 font-medium uppercase tracking-wide">TDEE</div>
              <div class="text-2xl font-bold text-slate-800 mt-1">{{ user?.tdee ? Math.floor(user.tdee).toLocaleString() : '-' }}</div>
              <div class="text-xs text-slate-400">kcal/วัน</div>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-lg border-l-4 border-purple-400 hover:shadow-xl transition-shadow">
              <div class="text-2xl mb-2">🫀</div>
              <div class="text-xs text-slate-400 font-medium uppercase tracking-wide">BMR</div>
              <div class="text-2xl font-bold text-slate-800 mt-1">{{ user?.bmr ? Math.floor(user.bmr).toLocaleString() : '-' }}</div>
              <div class="text-xs text-slate-400">kcal/วัน</div>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-lg border-l-4 border-emerald-400 hover:shadow-xl transition-shadow">
              <div class="text-2xl mb-2">🍽️</div>
              <div class="text-xs text-slate-400 font-medium uppercase tracking-wide">มื้ออาหาร</div>
              <div class="text-2xl font-bold text-slate-800 mt-1">{{ todayStats.meals }}</div>
              <div class="text-xs text-slate-400">มื้อวันนี้</div>
            </div>
            <div :class="['rounded-2xl p-5 shadow-lg border-l-4 hover:shadow-xl transition-shadow', calorieRemaining >= 0 ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400']">
              <div class="text-2xl mb-2">{{ calorieRemaining >= 0 ? '🎯' : '🔔' }}</div>
              <div class="text-xs text-slate-400 font-medium uppercase tracking-wide">สถานะ</div>
              <div :class="['text-lg font-bold mt-1', calorieRemaining >= 0 ? 'text-green-700' : 'text-red-600']">
                {{ calorieRemaining >= 0 ? 'On Track' : 'Over!' }}
              </div>
              <div :class="['text-xs font-medium', calorieRemaining >= 0 ? 'text-green-500' : 'text-red-400']">
                {{ calorieRemaining >= 0 ? `เหลือ ${calorieRemaining.toLocaleString()}` : `เกิน ${Math.abs(calorieRemaining).toLocaleString()}` }} kcal
              </div>
            </div>
          </div>

          <!-- Weekly Area Chart (Chart.js) -->
          <Card class="shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle class="text-lg font-bold text-slate-800">แคลอรี่รายสัปดาห์</CardTitle>
                  <CardDescription class="text-slate-400 mt-0.5">ปริมาณแคลอรี่แต่ละวันในสัปดาห์นี้</CardDescription>
                </div>
                <div class="flex items-center gap-4 text-xs text-slate-400">
                  <span class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> แคลอรี่
                  </span>
                  <span v-if="user?.tdee" class="flex items-center gap-1.5">
                    <span class="w-5 h-0 border-t-2 border-dashed border-amber-400 inline-block"></span> TDEE
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent class="px-4 pb-2">
              <div style="height: 240px;">
                <Line :data="chartJsData" :options="chartJsOptions" />
              </div>
            </CardContent>
            <CardFooter class="pt-2 pb-4 px-6 border-t border-slate-100">
              <div class="flex w-full items-center justify-between text-sm">
                <div class="text-slate-500">
                  รวมทั้งสัปดาห์ <span class="font-bold text-slate-800">{{ weekTotalCalories.toLocaleString() }}</span> kcal
                </div>
                <div class="text-slate-500">
                  เฉลี่ย/วัน <span class="font-bold text-slate-800">{{ weekAvgCalories.toLocaleString() }}</span> kcal
                </div>
              </div>
            </CardFooter>
          </Card>

          <!-- Weekly AI Analysis -->
          <div v-if="weeklyAnalysis" class="bg-white rounded-2xl p-6 shadow-lg">
            <div class="flex items-center gap-2 mb-5">
              <span class="text-xl">🤖</span>
              <h3 class="text-lg font-bold text-slate-800">AI วิเคราะห์รายสัปดาห์</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- สรุปภาพรวม -->
              <div class="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg">📋</span>
                  <span class="text-sm font-bold text-blue-700">สรุปภาพรวม</span>
                </div>
                <p class="text-sm text-slate-700 leading-relaxed">{{ weeklyAnalysis.summary }}</p>
              </div>
              <!-- วิเคราะห์แคลอรี่ -->
              <div class="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg">🔥</span>
                  <span class="text-sm font-bold text-orange-700">วิเคราะห์แคลอรี่</span>
                </div>
                <p class="text-sm text-slate-700 leading-relaxed">{{ weeklyAnalysis.calorieAnalysis }}</p>
              </div>
              <!-- สัดส่วนสารอาหาร -->
              <div class="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg">📊</span>
                  <span class="text-sm font-bold text-green-700">สัดส่วนสารอาหาร</span>
                </div>
                <p class="text-sm text-slate-700 leading-relaxed">{{ weeklyAnalysis.nutritionBalance }}</p>
              </div>
              <!-- แนวโน้มการกิน -->
              <div class="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg">📈</span>
                  <span class="text-sm font-bold text-purple-700">แนวโน้มการกิน</span>
                </div>
                <p class="text-sm text-slate-700 leading-relaxed">{{ weeklyAnalysis.trend }}</p>
              </div>
            </div>
            <!-- คำแนะนำ -->
            <div class="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">💡</span>
                <span class="text-sm font-bold text-emerald-700">คำแนะนำ</span>
              </div>
              <p class="text-sm text-slate-700 leading-relaxed">{{ weeklyAnalysis.recommendations }}</p>
            </div>
          </div>

          <!-- Recent Meals -->
          <div>
            <h3 class="text-lg font-bold text-slate-800 mb-4">มื้ออาหารล่าสุด</h3>
            <div v-if="recentMeals.length === 0" class="bg-white rounded-2xl p-10 text-center shadow-lg">
              <div class="text-5xl mb-3">🍽️</div>
              <p class="text-slate-400 font-medium">ยังไม่มีข้อมูลอาหาร</p>
              <button @click="currentPage = 'addfood'" class="mt-4 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                เพิ่มอาหารเลย ➕
              </button>
            </div>
            <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div
                v-for="(meal, idx) in recentMeals"
                :key="idx"
                class="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div class="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform duration-300 overflow-hidden flex-shrink-0">
                    <img v-if="meal.image" :src="meal.image" class="w-full h-full object-cover rounded-2xl" />
                    <span v-else>🍽️</span>
                  </div>
                  <div class="flex-1 min-w-0 text-center md:text-left">
                    <div class="text-xs text-slate-400 mb-1">{{ meal.time }}</div>
                    <div class="font-semibold text-slate-800 truncate text-sm">{{ meal.name }}</div>
                    <div class="mt-1.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">
                      🔥 {{ meal.calories }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- ==================== CHATBOT ==================== -->
        <div v-if="currentPage === 'chatbot'" class="space-y-6 animate-fade-in">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold text-slate-800 mb-2">Chatbot ที่ปรึกษา</h2>
              <p class="text-slate-600">ถามคำถามเกี่ยวกับโภชนาการได้เลย</p>
            </div>
            <button
              @click="clearChat"
              class="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-all duration-300 flex items-center gap-2"
            >
              <span>🗑️</span>
              <span>ลบประวัติ</span>
            </button>
          </div>

          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div class="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white">
              <div
                v-for="(msg, idx) in messages"
                :key="idx"
                :class="['flex gap-3 animate-slide-up', msg.isBot ? 'justify-start' : 'justify-end']"
                :style="{ animationDelay: `${idx * 100}ms` }"
              >
                <div
                  v-if="msg.isBot"
                  class="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-xl flex-shrink-0 shadow-lg"
                >
                  <img src="/logoGreenHealthAI.png" alt="Bot" class="w-12 h-12 rounded-2xl object-cover" />
                </div>
                <div
                  :class="[
                    'max-w-md px-4 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg',
                    msg.isBot
                      ? 'bg-gradient-to-br from-slate-100 to-slate-50 text-slate-800'
                      : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                  ]"
                >
                  {{ msg.text }}
                </div>
                <div
                  v-if="!msg.isBot"
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-lg"
                >
                  {{ user?.username?.charAt(0).toUpperCase() || 'U' }}
                </div>
              </div>
            </div>

            <div class="border-t border-slate-200 p-4 bg-slate-50">
              <div class="flex gap-2">
                <input
                  v-model="chatMessage"
                  @keyup.enter="sendMessage"
                  type="text"
                  placeholder="พิมพ์คำถามของคุณ..."
                  class="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white"
                />
                <button
                  @click="sendMessage"
                  :disabled="isSendingMessage"
                  :class="[
                    'px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 shadow-lg flex items-center gap-2',
                    isSendingMessage
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/30 hover:shadow-xl transform hover:scale-105'
                  ]"
                >
                  <span v-if="isSendingMessage">กำลังส่ง...</span>
                  <span v-else>ส่ง</span>
                  <span class="text-xl">{{ isSendingMessage ? '⏳' : '→' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== ADD FOOD ==================== -->
        <div v-if="currentPage === 'addfood'" class="space-y-6 animate-fade-in">
          <div>
            <h2 class="text-3xl font-bold text-slate-800 mb-2">เพิ่มอาหารประจำวัน</h2>
            <p class="text-slate-600">บันทึกมื้อใหม่ของคุณ</p>
          </div>

          <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-2xl p-8 shadow-2xl space-y-6">
              
              <!-- Dish Type -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span class="text-xl">🍽️</span>
                  <span>ชนิดอาหาร</span>
                </label>
                <select
                  v-model="formData.dish"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white hover:border-slate-300 cursor-pointer"
                >
                  <option value="">เลือกชนิดอาหาร</option>
                  <option value="1">อาหารจานเดียว</option>
                  <option value="2">กับข้าว</option>
                </select>
              </div>

              <!-- Image Upload -->
              <div v-if="formData.dish !== '2'" class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span class="text-xl">📷</span>
                  <span>รูปภาพอาหาร</span>
                </label>

                <div v-if="imagePreview" class="relative group rounded-xl overflow-hidden">
                  <img :src="imagePreview" alt="Preview" class="w-full h-64 object-cover" />
                  <button
                    @click="clearImage"
                    class="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100"
                  >
                    ✕
                  </button>
                </div>

                <label
                  v-else
                  class="flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed border-slate-300 hover:border-green-500 bg-slate-50 hover:bg-green-50 transition-all duration-300 cursor-pointer group"
                >
                  <input
                    type="file"
                    @change="handleImageChange"
                    accept="image/*"
                    class="hidden"
                  />
                  <div class="text-center space-y-3">
                    <div class="text-6xl group-hover:scale-110 transition-transform duration-300">📸</div>
                    <div class="text-slate-700 font-medium">คลิกเพื่ออัปโหลดรูปภาพ</div>
                    <div class="text-sm text-slate-500">หรือลากไฟล์มาวางที่นี่</div>
                  </div>
                </label>
              </div>

              <!-- Description -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span class="text-xl">📝</span>
                  <span>รายละเอียด</span>
                </label>
                <p v-if="formData.dish === '2'" class="text-xs text-slate-500">
                  ระบุชื่ออาหารพร้อมจำนวนและหน่วย เช่น ทัพพี, ไม้, ช้อน, ถ้วย, ชิ้น
                </p>
                <textarea
                  v-model="formData.text"
                  :placeholder="formData.dish === '2'
                    ? 'เช่น ข้าว 2 ทัพพี ไก่ยาง 2 ไม้ แกงเขียวหวาน 2 ช้อน ผัดผักบุ้ง 1 ถ้วย'
                    : 'ระบุรายละเอียดอาหาร เช่น ข้าวผัดไก่ ไข่ดาว น้ำมัน 1 ช้อน'"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  rows="4"
                ></textarea>
              </div>
              <!-- กรณีไม่มีรูป หรือยังไม่ได้ identify → ปุ่มเดียว -->
              <button
                v-if="!imageFile || !identifiedFood"
                @click="imageFile ? identifyFoodFromImage() : submitFood()"
                :disabled="isIdentifying || isSubmitting"
                :class="[
                  'w-full px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2',
                  (isIdentifying || isSubmitting)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : imageFile
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/30 hover:shadow-xl transform hover:scale-105'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/30 hover:shadow-xl transform hover:scale-105'
                ]"
              >
                <span v-if="isIdentifying">AI กำลังอ่านรูปภาพ...</span>
                <span v-else-if="isSubmitting">กำลังบันทึก...</span>
                <span v-else-if="imageFile">ให้ AI อ่านรูปอาหาร</span>
                <span v-else>บันทึกข้อมูลอาหาร</span>
                <span class="text-xl">{{ (isIdentifying || isSubmitting) ? '⏳' : imageFile ? '🔍' : '✓' }}</span>
              </button>

              <!-- AI อ่านรูปเสร็จแล้ว → แสดงชื่อให้แก้ไข -->
              <div v-if="identifiedFood" class="mt-4 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg space-y-4">
                <h3 class="text-lg font-bold text-blue-700 flex items-center gap-2">
                  🔍 AI อ่านได้ว่าเป็น
                </h3>
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700">ชื่ออาหาร (แก้ไขได้ถ้า AI อ่านผิด)</label>
                  <input
                    v-model="editedDishName"
                    type="text"
                    class="w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg font-medium"
                    placeholder="แก้ไขชื่ออาหาร"
                  />
                  <p class="text-xs text-slate-500">ชื่อภาษาอังกฤษ: {{ identifiedFood.dishNameEn || '-' }}</p>
                </div>
                <div class="flex gap-3">
                  <button
                    @click="confirmAndAnalyze"
                    :disabled="isSubmitting"
                    :class="[
                      'flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2',
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/30 hover:shadow-xl transform hover:scale-105'
                    ]"
                  >
                    <span v-if="isSubmitting">กำลังวิเคราะห์...</span>
                    <span v-else>ยืนยันและวิเคราะห์โภชนาการ</span>
                    <span class="text-xl">{{ isSubmitting ? '⏳' : '✓' }}</span>
                  </button>
                  <button
                    @click="cancelIdentify"
                    :disabled="isSubmitting"
                    class="px-4 py-3 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-100 transition-all duration-300"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>

              <!-- ผลวิเคราะห์โภชนาการ -->
              <div v-if="aiResult" class="mt-6 p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg">
                <h3 class="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                  🤖 ผลการวิเคราะห์จาก AI
                </h3>

                <ul class="space-y-2 text-slate-700">
                  <li><b>🍽️ ชื่ออาหาร:</b> {{ aiResult.name || '-' }}</li>
                  <li><b>🔥 แคลอรี่:</b> {{ aiResult.calories || '-' }}</li>
                  <li><b>💪 โปรตีน:</b> {{ aiResult.protein || '-' }}</li>
                  <li><b>🥑 ไขมัน:</b> {{ aiResult.fat || '-' }}</li>
                  <li><b>🍚 คาร์โบไฮเดรต:</b> {{ aiResult.carbohydrate || '-' }}</li>
                </ul>

                <div v-if="aiResult.advice" class="mt-3 p-3 bg-white rounded-xl text-sm text-slate-600">
                  💡 {{ aiResult.advice }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>

    <!-- Mobile Navigation -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/50 shadow-lg z-50">
      <div class="flex justify-around p-2">
        <button
          v-for="item in navigation"
          :key="item.id"
          @click="item.link ? router.push(item.link) : (currentPage = item.id)"
          :class="[
            'flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300',
            currentPage === item.id
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
              : 'text-slate-600'
          ]"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span class="text-xs font-medium">{{ item.label }}</span>
        </button>
        <button
          @click="router.push('/profile')"
          class="flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 text-slate-600 hover:bg-slate-100"
        >
          <div class="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            {{ user?.username?.charAt(0).toUpperCase() || 'U' }}
          </div>
          <span class="text-xs font-medium">โปรไฟล์</span>
        </button>
        <button
          @click="logout"
          class="flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 text-red-500 hover:bg-red-50"
        >
          <span class="text-xl">🚪</span>
          <span class="text-xs font-medium">ออกจากระบบ</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { computed, onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs';
import { useRouter } from 'vue-router';
import authApi from '../api/authApi';
import chatApi from '../api/chatApi';
import foodApi from '../api/foodApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, annotationPlugin);

const router = useRouter();
const currentPage = ref('dashboard');
const chatMessage = ref('');
const user = ref(null);
const error = ref(null);
const loading = ref(true);
const aiResult = ref(null);
const isSubmitting = ref(false);
const isIdentifying = ref(false);
const identifiedFood = ref(null); // { dishName, dishNameEn } จาก Vision AI
const editedDishName = ref('');   // ชื่ออาหารที่ user แก้ไขได้
const isSendingMessage = ref(false);

const navigation = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'chatbot', icon: '💬', label: 'Chatbot' },
  { id: 'addfood', icon: '➕', label: 'เพิ่มอาหาร' },
  { id: 'history', icon: '📋', label: 'ประวัติอาหาร', link: '/history' }
];

const foodLogs = ref([]);
const weeklyAnalysis = ref(null);

// แปลง datetimeFood ที่อาจเป็น array [2026,2,9,14,30] หรือ ISO string
const parseDateTime = (dt) => {
  if (!dt) return null;
  if (Array.isArray(dt)) {
    // [year, month, day, hour, minute, second?]
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0);
  }
  return new Date(dt);
};

const recentMeals = computed(() => {
  return foodLogs.value.slice(0, 3).map(log => {
    let name = log.text || 'ไม่ระบุ';
    let calories = 0;
    if (log.ai) {
      try {
        const ai = JSON.parse(log.ai);
        name = ai.name || ai.matchedFood || name;
        calories = Math.round(ai.calories || 0);
      } catch {}
    }
    const dt = parseDateTime(log.datetimeFood) || new Date();
    const hour = dt.getHours();
    let period = 'เย็น';
    if (hour < 11) period = 'เช้า';
    else if (hour < 15) period = 'กลางวัน';
    const timeStr = `${period} • ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
    return { time: timeStr, name, calories: `${calories} kcal`, image: log.imagePath || null };
  });
});

const weekData = computed(() => {
  const dayNames = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
  const now = new Date();
  const todayDow = now.getDay(); // 0=Sun

  // หาวันจันทร์ของสัปดาห์นี้
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((todayDow + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  // สร้าง array 7 วัน (จ.-อา.)
  const weekOrder = [1, 2, 3, 4, 5, 6, 0]; // จ. อ. พ. พฤ. ศ. ส. อา.
  const dayCals = {};
  weekOrder.forEach(d => { dayCals[d] = 0; });

  foodLogs.value.forEach(log => {
    const dt = parseDateTime(log.datetimeFood);
    if (!dt || isNaN(dt.getTime())) return;
    if (dt < monday) return;
    const dow = dt.getDay();
    if (log.ai) {
      try {
        const ai = JSON.parse(log.ai);
        dayCals[dow] = (dayCals[dow] || 0) + (ai.calories || 0);
      } catch {}
    }
  });

  const maxCal = Math.max(...Object.values(dayCals), 1);
  return weekOrder.map(d => ({
    day: dayNames[d],
    calories: Math.round(dayCals[d]),
    percent: Math.round((dayCals[d] / maxCal) * 85),
    active: d === todayDow
  }));
});

const weekTotalCalories = computed(() => {
  return weekData.value.reduce((sum, d) => sum + d.calories, 0);
});

const weekAvgCalories = computed(() => {
  const daysWithData = weekData.value.filter(d => d.calories > 0).length;
  return daysWithData > 0 ? Math.round(weekTotalCalories.value / daysWithData) : 0;
});

// Chart.js data
const chartJsData = computed(() => {
  const labels = weekData.value.map(d => d.day);
  const data = weekData.value.map(d => d.calories);
  const todayIndex = weekData.value.findIndex(d => d.active);

  // สีจุด: วันนี้เขียวเข้ม, วันอื่นขาว
  const pointBg = data.map((_, i) => i === todayIndex ? '#10b981' : '#ffffff');
  const pointBorder = data.map((v) => v > 0 ? '#10b981' : '#cbd5e1');
  const pointRadius = data.map((_, i) => i === todayIndex ? 7 : 5);
  const pointHoverRadius = data.map((_, i) => i === todayIndex ? 9 : 7);

  return {
    labels,
    datasets: [{
      label: 'แคลอรี่',
      data,
      fill: true,
      backgroundColor: (ctx) => {
        const chart = ctx.chart;
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return 'rgba(16,185,129,0.1)';
        const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(16,185,129,0.25)');
        gradient.addColorStop(0.6, 'rgba(16,185,129,0.06)');
        gradient.addColorStop(1, 'rgba(16,185,129,0)');
        return gradient;
      },
      borderColor: '#10b981',
      borderWidth: 3,
      pointBackgroundColor: pointBg,
      pointBorderColor: pointBorder,
      pointBorderWidth: 2,
      pointRadius,
      pointHoverRadius,
      tension: 0.3,
    }]
  };
});

const chartJsOptions = computed(() => {
  const tdee = user.value?.tdee || 0;
  const maxData = Math.max(...weekData.value.map(d => d.calories), 1);
  const suggestedMax = Math.ceil(Math.max(maxData, tdee) / 200) * 200 || 500;

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          title: (items) => items[0]?.label || '',
          label: (item) => `${item.parsed.y.toLocaleString()} kcal`,
        },
      },
      annotation: tdee > 0 ? {
        annotations: {
          tdeeLine: {
            type: 'line',
            yMin: tdee,
            yMax: tdee,
            borderColor: '#f59e0b',
            borderWidth: 2,
            borderDash: [6, 4],
            label: {
              display: true,
              content: `TDEE ${Math.round(tdee).toLocaleString()}`,
              position: 'end',
              backgroundColor: 'rgba(245,158,11,0.85)',
              color: '#fff',
              font: { size: 11, weight: 'bold' },
              padding: { x: 8, y: 4 },
              borderRadius: 6,
            }
          }
        }
      } : {},
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#94a3b8',
          font: { size: 12, weight: '500' },
        },
        border: { display: false },
      },
      y: {
        suggestedMin: 0,
        suggestedMax,
        grid: {
          color: '#f1f5f9',
          drawBorder: false,
        },
        ticks: {
          color: '#cbd5e1',
          font: { size: 11 },
          stepSize: Math.round(suggestedMax / 4),
          callback: (v) => v.toLocaleString(),
        },
        border: { display: false },
      },
    },
  };
});

const messages = ref([]);

const goToProfile = () => {
  router.push('/profile');
};

const logout = () => {
  if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
    router.push('/signin');
  }
};

const sendMessage = async () => {
  if (!chatMessage.value.trim() || isSendingMessage.value) return;

  const userMsg = chatMessage.value.trim();
  chatMessage.value = '';
  isSendingMessage.value = true;

  // แสดงข้อความของ user ทันที
  messages.value.push({ text: userMsg, isBot: false });

  try {
    const res = await chatApi.sendMessage(userMsg);
    const aiResponse = res.data?.data?.message || 'ขออภัย ไม่สามารถตอบกลับได้ในขณะนี้';
    messages.value.push({ text: aiResponse, isBot: true });
  } catch (err) {
    console.error('Chat error:', err);
    const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
    messages.value.push({
      text: 'ขออภัย ระบบมีปัญหา: ' + errorMsg,
      isBot: true
    });
  } finally {
    isSendingMessage.value = false;
  }
};

const loadChatHistory = async () => {
  try {
    const res = await chatApi.getHistory();
    const history = res.data?.data || [];
    messages.value = history.map(msg => ({
      text: msg.text,
      isBot: msg.isBot
    }));
  } catch (err) {
    console.error('Failed to load chat history:', err);
  }
  // ถ้าไม่มีประวัติ ให้แสดงข้อความต้อนรับ
  if (messages.value.length === 0) {
    messages.value.push({
      text: 'สวัสดีค่ะ! ฉันคือ NutriBot ผู้ช่วยด้านโภชนาการ มีอะไรให้ช่วยไหมคะ?',
      isBot: true
    });
  }
};

const clearChat = async () => {
  if (!confirm('คุณต้องการลบประวัติแชททั้งหมดหรือไม่?')) return;
  try {
    await chatApi.clearHistory();
    messages.value = [{
      text: 'ประวัติแชทถูกลบเรียบร้อยแล้วค่ะ มีอะไรให้ช่วยไหมคะ?',
      isBot: true
    }];
  } catch (err) {
    console.error('Failed to clear chat:', err);
    alert('ไม่สามารถลบประวัติได้ กรุณาลองใหม่');
  }
};

onMounted(async () => {
  try {
    const res = await authApi.getUserByToken();
    console.log('API response:', res.data);

    if (!res.data || !res.data.data) {
      throw new Error('User data missing');
    }

    user.value = res.data.data;
    // ดึงข้อมูลอาหารของ user
    const foodRes = await foodApi.getFoods();
    foodLogs.value = foodRes.data || [];

    // โหลดผลวิเคราะห์รายสัปดาห์
    try {
      const weeklyRes = await foodApi.getWeeklyAnalysis();
      if (weeklyRes.data?.success && weeklyRes.data?.data) {
        const raw = weeklyRes.data.data;
        weeklyAnalysis.value = typeof raw === 'string' ? JSON.parse(raw) : raw;
      }
    } catch (err) {
      console.error('Failed to load weekly analysis:', err);
    }

    // โหลดประวัติแชท
    await loadChatHistory();
  } catch (err) {
    console.error('Failed to load user', err);
    if (err.response?.status !== 401) {
      // network error / Render waking up — stay on page
      error.value = 'ไม่สามารถโหลดข้อมูลได้ กรุณารีเฟรช';
    }
  } finally {
    loading.value = false;
  }
});

const formData = ref({
  dish: '',
  text: '',
  datetimeFood: '',
});

const imageFile = ref(null);
const imagePreview = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const clearImage = () => {
  imageFile.value = null;
  imagePreview.value = null;
  identifiedFood.value = null;
  editedDishName.value = '';
};

// Step 1: ให้ AI อ่านรูปก่อน → แสดงชื่อให้แก้ไข
const identifyFoodFromImage = async () => {
  isIdentifying.value = true;
  identifiedFood.value = null;
  aiResult.value = null;

  try {
    const fd = new FormData();
    fd.append('image', imageFile.value);

    const res = await foodApi.identifyFood(fd);
    const raw = res?.data?.data;

    if (typeof raw === 'string' && raw.trim().startsWith('{')) {
      const parsed = JSON.parse(raw);
      identifiedFood.value = parsed;
      editedDishName.value = parsed.dishName || '';
    } else {
      alert('AI ไม่สามารถอ่านรูปอาหารได้ กรุณาลองใหม่หรือพิมพ์ชื่ออาหารเอง');
    }
  } catch (err) {
    console.error('Identify food error:', err);
    alert('AI อ่านรูปไม่สำเร็จ: ' + (err.response?.data?.message || err.message));
  } finally {
    isIdentifying.value = false;
  }
};

// Step 2: user ยืนยัน/แก้ไขชื่อแล้ว → วิเคราะห์โภชนาการ + บันทึก
const confirmAndAnalyze = async () => {
  isSubmitting.value = true;
  aiResult.value = null;

  try {
    formData.value.datetimeFood = new Date().toISOString();

    // ส่งรูป + ชื่อที่ user แก้ไขแล้ว
    const fd = new FormData();
    fd.append('image', imageFile.value);
    fd.append('text', editedDishName.value.trim());

    const res = await foodApi.analyzeWithImage(fd);

    const aiRaw = res?.data?.data?.ai;
    if (typeof aiRaw === 'string' && aiRaw.trim().startsWith('{')) {
      try {
        aiResult.value = JSON.parse(aiRaw);
      } catch {
        aiResult.value = { name: editedDishName.value, advice: aiRaw };
      }
    } else {
      aiResult.value = { name: editedDishName.value, advice: 'ระบบไม่สามารถวิเคราะห์ได้ในขณะนี้' };
    }

    alert('บันทึกอาหารเรียบร้อยแล้ว');

    // รีเฟรชข้อมูล
    try {
      const foodRes = await foodApi.getFoods();
      foodLogs.value = foodRes.data || [];
    } catch {}

    // รีเซ็ตฟอร์ม
    formData.value.text = '';
    clearImage();

  } catch (err) {
    console.error('Confirm analyze error:', err);
    aiResult.value = {
      name: 'บันทึกไม่สำเร็จ',
      advice: 'การวิเคราะห์โภชนาการล้มเหลว'
    };
    alert('บันทึกอาหารไม่สำเร็จ');
  } finally {
    isSubmitting.value = false;
  }
};

// ยกเลิก identify → กลับไปเลือกรูปใหม่
const cancelIdentify = () => {
  identifiedFood.value = null;
  editedDishName.value = '';
};

const submitFood = async () => {
  isSubmitting.value = true;
  aiResult.value = null; // รีเซ็ตผลลัพธ์เก่า

  try {
    formData.value.datetimeFood = new Date().toISOString();

    const hasImage = !!imageFile.value;
    const hasText = formData.value.text && formData.value.text.trim() !== '';

    // ตรวจสอบว่าต้องใส่อย่างน้อย 1 อย่าง
    if (!hasImage && !hasText) {
      alert('กรุณาใส่รูปภาพหรือข้อความอย่างน้อย 1 อย่าง');
      isSubmitting.value = false;
      return;
    }

    let res;

    if (hasImage) {
      // กรณี 1: รูปอย่างเดียว หรือ กรณี 3: รูป + text
      const fd = new FormData();
      fd.append('image', imageFile.value);
      if (hasText) {
        fd.append('text', formData.value.text);
      }
      res = await foodApi.analyzeWithImage(fd);
    } else {
      // กรณี 2: text อย่างเดียว
      res = await foodApi.analyzeText({
        text: formData.value.text,
        dish: Number(formData.value.dish) || 1,
        datetimeFood: formData.value.datetimeFood
      });
    }

    // ✅ ปลอดภัยสุด ๆ
    const aiRaw = res?.data?.data?.ai;

    if (typeof aiRaw === 'string' && aiRaw.trim().startsWith('{')) {
      try {
        aiResult.value = JSON.parse(aiRaw);
      } catch {
        // JSON พัง → แสดง raw text แทน
        aiResult.value = {
          name: 'ไม่สามารถวิเคราะห์โภชนาการได้',
          advice: aiRaw
        };
      }
    } else {
      // ไม่มี ai หรือไม่ใช่ string
      aiResult.value = {
        name: 'ไม่มีข้อมูลจาก AI',
        advice: 'ระบบไม่สามารถวิเคราะห์ได้ในขณะนี้'
      };
    }

    alert('บันทึกอาหารเรียบร้อยแล้ว');

    // รีเฟรชข้อมูลอาหาร
    try {
      const foodRes = await foodApi.getFoods();
      foodLogs.value = foodRes.data || [];
    } catch {}

    // รีเซ็ตฟอร์ม
    formData.value.text = '';
    clearImage();

  } catch (err) {
    console.error('ADD FOOD ERROR:', err.response?.data || err);

    const errMsg = err.response?.data?.message || err.message || 'เกิดข้อผิดพลาด';

    aiResult.value = null;
    alert(errMsg);
  } finally {
    isSubmitting.value = false;
  }
};



// คำนวณสรุปวันนี้จาก food logs
const greeting = computed(() => {
  const h = new Date().getHours();
  if (h < 12) return 'อรุณสวัสดิ์ ☀️';
  if (h < 17) return 'สวัสดียามบ่าย 🌤️';
  return 'สวัสดียามเย็น 🌙';
});

const todayDateStr = computed(() => {
  const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
});

const caloriePercent = computed(() => {
  const tdee = user.value?.tdee ? Math.floor(user.value.tdee) : 2000;
  return Math.min(100, Math.round((todayStats.value.calories / tdee) * 100));
});

const calorieRemaining = computed(() => {
  const tdee = user.value?.tdee ? Math.floor(user.value.tdee) : 2000;
  return tdee - todayStats.value.calories;
});

const goalOptions = [
  { id: 'maintain', label: 'คงที่', icon: '⚖️', protein: 0.20, carbs: 0.50, fat: 0.30 },
  { id: 'lose',     label: 'ลดน้ำหนัก', icon: '📉', protein: 0.30, carbs: 0.40, fat: 0.30 },
  { id: 'gain',     label: 'เพิ่มกล้าม', icon: '💪', protein: 0.30, carbs: 0.45, fat: 0.25 },
];

const nutritionGoal = ref(localStorage.getItem('nutritionGoal') || 'maintain');

const setGoal = (goalId) => {
  nutritionGoal.value = goalId;
  localStorage.setItem('nutritionGoal', goalId);
};

const macroGoals = computed(() => {
  const tdee = user.value?.tdee ? Math.floor(user.value.tdee) : 2000;
  const goal = goalOptions.find(g => g.id === nutritionGoal.value) || goalOptions[0];
  return {
    protein: Math.round(tdee * goal.protein / 4),
    carbs:   Math.round(tdee * goal.carbs   / 4),
    fat:     Math.round(tdee * goal.fat     / 9),
  };
});

const macroSplit = computed(() => {
  const p = (todayStats.value.protein * 4) || 0;
  const c = (todayStats.value.carbs * 4) || 0;
  const f = (todayStats.value.fat * 9) || 0;
  const total = p + c + f;
  if (total === 0) return { protein: 33, carbs: 34, fat: 33 };
  return {
    protein: Math.round(p / total * 100),
    carbs: Math.round(c / total * 100),
    fat: Math.round(f / total * 100),
  };
});

const todayStats = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let calories = 0, protein = 0, fat = 0, carbs = 0, meals = 0;
  foodLogs.value.forEach(log => {
    const dt = parseDateTime(log.datetimeFood);
    if (!dt || isNaN(dt.getTime())) return;
    if (dt >= today) {
      meals++;
      if (log.ai) {
        try {
          const ai = JSON.parse(log.ai);
          calories += ai.calories || 0;
          protein += ai.protein || 0;
          fat += ai.fat || 0;
          carbs += ai.carbs || 0;
        } catch {}
      }
    }
  });
  return { calories: Math.round(calories), protein: Math.round(protein), fat: Math.round(fat), carbs: Math.round(carbs), meals };
});

const statistics = computed(() => {
  const tdee = user.value?.tdee ? Math.floor(user.value.tdee) : 2000;
  const calProgress = Math.min(100, Math.round((todayStats.value.calories / tdee) * 100));
  return [
  { 
    icon: '🔥', 
    label: 'แคลอรี่วันนี้', 
    value: todayStats.value.calories.toLocaleString(),
    target: `/ ${tdee.toLocaleString()} kcal`,
    progress: calProgress,
    color: 'from-orange-500 to-red-500'
  },
  { 
    icon: '💪', 
    label: 'โปรตีน', 
    value: todayStats.value.protein + 'g',
    target: '/ 100g', 
    progress: Math.min(100, todayStats.value.protein),
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '⚡',
    label: 'TDEE',
    value: user.value?.tdee ? Math.floor(user.value.tdee).toLocaleString() : '0',
    target: 'kcal/วัน',
    progress: 100,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: '📊',
    label: 'BMR',
    value: user.value?.bmr ? Math.floor(user.value.bmr).toLocaleString() : '0',
    target: 'kcal/วัน',
    progress: 100,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    icon: '🍽️', 
    label: 'มื้อวันนี้', 
    value: String(todayStats.value.meals),
    target: 'มื้ออาหาร', 
    progress: Math.min(100, Math.round(todayStats.value.meals / 3 * 100)),
    color: 'from-purple-500 to-pink-500'
  },
  { 
    icon: '🥑',
    label: 'ไขมัน / คาร์บ',
    value: `${todayStats.value.fat}g / ${todayStats.value.carbs}g`,
    target: 'วันนี้',
    progress: 50,
    color: 'from-teal-500 to-cyan-500'
  }
]})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #059669);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #047857);
}
</style>
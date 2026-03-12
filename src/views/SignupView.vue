<template>
  <div class="min-h-screen flex justify-center p-6 md:p-12 bg-gradient-to-br from-emerald-50 via-sky-50 to-orange-50 relative overflow-hidden">
    
    <!-- Decorative Background -->
    <div class="absolute -top-24 -right-24 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    
    <!-- Glass Card -->
    <Card class="w-full max-w-2xl backdrop-blur-xl bg-white/60 border border-white/80 shadow-2xl shadow-black/10 rounded-3xl z-10">
      <CardHeader class="text-center pb-2 relative">
        <!-- Back Button -->
        <Button 
          variant="outline" 
          size="sm" 
          @click="goBack"
          class="absolute left-6 top-6 gap-2 rounded-xl border-2 hover:border-emerald-500 hover:-translate-x-1 transition-all duration-300"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back</span>
        </Button>
        
        <!-- Icon -->
        <div class="mx-auto w-28 h-28 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4 animate-bounce">
          <img src="/logoGreenHealth.png" alt="Logo" class="w-24 h-24 rounded-2xl object-cover" />
        </div>
        
        <CardTitle class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <CardDescription class="text-gray-500">
          Your personalized nutrition journey starts here.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form @submit.prevent="submitForm" class="space-y-8">
          
          <!-- Profile Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <User class="w-5 h-5 text-emerald-600" />
              <h2 class="text-lg font-bold text-emerald-600">Profile</h2>
              <div class="flex-1 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  v-model="form.username"
                  required
                  placeholder="Enter username (a-z, 0-9)"
                  :class="['h-12 rounded-xl border-2 transition-all duration-300', errors.username ? 'border-red-400 focus:border-red-500' : 'focus:border-emerald-500 focus:ring-emerald-500/20 hover:border-emerald-300']"
                  @input="validateUsername"
                  @blur="checkUsernameAvailable"
                />
                <p v-if="errors.username" class="text-xs text-red-500 mt-1">{{ errors.username }}</p>
                <p v-if="usernameChecking" class="text-xs text-slate-400 mt-1">กำลังตรวจสอบ...</p>
                <p v-if="!errors.username && usernameAvailable && form.username" class="text-xs text-emerald-500 mt-1">✓ Username พร้อมใช้งาน</p>
              </div>
              
              <div class="space-y-2">
                <Label for="phone">Phone</Label>
                <Input 
                  id="phone" 
                  v-model="form.phone" 
                  type="tel" 
                  required 
                  placeholder="Enter phone number"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="password">Password</Label>
                <div class="relative">
                  <Input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    minlength="6"
                    placeholder="Enter password"
                    class="h-12 pr-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Eye v-if="!showPassword" class="w-5 h-5" />
                    <EyeOff v-else class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="confirmPassword">Confirm Password</Label>
                <div class="relative">
                  <Input
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    required
                    minlength="6"
                    placeholder="Confirm password"
                    :class="['h-12 pr-12 rounded-xl border-2 transition-all duration-300', errors.confirmPassword ? 'border-red-400' : 'focus:border-emerald-500 focus:ring-emerald-500/20 hover:border-emerald-300']"
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                    <EyeOff v-else class="w-5 h-5" />
                  </button>
                </div>
                <p v-if="errors.confirmPassword" class="text-xs text-red-500 mt-1">{{ errors.confirmPassword }}</p>
              </div>
              
              <div class="space-y-2">
                <Label for="sex">Sex</Label>
                <Select v-model="form.sex">
                  <SelectTrigger class="h-12 rounded-xl border-2 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300">
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div class="space-y-2">
                <Label for="firstname">First Name</Label>
                <Input 
                  id="firstname" 
                  v-model="form.firstname" 
                  placeholder="Enter first name"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="lastname">Last Name</Label>
                <Input 
                  id="lastname" 
                  v-model="form.lastname" 
                  placeholder="Enter last name"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="birthDate">Birth Date</Label>
                <Input 
                  id="birthDate" 
                  v-model="form.birthDate" 
                  type="date" 
                  required
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
            </div>
          </div>
          
          <!-- Body Stats Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Ruler class="w-5 h-5 text-emerald-600" />
              <h2 class="text-lg font-bold text-emerald-600">Body Stats</h2>
              <div class="flex-1 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="height">Height (cm)</Label>
                <Input 
                  id="height" 
                  v-model.number="form.height" 
                  type="number" 
                  step="0.1" 
                  min="0"
                  placeholder="170"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  v-model.number="form.weight" 
                  type="number" 
                  step="0.1" 
                  min="0"
                  placeholder="65"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="bodyfat">Body Fat (%) - Optional</Label>
                <Input 
                  id="bodyfat" 
                  v-model.number="form.bodyfat" 
                  type="number" 
                  step="0.1" 
                  min="0" 
                  max="100"
                  placeholder="15"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="activitylevel">Activity Level</Label>
                <Select v-model="form.activitylevel">
                  <SelectTrigger class="h-12 rounded-xl border-2 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300">
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem :value="1">Sedentary</SelectItem>
                    <SelectItem :value="2">Light Active</SelectItem>
                    <SelectItem :value="3">1–2 Days /week</SelectItem>
                    <SelectItem :value="4">3–5 Days /week</SelectItem>
                    <SelectItem :value="5">Hard Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div class="space-y-2 md:col-span-2">
                <Label for="maingoal">Main Goal</Label>
                <Select v-model="form.maingoal">
                  <SelectTrigger class="h-12 rounded-xl border-2 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOSE_WEIGHT">🔥 Lose Weight</SelectItem>
                    <SelectItem value="GAIN_MUSCLE">💪 Gain Muscle</SelectItem>
                    <SelectItem value="MAINTAIN">⚖️ Maintain</SelectItem>
                    <SelectItem value="RECOMP">✨ Recomposition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <!-- Habits Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Utensils class="w-5 h-5 text-emerald-600" />
              <h2 class="text-lg font-bold text-emerald-600">Eating & Habits</h2>
              <div class="flex-1 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
            </div>
            
            <!-- Toggle Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                @click="form.alcohol = !form.alcohol"
                :class="[
                  'flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300',
                  form.alcohol 
                    ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100/50 shadow-lg shadow-emerald-500/10' 
                    : 'border-gray-200 bg-white/80 hover:border-emerald-300 hover:shadow-md'
                ]"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🍷</span>
                  <span class="font-semibold text-gray-700">Drinks Alcohol</span>
                </div>
                <Switch 
                  :model-value="form.alcohol" 
                  class="pointer-events-none data-[state=checked]:bg-emerald-500" 
                />
              </div>
              
              <div 
                @click="form.smoking = !form.smoking"
                :class="[
                  'flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300',
                  form.smoking 
                    ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100/50 shadow-lg shadow-emerald-500/10' 
                    : 'border-gray-200 bg-white/80 hover:border-emerald-300 hover:shadow-md'
                ]"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🚬</span>
                  <span class="font-semibold text-gray-700">Smoking</span>
                </div>
                  <Switch 
                    :model-value="form.smoking" 
                    class="pointer-events-none data-[state=checked]:bg-emerald-500" 
                  />
              </div>
            </div>
            
            <!-- Taste Preferences -->
            <div class="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-emerald-100 space-y-6">
              <h3 class="font-bold text-emerald-600 flex items-center gap-2">
                <Sparkles class="w-4 h-4" />
                Taste Preferences
              </h3>
              
              <!-- Sweet Slider -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">🍰 Sweet</span>
                  <span class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {{ form.sweetlevel }}
                  </span>
                </div>
                <Slider
                  v-model="sweetSlider"
                  :max="5"
                  :step="1"
                  class="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-emerald-500 [&_[role=slider]]:to-emerald-600 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
                />
              </div>

              <!-- Salty Slider -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">🧂 Salty</span>
                  <span class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {{ form.saltylevel }}
                  </span>
                </div>
                <Slider
                  v-model="saltySlider"
                  :max="5"
                  :step="1"
                  class="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-emerald-500 [&_[role=slider]]:to-emerald-600 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
                />
              </div>

              <!-- Sour Slider -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">🍋 Sour</span>
                  <span class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {{ form.sourlevel }}
                  </span>
                </div>
                <Slider
                  v-model="sourSlider"
                  :max="5"
                  :step="1"
                  class="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-emerald-500 [&_[role=slider]]:to-emerald-600 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
                />
              </div>
            </div>
          </div>

          <!-- Meal Times Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Clock class="w-5 h-5 text-emerald-600" />
              <h2 class="text-lg font-bold text-emerald-600">Meal Times</h2>
              <div class="flex-1 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="space-y-2">
                <Label for="breakfast">Breakfast Time</Label>
                <Input 
                  id="breakfast" 
                  v-model="form.breakfastTime" 
                  type="time"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="lunch">Lunch Time</Label>
                <Input 
                  id="lunch" 
                  v-model="form.lunchTime" 
                  type="time"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="dinner">Dinner Time</Label>
                <Input 
                  id="dinner" 
                  v-model="form.dinnerTime" 
                  type="time"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
            </div>
          </div>
          
          <!-- Error Message -->
          <div v-if="errors.form" class="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600">
            <span class="text-lg flex-shrink-0">⚠️</span>
            <span class="text-sm font-semibold whitespace-pre-line">{{ errors.form }}</span>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :disabled="isSubmitting"
            class="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1 group"
          >
            <span>{{ isSubmitting ? 'Creating...' : 'Create Account' }}</span>
            <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Eye,
  EyeOff,
  Ruler,
  Sparkles,
  Target,
  User,
  Utensils
} from 'lucide-vue-next'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// shadcn-vue components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

import authApi from '../api/authApi'

const router = useRouter()
const isSubmitting = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const errors = reactive({ username: '', confirmPassword: '', form: '' })
const usernameChecking = ref(false)
const usernameAvailable = ref(false)

const validateUsername = () => {
  const val = form.username
  form.username = val.replace(/[^a-zA-Z0-9_]/g, '')
  errors.username = form.username !== val
    ? 'Username ใส่ได้แค่ภาษาอังกฤษ (a-z, 0-9, _)'
    : ''
  usernameAvailable.value = false
}

const checkUsernameAvailable = async () => {
  if (!form.username || errors.username) return
  usernameChecking.value = true
  usernameAvailable.value = false
  try {
    await authApi.checkUsername(form.username)
    usernameAvailable.value = true
  } catch (err) {
    if (err.response?.status === 409) {
      errors.username = 'Username นี้ถูกใช้งานแล้ว'
    }
  } finally {
    usernameChecking.value = false
  }
}

const form = reactive({
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
  firstname: "",
  lastname: "",
  birthDate: "",
  sex: "",
  height: 0,
  weight: 0,
  bodyfat: 0,
  activitylevel: 3,
  maingoal: "LOSE_WEIGHT",
  alcohol: false,
  smoking: false,
  sweetlevel: 3,
  saltylevel: 3,
  sourlevel: 3,
  breakfastTime: "07:00",
  lunchTime: "12:00",
  dinnerTime: "18:00",
  role: "CUSTOMER"
})

// Slider bindings (shadcn Slider uses array)
const sweetSlider = computed({
  get: () => [form.sweetlevel],
  set: (val) => form.sweetlevel = val[0]
})

const saltySlider = computed({
  get: () => [form.saltylevel],
  set: (val) => form.saltylevel = val[0]
})

const sourSlider = computed({
  get: () => [form.sourlevel],
  set: (val) => form.sourlevel = val[0]
})

const goBack = () => {
  router.push('/signin')
}

const submitForm = async () => {
  if (isSubmitting.value) return

  errors.form = ''
  errors.confirmPassword = ''

  const missingFields = []
  if (!form.username) missingFields.push('Username')
  if (!form.phone) missingFields.push('Phone')
  if (!form.password) missingFields.push('Password')
  if (!form.confirmPassword) missingFields.push('Confirm Password')
  if (!form.birthDate) missingFields.push('Birth Date')
  if (!form.sex) missingFields.push('Sex')
  if (!form.height || form.height <= 0) missingFields.push('Height (cm)')
  if (!form.weight || form.weight <= 0) missingFields.push('Weight (kg)')
  if (!form.activitylevel) missingFields.push('Activity Level')
  if (!form.maingoal) missingFields.push('Main Goal')
  if (!form.breakfastTime) missingFields.push('Breakfast Time')
  if (!form.lunchTime) missingFields.push('Lunch Time')
  if (!form.dinnerTime) missingFields.push('Dinner Time')

  if (missingFields.length > 0) {
    errors.form = `กรุณากรอกข้อมูลให้ครบ:\n• ${missingFields.join('\n• ')}`
    return
  }

  if (form.phone.length < 10) {
    errors.form = 'เบอร์โทรต้องมีอย่างน้อย 10 หลัก'
    return
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
    return
  }

  try {
    isSubmitting.value = true
    const res = await authApi.register(form)
    if (!res.data.success) {
      const msg = res.data.message || ''
      if (msg.toLowerCase().includes('username')) {
        errors.username = 'Username นี้ถูกใช้งานแล้ว'
      } else {
        errors.form = msg || 'สมัครสมาชิกไม่สำเร็จ'
      }
      return
    }
    router.push('/signin')
  } catch (err) {
    errors.form = err.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>
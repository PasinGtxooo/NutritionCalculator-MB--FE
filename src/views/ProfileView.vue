<template>
  <div class="min-h-screen flex justify-center p-6 md:p-12 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 relative overflow-hidden">
    
    <!-- Decorative Background -->
    <div class="absolute -top-24 -right-24 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    
    <!-- Glass Card -->
    <Card class="w-full max-w-2xl backdrop-blur-xl bg-white/60 border border-white/80 shadow-2xl shadow-black/10 rounded-3xl z-10 h-fit">
      <CardHeader class="text-center pb-2 relative">
        <!-- Back Button -->
        <Button 
          variant="outline" 
          size="sm" 
          @click="$router.push('/homepage')"
          class="absolute left-6 top-6 gap-2 rounded-xl border-2 hover:border-blue-500 hover:-translate-x-1 transition-all duration-300"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back</span>
        </Button>
        
        <!-- Icon -->
        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4 animate-bounce">
          <Pencil class="w-8 h-8 text-white" />
        </div>
        
        <CardTitle class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
          Edit Profile
        </CardTitle>
        <CardDescription class="text-gray-500">
          Update your personal information and preferences.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form @submit.prevent="submitForm" class="space-y-8">
          
          <!-- Personal Info Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <User class="w-5 h-5 text-blue-600" />
              <h2 class="text-lg font-bold text-blue-600">Personal Info</h2>
              <div class="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="firstname">First Name</Label>
                <Input 
                  id="firstname" 
                  v-model="form.firstname" 
                  placeholder="Enter first name"
                  class="h-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="lastname">Last Name</Label>
                <Input 
                  id="lastname" 
                  v-model="form.lastname" 
                  placeholder="Enter last name"
                  class="h-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300"
                />
              </div>
            </div>
          </div>
          
          <!-- Body Stats Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Ruler class="w-5 h-5 text-blue-600" />
              <h2 class="text-lg font-bold text-blue-600">Body Stats</h2>
              <div class="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
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
                  class="h-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300"
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
                  class="h-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="bodyfat">Body Fat (%)</Label>
                <Input 
                  id="bodyfat" 
                  v-model.number="form.bodyfat" 
                  type="number" 
                  step="0.1" 
                  min="0" 
                  max="100"
                  placeholder="15"
                  class="h-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="activitylevel">Activity Level</Label>
                <Select v-model="form.activitylevel">
                  <SelectTrigger class="h-12 rounded-xl border-2 focus:border-blue-500 hover:border-blue-300 transition-all duration-300">
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem :value="1">Sedentary</SelectItem>
                    <SelectItem :value="2">Light Exercise</SelectItem>
                    <SelectItem :value="3">3–5 Days</SelectItem>
                    <SelectItem :value="4">Hard Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div class="space-y-2 md:col-span-2">
                <Label for="maingoal">Main Goal</Label>
                <Select v-model="form.maingoal">
                  <SelectTrigger class="h-12 rounded-xl border-2 focus:border-blue-500 hover:border-blue-300 transition-all duration-300">
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
              <Utensils class="w-5 h-5 text-blue-600" />
              <h2 class="text-lg font-bold text-blue-600">Eating & Habits</h2>
              <div class="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
            </div>
            
            <!-- Toggle Cards -->
            <div class="grid grid-cols-2 gap-4">
              <div 
                @click="form.alcohol = !form.alcohol"
                :class="[
                  'flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300',
                  form.alcohol 
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50 shadow-lg shadow-blue-500/10' 
                    : 'border-gray-200 bg-white/80 hover:border-blue-300 hover:shadow-md'
                ]"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🍷</span>
                  <span class="font-semibold text-gray-700">Drinks Alcohol</span>
                </div>
                <Switch 
                  :model-value="form.alcohol" 
                  class="pointer-events-none data-[state=checked]:bg-blue-500" 
                />
              </div>
              
              <div 
                @click="form.smoking = !form.smoking"
                :class="[
                  'flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300',
                  form.smoking 
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50 shadow-lg shadow-blue-500/10' 
                    : 'border-gray-200 bg-white/80 hover:border-blue-300 hover:shadow-md'
                ]"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🚬</span>
                  <span class="font-semibold text-gray-700">Smoking</span>
                </div>
                <Switch 
                  :model-value="form.smoking" 
                  class="pointer-events-none data-[state=checked]:bg-blue-500" 
                />
              </div>
            </div>
            
            <!-- Taste Preferences -->
            <div class="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-blue-100 space-y-6">
              <h3 class="font-bold text-blue-600 flex items-center gap-2">
                <Sparkles class="w-4 h-4" />
                Taste Preferences
              </h3>
              
              <!-- Sweet Slider -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">🍰 Sweet</span>
                  <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {{ form.sweetlevel }}
                  </span>
                </div>
                <Slider
                  v-model="sweetSlider"
                  :max="5"
                  :step="1"
                  class="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-blue-600 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
                />
              </div>

              <!-- Salty Slider -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">🧂 Salty</span>
                  <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {{ form.saltylevel }}
                  </span>
                </div>
                <Slider
                  v-model="saltySlider"
                  :max="5"
                  :step="1"
                  class="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-blue-600 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
                />
              </div>

              <!-- Sour Slider -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">🍋 Sour</span>
                  <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {{ form.sourlevel }}
                  </span>
                </div>
                <Slider
                  v-model="sourSlider"
                  :max="5"
                  :step="1"
                  class="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-blue-600 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
                />
              </div>
            </div>
          </div>
          
          <!-- Meal Times Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Clock class="w-5 h-5 text-blue-600" />
              <h2 class="text-lg font-bold text-blue-600">Meal Times</h2>
              <div class="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="space-y-2">
                <Label for="breakfast">Breakfast Time</Label>
                <Input 
                  id="breakfast" 
                  v-model="form.breakfastTime" 
                  type="time"
                  class="h-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="lunch">Lunch Time</Label>
                <Input 
                  id="lunch" 
                  v-model="form.lunchTime" 
                  type="time"
                  class="h-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="dinner">Dinner Time</Label>
                <Input 
                  id="dinner" 
                  v-model="form.dinnerTime" 
                  type="time"
                  class="h-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300"
                />
              </div>
            </div>
          </div>
          
          <!-- Buttons -->
          <div class="grid grid-cols-2 gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline"
              @click="resetForm"
              class="h-14 text-base font-bold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 group"
            >
              <RotateCcw class="w-5 h-5 mr-2 group-hover:-rotate-180 transition-transform duration-500" />
              <span>Reset</span>
            </Button>
            
            <Button 
              type="submit" 
              :disabled="isSubmitting"
              class="h-14 text-base font-bold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 group"
            >
              <Loader2 v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" />
              <span>{{ isSubmitting ? 'Saving...' : 'Save Changes' }}</span>
              <Check v-if="!isSubmitting" class="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
          
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  Pencil, 
  User, 
  Ruler, 
  Utensils, 
  Clock,
  Sparkles,
  RotateCcw,
  Check,
  Loader2
} from 'lucide-vue-next'

// shadcn-vue components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'

import userApi from '../api/userApi'

const router = useRouter()
const isSubmitting = ref(false)
const originalData = ref(null)

const form = reactive({
  firstname: "",
  lastname: "",
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
  dinnerTime: "18:00"
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

const loadProfile = async () => {
  try {
    const res = await userApi.getUserByJwt()
    const data = res.data.data
    console.log('sweetlevel from API:', data)
    Object.assign(form, {
      firstname: data.firstname ?? "",
      lastname: data.lastname ?? "",
      height: data.height ?? 0,
      weight: data.weight ?? 0,
      bodyfat: data.bodyfat ?? 0,
      activitylevel: data.activitylevel ?? 3,
      maingoal: data.maingoal ?? "LOSE_WEIGHT",
      alcohol: data.alcohol ?? false,
      smoking: data.smoking ?? false,
      sweetlevel: data.sweetlevel ?? 5,
      saltylevel: data.saltylevel ?? 5,
      sourlevel: data.sourlevel ?? 5,
      breakfastTime: data.breakfastTime ?? "07:00",
      lunchTime: data.lunchTime ?? "12:00",
      dinnerTime: data.dinnerTime ?? "18:00",
    })

    originalData.value = { ...form }

  } catch (err) {
    console.error('Failed to load profile', err)
    alert('โหลดข้อมูลผู้ใช้ไม่สำเร็จ')
    router.push('/signin')
  }
}

const resetForm = () => {
  if (originalData.value) {
    Object.assign(form, originalData.value)
  }
}

const submitForm = async () => {
  if (isSubmitting.value) return

  try {
    isSubmitting.value = true

    const payload = {
      firstname: form.firstname,
      lastname: form.lastname,
      height: form.height,
      weight: form.weight,
      bodyfat: form.bodyfat,
      activitylevel: form.activitylevel,
      maingoal: form.maingoal,
      alcohol: form.alcohol,
      smoking: form.smoking,
      sweetlevel: form.sweetlevel,
      saltylevel: form.saltylevel,
      sourlevel: form.sourlevel,
      breakfastTime: form.breakfastTime,
      lunchTime: form.lunchTime,
      dinnerTime: form.dinnerTime,
    }

    await userApi.updateUserByJwt(payload)

    alert('✅ Profile updated successfully')
    router.push('/homepage')

  } catch (err) {
    console.error('Update failed', err)
    alert(err.response?.data?.message || 'อัปเดตข้อมูลไม่สำเร็จ')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadProfile()
})
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
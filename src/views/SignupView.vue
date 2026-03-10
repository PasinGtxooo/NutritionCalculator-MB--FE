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
        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4 animate-bounce">
          <Target class="w-8 h-8 text-white" />
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
                  placeholder="Enter username"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
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
                <Input 
                  id="password" 
                  v-model="form.password" 
                  type="password" 
                  required 
                  minlength="6"
                  placeholder="Enter password"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  v-model="form.confirmPassword" 
                  type="password" 
                  required 
                  minlength="6"
                  placeholder="Confirm password"
                  class="h-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300"
                />
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
  
  try {
    isSubmitting.value = true
    
    const missingFields = []
    
    if (!form.username) missingFields.push('Username')
    if (!form.phone) missingFields.push('Phone')
    if (!form.password) missingFields.push('Password')
    if (!form.confirmPassword) missingFields.push('Confirm Password')
    if (!form.birthDate) missingFields.push('Birth Date')
    if (!form.sex) missingFields.push('Sex')
    if (!form.height || form.height <= 0) missingFields.push('Height')
    if (!form.weight || form.weight <= 0) missingFields.push('Weight')
    if (!form.activitylevel) missingFields.push('Activity Level')
    if (!form.maingoal) missingFields.push('Main Goal')
    if (!form.breakfastTime) missingFields.push('Breakfast Time')
    if (!form.lunchTime) missingFields.push('Lunch Time')
    if (!form.dinnerTime) missingFields.push('Dinner Time')
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields:\n• ${missingFields.join('\n• ')}`)
      return
    }
    
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    
    if (form.phone.length < 10) {
      alert('Phone number must be at least 10 digits')
      return
    }

    console.log('Registering user', form)
    const res = await authApi.register(form)
    
    console.log('Register success', res.data)
    alert('Registration successful! Please login.')
    router.push('/signin')
  } catch (err) {
    console.error('Register failed', err)
    alert(err.response?.data?.message || 'Registration failed. Please try again.')
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
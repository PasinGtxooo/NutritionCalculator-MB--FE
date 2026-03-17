
Copy

<template>
  <div class="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-emerald-50 via-sky-50 to-orange-50 relative overflow-hidden">
    
    <!-- Decorative Background -->
    <div class="absolute -top-24 -right-24 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    
    <!-- Glass Card -->
    <Card class="w-full max-w-md backdrop-blur-xl bg-white/60 border border-white/80 shadow-2xl shadow-black/10 rounded-3xl z-10">
      <CardHeader class="text-center pb-2">
        <!-- Icon -->
        <div class="mx-auto w-28 h-28 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4 animate-bounce">
          <img src="/logoGreenHealth.png" alt="Logo" class="w-24 h-24 rounded-2xl object-cover" />
        </div>
        
        <CardTitle class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
          Welcome
        </CardTitle>
        <CardDescription class="text-gray-500">
          Sign in to continue your fitness journey
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form @submit.prevent="login" class="space-y-6">
          
          <!-- Username -->
          <div class="space-y-2">
            <Label for="username">Username</Label>
            <div class="relative">
              <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                id="username" 
                v-model="username" 
                required 
                placeholder="Enter username"
                class="h-14 pl-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300 text-base"
              />
            </div>
          </div>
          
          <!-- Password -->
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <div class="relative">
              <KeyRound class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="Enter password"
                class="h-14 pl-12 pr-12 rounded-xl border-2 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300 text-base"
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
          
          <!-- Remember Me -->
          <div 
            @click="rememberMe = !rememberMe"
            class="flex items-center gap-3 cursor-pointer group"
          >
            <div 
              :class="[
                'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300',
                rememberMe 
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-500' 
                  : 'border-gray-300 bg-white group-hover:border-emerald-400'
              ]"
            >
              <Check v-if="rememberMe" class="w-3.5 h-3.5 text-white" />
            </div>
            <span class="text-sm font-medium text-gray-600 select-none">Remember me</span>
          </div>
          
          <!-- Error Message -->
          <transition name="shake">
            <div 
              v-if="errorMessage" 
              class="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600"
            >
              <AlertCircle class="w-5 h-5 flex-shrink-0" />
              <span class="text-sm font-semibold">{{ errorMessage }}</span>
            </div>
          </transition>
          
          <!-- Submit Button -->
          <Button 
            type="submit" 
            :disabled="isLoading"
            class="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1 group"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 mr-2 animate-spin" />
            <span>{{ isLoading ? 'Signing In...' : 'Sign In' }}</span>
            <ArrowRight v-if="!isLoading" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <!-- Sign Up Link -->
          <div class="text-center text-sm text-gray-500">
            <span>Don't have an account?</span>
            <router-link 
              to="/signup" 
              class="ml-1 font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
            >
              Create Account
            </router-link>
          </div>
          
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Lock,
  User,
  KeyRound,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-vue-next'

// shadcn-vue components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import authApi from '../api/authApi'

const router = useRouter()

const username = ref("")
const password = ref("")
const rememberMe = ref(false)
const errorMessage = ref("")
const isLoading = ref(false)
const showPassword = ref(false)

const login = async () => {
  errorMessage.value = ""

  if (!username.value || !password.value) {
    errorMessage.value = "Please fill in all fields"
    return
  }

  try {
    isLoading.value = true

    const payload = {
      username: username.value,
      password: password.value,
    }

    const res = await authApi.login(payload)

    const { token } = res.data.data
    localStorage.setItem('token', token)

    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
    }

    router.push('/homepage')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Invalid username or password"
  } finally {
    isLoading.value = false
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

/* Shake animation for error */
.shake-enter-active {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}
</style>
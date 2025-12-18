<template>
  <div class="min-h-screen bg-black text-[#F7F9F9] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-20 h-20 bg-[#1D9BF0]/20 border-2 border-[#1D9BF0] rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-[#F7F9F9]">
        Support Portal
      </h2>
      <p class="mt-2 text-center text-sm text-[#71767A]">
        Sign in to access your project support tickets
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-[#16181C] border border-[#2F3336] rounded-lg py-8 px-4 shadow-xl sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="username" class="block text-sm font-medium text-[#71767A]">
              Username
            </label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="appearance-none block w-full pl-10 px-3 py-2 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:ring-1 focus:ring-[#1D9BF0] focus:border-[#1D9BF0] sm:text-sm transition-colors duration-150"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-[#71767A]">
              Password
            </label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none block w-full pl-10 px-3 py-2 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:ring-1 focus:ring-[#1D9BF0] focus:border-[#1D9BF0] sm:text-sm transition-colors duration-150"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div v-if="error" class="rounded-lg bg-[#2F3336] border border-[#F4212E]/30 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-[#F4212E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-[#F4212E]">
                  {{ error }}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full text-sm font-bold text-white bg-[#1D9BF0] hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: false,
  middleware: 'client-auth'
})

const router = useRouter()
const form = ref({
  username: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

// Check if user is already authenticated
onMounted(() => {
  const runtimeConfig = useRuntimeConfig()
  if (runtimeConfig.app.client) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const token = useCookie('auth_token').value
    
    if (isAuthenticated || token) {
      // Check user role to redirect appropriately
      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          const user = JSON.parse(userStr)
          if (user.role === 'user') {
            router.push('/support/dashboard')
          } else {
            // Admin users should not access support auth
            router.push('/admin')
          }
        } catch (err) {
          router.push('/admin/auth')
        }
      } else {
        router.push('/admin/auth')
      }
    }
  }
})

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    // Check if user is a client (role: 'user')
    if (data.user.role !== 'user') {
      throw new Error('This portal is for clients only. Please use the admin login.')
    }

    // Store user data and authentication state in localStorage
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('isAuthenticated', 'true')
    
    // Redirect client users to support dashboard
    router.push('/support/dashboard')
  } catch (err) {
    error.value = err.message || 'Login failed'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>


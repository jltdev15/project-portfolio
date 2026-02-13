<template>
  <div class="min-h-screen bg-black text-[#F7F9F9]">
    <!-- Header Bar -->
    <div class="sticky top-0 z-50 bg-black border-b border-[#2F3336]">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="text-xl font-bold">Admin Dashboard</h1>
        <div class="flex items-center space-x-2">
          <!-- Settings (Coming soon) -->
          <button
            type="button"
            disabled
            title="Coming soon"
            class="p-2.5 rounded-full hover:bg-[#181919] transition-colors duration-150 opacity-50 cursor-not-allowed"
            aria-label="Settings (coming soon)"
          >
            <svg class="w-6 h-6 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="relative" ref="dropdownRef">
          <!-- Avatar Button -->
          <button
            @click="toggleDropdown"
            class="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-[#181919] transition-colors duration-150"
            aria-label="User menu"
          >
            <div class="w-10 h-10 rounded-full bg-[#1D9BF0]/20 border-2 border-[#1D9BF0] flex items-center justify-center overflow-hidden">
              <NuxtImg 
                v-if="userInfo?.avatar" 
                :src="userInfo.avatar" 
                alt="Avatar"
                class="w-full h-full object-cover"
                preset="avatar"
              />
              <Icon 
                v-else
                name="lucide:user" 
                class="w-6 h-6 text-[#1D9BF0]"
              />
            </div>
            <div class="hidden md:block text-left">
              <p class="text-sm font-medium text-[#F7F9F9]">{{ userInfo?.username || 'Admin' }}</p>
              <p class="text-xs text-[#71767A]">Administrator</p>
            </div>
            <Icon 
              name="lucide:chevron-down" 
              class="w-4 h-4 text-[#71767A] transition-transform duration-200"
              :class="{ 'rotate-180': isDropdownOpen }"
            />
          </button>

          <!-- Dropdown Menu -->
          <Transition name="dropdown">
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-56 bg-[#16181C] border border-[#2F3336] rounded-lg shadow-xl overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-[#2F3336]">
                <p class="text-sm font-medium text-[#F7F9F9]">{{ userInfo?.username || 'Admin' }}</p>
                <p class="text-xs text-[#71767A] mt-0.5">{{ userInfo?.email || 'admin@example.com' }}</p>
              </div>
              <div class="py-1">
                <button
                  @click="openProfileModal"
                  class="w-full px-4 py-2 text-left text-sm text-[#F7F9F9] hover:bg-[#181919] transition-colors duration-150 flex items-center space-x-2"
                >
                  <Icon name="lucide:user" class="w-4 h-4 text-[#1D9BF0]" />
                  <span>Profile</span>
                </button>
                <button
                  @click="handleLogout"
                  class="w-full px-4 py-2 text-left text-sm text-[#F7F9F9] hover:bg-[#181919] transition-colors duration-150 flex items-center space-x-2"
                >
                  <Icon name="lucide:log-out" class="w-4 h-4 text-[#F4212E]" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <!-- Total Projects Card -->
        <div class="border border-[#2F3336] rounded-lg p-6 hover:bg-[#181919] transition-colors duration-150">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-[#71767A]">Total Projects</h3>
            <svg class="w-5 h-5 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div v-if="statsLoading" class="animate-pulse">
            <div class="h-8 w-16 bg-[#2F3336] rounded"></div>
          </div>
          <p v-else class="text-3xl font-bold">{{ stats?.totalProjects ?? 0 }}</p>
        </div>

        <!-- Recent Activity Card -->
        <div class="border border-[#2F3336] rounded-lg p-6 hover:bg-[#181919] transition-colors duration-150">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-[#71767A]">Recent Activity</h3>
            <svg class="w-5 h-5 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div v-if="statsLoading" class="animate-pulse">
            <div class="h-8 w-20 bg-[#2F3336] rounded"></div>
          </div>
          <p v-else class="text-3xl font-bold">{{ stats?.recentProjects || 0 }}</p>
          <p class="text-xs text-[#71767A] mt-1">Last 7 days</p>
        </div>

        <!-- User Info Card -->
        <div class="border border-[#2F3336] rounded-lg p-6 hover:bg-[#181919] transition-colors duration-150">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-[#71767A]">Welcome</h3>
            <svg class="w-5 h-5 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div v-if="statsLoading" class="animate-pulse">
            <div class="h-6 w-24 bg-[#2F3336] rounded"></div>
          </div>
          <p v-else class="text-lg font-semibold">{{ userInfo?.username || 'Admin' }}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h2 class="text-lg font-bold mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Content Management System Card -->
          <NuxtLink
            to="/admin/projects"
            class="border border-[#2F3336] rounded-lg p-6 hover:bg-[#181919] transition-all duration-150 group cursor-pointer"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-[#1D9BF0]/10 rounded-lg group-hover:bg-[#1D9BF0]/20 transition-colors">
                <svg class="w-6 h-6 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-bold mb-1">Content Management System</h3>
                <p class="text-sm text-[#71767A]">Manage the content of your website's project sections</p>
              </div>
              <svg class="w-5 h-5 text-[#71767A] group-hover:text-[#1D9BF0] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>

          <!-- Project Ticketing System Card -->
          <NuxtLink
            to="/admin/tickets"
            class="border border-[#2F3336] rounded-lg p-6 hover:bg-[#181919] transition-all duration-150 group cursor-pointer"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-[#1D9BF0]/10 rounded-lg group-hover:bg-[#1D9BF0]/20 transition-colors">
                <svg class="w-6 h-6 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-bold mb-1">Project Ticketing System</h3>
                <p class="text-sm text-[#71767A]">Manage and track project tickets and issues</p>
              </div>
              <svg class="w-5 h-5 text-[#71767A] group-hover:text-[#1D9BF0] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>

          <!-- Project Billing Card (prefetch disabled so server auth doesn't redirect before client auth runs) -->
          <NuxtLink
            to="/admin/billing"
            :prefetch="false"
            class="border border-[#2F3336] rounded-lg p-6 hover:bg-[#181919] transition-all duration-150 group cursor-pointer"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-[#1D9BF0]/10 rounded-lg group-hover:bg-[#1D9BF0]/20 transition-colors">
                <svg class="w-6 h-6 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5 5l6-6M2 17h.01M6 17h.01M10 17h.01M14 17h.01M18 17h.01M2 7h.01M6 7h.01M10 7h.01M14 7h.01M18 7h.01M2 12h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-bold mb-1">Project Billing</h3>
                <p class="text-sm text-[#71767A]">Generate PDF billing for each project</p>
              </div>
              <svg class="w-5 h-5 text-[#71767A] group-hover:text-[#1D9BF0] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Recent Projects Preview -->
      <div v-if="!statsLoading && recentProjects.length > 0">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold">Recent Projects</h2>
          <NuxtLink
            to="/admin/projects"
            class="text-sm text-[#1D9BF0] hover:underline"
          >
            View all
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="project in recentProjects"
            :key="project._id"
            class="border border-[#2F3336] rounded-lg overflow-hidden hover:bg-[#181919] transition-colors duration-150"
          >
            <div class="aspect-video overflow-hidden">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
              <h3 class="font-bold mb-1 line-clamp-1">{{ project.title }}</h3>
              <p class="text-sm text-[#71767A] line-clamp-2 mb-3">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies.slice(0, 3)"
                  :key="tech"
                  class="px-2 py-0.5 bg-[#2F3336] text-[#71767A] rounded-full text-xs"
                >
                  {{ tech }}
                </span>
                <span v-if="project.technologies.length > 3" class="px-2 py-0.5 text-[#71767A] text-xs">
                  +{{ project.technologies.length - 3 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showProfileModal"
          @click.self="closeProfileModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div class="bg-[#16181C] border border-[#2F3336] rounded-2xl max-w-2xl w-full shadow-2xl">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 border-b border-[#2F3336]">
              <h2 class="text-lg font-bold text-[#F7F9F9]">Edit Profile</h2>
              <button
                @click="closeProfileModal"
                class="p-2 rounded-full hover:bg-[#181919] transition-colors duration-150"
                title="Close"
              >
                <Icon name="lucide:x" class="w-5 h-5 text-[#71767A]" />
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-4">
              <form @submit.prevent="handleProfileSubmit" class="space-y-4">
                <!-- Avatar Upload -->
                <div class="flex flex-col items-center mb-6">
                  <div class="relative group">
                    <div class="w-32 h-32 rounded-full bg-[#1D9BF0]/20 border-4 border-[#1D9BF0] flex items-center justify-center overflow-hidden">
                      <NuxtImg 
                        v-if="profileForm.avatar" 
                        :src="profileForm.avatar" 
                        alt="Avatar"
                        class="w-full h-full object-cover"
                        preset="avatar"
                      />
                      <Icon 
                        v-else
                        name="lucide:user" 
                        class="w-16 h-16 text-[#1D9BF0]"
                      />
                    </div>
                    <label
                      for="avatar-upload"
                      class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer rounded-full"
                    >
                      <Icon name="lucide:camera" class="w-6 h-6 text-white" />
                    </label>
                    <input
                      type="file"
                      id="avatar-upload"
                      ref="avatarInput"
                      @change="handleAvatarSelect"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      class="hidden"
                      :disabled="uploading"
                    />
                  </div>
                  <p class="text-xs text-[#71767A] mt-2">Click to upload avatar (max 5MB)</p>
                  <!-- Upload Progress -->
                  <div v-if="uploading && uploadProgress !== undefined" class="mt-3 w-full max-w-xs">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-xs text-[#71767A]">Uploading...</span>
                      <span class="text-xs text-[#71767A]">{{ Math.round(uploadProgress || 0) }}%</span>
                    </div>
                    <div class="w-full bg-[#2F3336] rounded-full h-1">
                      <div 
                        class="bg-[#1D9BF0] h-1 rounded-full transition-all duration-300"
                        :style="{ width: `${uploadProgress || 0}%` }"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Username -->
                <div>
                  <label for="username" class="block text-sm font-medium text-[#71767A] mb-2">Username</label>
                  <input
                    type="text"
                    id="username"
                    v-model="profileForm.username"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Username"
                    required
                  />
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-[#71767A] mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="profileForm.email"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Email"
                    required
                  />
                </div>

                <!-- First Name and Last Name -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-[#71767A] mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      v-model="profileForm.firstName"
                      class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-[#71767A] mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      v-model="profileForm.lastName"
                      class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-[#71767A] mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="profileForm.phone"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Phone number"
                  />
                </div>

                <!-- Success Message -->
                <div v-if="profileSuccess" class="p-3 bg-[#2F3336] border border-[#00BA7C]/30 rounded-lg flex items-center space-x-2">
                  <Icon name="lucide:check-circle" class="w-5 h-5 text-[#00BA7C] flex-shrink-0" />
                  <p class="text-sm text-[#00BA7C]">{{ profileSuccess }}</p>
                </div>

                <!-- Error Message -->
                <div v-if="profileError" class="p-3 bg-[#2F3336] border border-[#F4212E]/30 rounded-lg flex items-center space-x-2">
                  <Icon name="lucide:alert-circle" class="w-5 h-5 text-[#F4212E] flex-shrink-0" />
                  <p class="text-sm text-[#F4212E]">{{ profileError }}</p>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end pt-2 space-x-3">
                  <button
                    type="button"
                    @click="closeProfileModal"
                    class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] focus:outline-none transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-2.5 bg-[#1D9BF0] text-white font-bold rounded-full hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="profileLoading || uploading"
                  >
                    <span v-if="profileLoading || uploading" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ uploading ? 'Uploading...' : 'Saving...' }}
                    </span>
                    <span v-else>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  ssr: false
})

import { useFirebaseStorage } from '~/composables/useFirebaseStorage'

const router = useRouter()
const { uploadImage, uploading, uploadProgress } = useFirebaseStorage() || { uploadImage: () => Promise.resolve(''), uploading: ref(false), uploadProgress: ref(0) }

interface Project {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  linkUrl: string
  createdAt?: string
}

interface Stats {
  totalProjects: number
  recentProjects: number
}

interface ProfileForm {
  username: string
  email: string
  avatar: string
  firstName: string
  lastName: string
  phone: string
}

const stats = ref<Stats>({
  totalProjects: 0,
  recentProjects: 0
})

const statsLoading = ref(true)
const projects = ref<Project[]>([])
const userInfo = ref<any>(null)
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const showProfileModal = ref(false)
const profileLoading = ref(false)
const profileError = ref<string | null>(null)
const profileSuccess = ref<string | null>(null)
const avatarFile = ref<File | null>(null)
const avatarInput = ref<HTMLInputElement | null>(null)

const profileForm = ref<ProfileForm>({
  username: '',
  email: '',
  avatar: '',
  firstName: '',
  lastName: '',
  phone: ''
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

const recentProjects = computed(() => {
  return projects.value.slice(0, 3)
})

const fetchStats = async () => {
  try {
    statsLoading.value = true
    const response = await fetch('/api/projects')
    if (!response.ok) throw new Error('Failed to fetch projects')
    
    const allProjects = await response.json() as Project[]
    projects.value = allProjects
    
    // Calculate stats
    stats.value.totalProjects = allProjects.length
    
    // Count projects from last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    stats.value.recentProjects = allProjects.filter((project: Project) => {
      if (!project.createdAt) return false
      const createdDate = new Date(project.createdAt)
      return createdDate >= sevenDaysAgo
    }).length
  } catch (err) {
    console.error('Error fetching stats:', err)
  } finally {
    statsLoading.value = false
  }
}

const openProfileModal = async () => {
  closeDropdown()
  // Fetch current profile data
  try {
    const response = await fetch('/api/auth/profile')
    if (response.ok) {
      const profileData = await response.json()
      profileForm.value = {
        username: profileData.username || '',
        email: profileData.email || '',
        avatar: profileData.avatar || '',
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phone: profileData.phone || ''
      }
    }
  } catch (err) {
    console.error('Error fetching profile:', err)
  }
  showProfileModal.value = true
}

const closeProfileModal = () => {
  showProfileModal.value = false
  profileError.value = null
  profileSuccess.value = null
  avatarFile.value = null
  if (avatarInput.value) {
    avatarInput.value.value = ''
  }
}

const handleAvatarSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) {
    avatarFile.value = null
    return
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    profileError.value = 'Invalid file type. Please upload a JPEG, PNG, or WebP image.'
    if (avatarInput.value) {
      avatarInput.value.value = ''
    }
    avatarFile.value = null
    return
  }

  // Validate file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    profileError.value = 'File size exceeds 5MB limit. Please upload a smaller image.'
    if (avatarInput.value) {
      avatarInput.value.value = ''
    }
    avatarFile.value = null
    return
  }

  avatarFile.value = file
  profileError.value = null

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (typeof result === 'string') {
      profileForm.value.avatar = result
    }
  }
  reader.readAsDataURL(file)
}

const handleProfileSubmit = async () => {
  try {
    profileLoading.value = true
    profileError.value = null
    profileSuccess.value = null

    // If a new avatar file is selected, upload it first
    if (avatarFile.value) {
      try {
        const imageUrl = await uploadImage(avatarFile.value, 'avatars')
        profileForm.value.avatar = imageUrl
      } catch (uploadErr) {
        const uploadError = uploadErr as Error
        console.error('Error uploading avatar:', uploadError)
        profileError.value = uploadError.message || 'Failed to upload avatar'
        profileLoading.value = false
        return
      }
    }

    // Update profile
    const response = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileForm.value)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update profile')
    }

    const result = await response.json()
    
    // Update userInfo and localStorage
    userInfo.value = result.user
    localStorage.setItem('user', JSON.stringify(result.user))
    
    // Show success message
    profileError.value = null
    profileSuccess.value = 'Profile updated successfully!'
    
    // Close modal after a short delay so user can see the success message
    setTimeout(() => {
      closeProfileModal()
    }, 1500)
  } catch (err) {
    const errorObj = err as Error
    console.error('Error updating profile:', errorObj)
    profileSuccess.value = null
    profileError.value = errorObj.message || 'Failed to update profile'
  } finally {
    profileLoading.value = false
  }
}

const handleLogout = async () => {
  try {
    closeDropdown()
    const response = await fetch('/api/auth/logout', {
      method: 'POST'
    })

    if (!response.ok) {
      throw new Error('Logout failed')
    }

    // Clear local storage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    
    // Redirect to login page
    router.push('/admin/auth')
  } catch (err) {
    console.error('Error logging out:', err)
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (showProfileModal.value) {
      closeProfileModal()
    }
    if (isDropdownOpen.value) {
      closeDropdown()
    }
  }
}

onMounted(() => {
  // Check authentication
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) {
    router.push('/admin/auth')
    return
  }

  // Get user info from localStorage
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      userInfo.value = user
      
      // Redirect client users to support dashboard
      if (user.role === 'user') {
        router.push('/support/dashboard')
        return
      }
    } catch (e) {
      console.error('Error parsing user info:', e)
    }
  }
  
  fetchStats()
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}
</style>

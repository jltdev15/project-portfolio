<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Animated background overlay -->
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>

    <!-- Animated particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute w-3 h-3 bg-white/20 rounded-full animate-float-1" style="top: 20%; left: 20%"></div>
      <div class="absolute w-3 h-3 bg-white/20 rounded-full animate-float-2" style="top: 40%; right: 20%"></div>
      <div class="absolute w-3 h-3 bg-white/20 rounded-full animate-float-3" style="bottom: 30%; left: 30%"></div>
      <div class="absolute w-3 h-3 bg-white/20 rounded-full animate-float-4" style="bottom: 40%; right: 30%"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="flex justify-between items-center mb-4">
          <button
            @click="handleLogout"
            class="px-4 py-2 text-sm font-medium text-white bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-blue-900 transition-colors duration-200"
          >
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </span>
          </button>
        </div>
        <h1 class="text-4xl font-bold text-white mb-4 animate-fade-in">Project Management</h1>
        <p class="text-lg text-blue-100 animate-fade-in-delay-1">Add and manage your portfolio projects</p>
      </div>

      <!-- Project Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-8 mb-8 border border-white/20 animate-fade-in-delay-2">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-white">Add New Project</h2>
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900 transition-colors duration-200"
          >
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Form
            </span>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="relative">
              <label for="title" class="block text-sm font-medium text-blue-100 mb-1">Project Title</label>
              <div class="relative rounded-lg">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="title"
                  v-model="form.title"
                  class="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>

            <div class="relative">
              <label for="image" class="block text-sm font-medium text-blue-100 mb-1">Image URL</label>
              <div class="relative rounded-lg">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="url"
                  id="image"
                  v-model="form.image"
                  class="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>

            <div class="relative">
              <label for="linkUrl" class="block text-sm font-medium text-blue-100 mb-1">Project URL</label>
              <div class="relative rounded-lg">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  type="url"
                  id="linkUrl"
                  v-model="form.linkUrl"
                  class="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="https://example.com/project"
                  required
                />
              </div>
            </div>

            <div class="relative">
              <label for="technologies" class="block text-sm font-medium text-blue-100 mb-1">Technologies</label>
              <div class="relative rounded-lg">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="technologies"
                  v-model="technologiesInput"
                  class="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Vue.js, Node.js, MongoDB"
                  required
                />
              </div>
              <p class="mt-1 text-sm text-blue-200">Separate technologies with commas</p>
            </div>
          </div>

          <div class="relative">
            <label for="description" class="block text-sm font-medium text-blue-100 mb-1">Description</label>
            <div class="relative rounded-lg">
              <div class="absolute top-3 left-3 pointer-events-none">
                <svg class="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Enter project description"
                required
              ></textarea>
            </div>
          </div>

          <div v-if="error" class="rounded-lg bg-red-500/20 p-4 border border-red-500/30">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-200">{{ error }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-blue-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              :disabled="loading"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Saving...' : 'Save Project' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Projects List -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-white/20 animate-fade-in-delay-2">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-white">Existing Projects</h2>
          <div class="text-sm text-blue-100">
            {{ projects.length }} project{{ projects.length !== 1 ? 's' : '' }}
          </div>
        </div>

        <div class="space-y-4">
          <div v-if="projectsLoading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          
          <div v-else-if="projectsError" class="rounded-lg bg-red-500/20 p-4 border border-red-500/30">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-200">{{ projectsError }}</p>
              </div>
            </div>
          </div>

          <div v-else-if="projects.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-white">No projects</h3>
            <p class="mt-1 text-sm text-blue-100">Get started by creating a new project.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="project in projects" :key="project._id" class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div class="relative">
                <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
                <div class="absolute top-2 right-2 flex space-x-2">
                  <button
                    @click="editProject(project)"
                    class="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors duration-200"
                    title="Edit project"
                  >
                    <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteProject(project._id)"
                    class="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors duration-200"
                    title="Delete project"
                  >
                    <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-semibold text-white mb-2">{{ project.title }}</h3>
                <p class="text-sm text-blue-100 mb-4 line-clamp-3">{{ project.description }}</p>
                <div class="mb-4">
                  <h4 class="text-sm font-medium text-blue-100 mb-2">Technologies</h4>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in project.technologies" :key="tech" class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                      {{ tech }}
                    </span>
                  </div>
                </div>
                <a 
                  :href="project.linkUrl" 
                  target="_blank" 
                  class="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  View Project
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'

const router = useRouter()

const form = ref({
  title: '',
  description: '',
  image: '',
  technologies: [],
  linkUrl: ''
})

const technologiesInput = computed({
  get: () => form.value.technologies.join(', '),
  set: (value) => {
    form.value.technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech)
  }
})

const loading = ref(false)
const projects = ref([])
const projectsLoading = ref(true)
const projectsError = ref(null)
const error = ref(null)

const fetchProjects = async () => {
  try {
    projectsLoading.value = true
    const response = await fetch('/api/projects')
    if (!response.ok) throw new Error('Failed to fetch projects')
    projects.value = await response.json()
  } catch (error) {
    projectsError.value = error.message
    console.error('Error fetching projects:', error)
  } finally {
    projectsLoading.value = false
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to save project')
    }

    await fetchProjects()
    resetForm()
  } catch (err) {
    console.error('Error saving project:', err)
    error.value = err.message || 'Failed to save project'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    image: '',
    technologies: [],
    linkUrl: ''
  }
}

const editProject = (project) => {
  form.value = { ...project }
}

const deleteProject = async (id) => {
  if (!confirm('Are you sure you want to delete this project?')) return

  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error('Failed to delete project')
    
    await fetchProjects()
  } catch (error) {
    console.error('Error deleting project:', error)
  }
}

const handleLogout = async () => {
  try {
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
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

onMounted(() => {
  // Check authentication
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) {
    router.push('/admin/auth')
    return
  }
  
  fetchProjects()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 1s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-float-1 {
  animation: float 6s ease-in-out infinite;
}

.animate-float-2 {
  animation: float 8s ease-in-out infinite;
}

.animate-float-3 {
  animation: float 7s ease-in-out infinite;
}

.animate-float-4 {
  animation: float 9s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style> 
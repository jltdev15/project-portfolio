<template>
  <div class="min-h-screen bg-black text-[#F7F9F9]">
    <!-- Header Bar (X-style top navigation) -->
    <div class="sticky top-0 z-50 bg-black border-b border-[#2F3336]">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="text-xl font-bold">Content Management System</h1>
        <div class="flex items-center space-x-3">
          <button
            @click="openNewProjectModal"
            class="px-4 py-2 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150"
          >
            New Project
          </button>
        </div>
      </div>
    </div>

    <!-- Breadcrumbs -->
    <div class="sticky top-[57px] z-40 bg-black border-b border-[#2F3336]">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <nav class="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
        <NuxtLink
          to="/admin"
          class="text-[#71767A] hover:text-[#F7F9F9] transition-colors duration-150 flex items-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </NuxtLink>
        <svg class="w-4 h-4 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-[#F7F9F9] font-medium">Projects</span>
        </nav>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="max-w-7xl mx-auto bg-black px-4"  >
      <div class="sticky top-[105px] z-30 bg-black border-b border-[#2F3336] px-4 py-3 -mx-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold">Projects</h2>
          <span class="text-sm text-[#71767A]">{{ projects.length }} project{{ projects.length !== 1 ? 's' : '' }}</span>
        </div>
      </div>

      <div class="py-4">
        <!-- Loading State -->
        <div v-if="projectsLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#2F3336] border-t-[#1D9BF0]"></div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="projectsError" class="p-4 border border-[#2F3336] rounded-lg">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-[#F4212E] mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <p class="text-sm text-[#F4212E]">{{ projectsError }}</p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="projects.length === 0" class="p-12 text-center border border-[#2F3336] rounded-lg">
          <p class="text-[#71767A]">No projects yet. Click "New Project" to get started.</p>
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="(project, index) in projects" 
            :key="project._id" 
            class="border border-[#2F3336] rounded-lg hover:bg-[#181919] transition-colors duration-150 overflow-hidden"
          >
            <div class="p-4">
              <!-- Project Content -->
              <div class="mb-3">
                <h3 class="text-base font-bold mb-2">{{ project.title || project.linkUrl }}</h3>
                <div class="flex items-center space-x-2 mb-3">
                  <svg class="w-4 h-4 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="text-sm text-[#71767A]">Owner: <span class="text-[#F7F9F9] font-medium">{{ project.owner }}</span></span>
                </div>
                <a 
                  :href="project.linkUrl" 
                  target="_blank"
                  class="text-sm text-[#1D9BF0] hover:underline flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {{ project.linkUrl }}
                </a>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-between">
                <a 
                  :href="project.linkUrl" 
                  target="_blank" 
                  class="text-[#1D9BF0] hover:underline text-sm font-medium"
                >
                  View Project
                </a>
                
                <div class="flex items-center space-x-2">
                  <button
                    @click="manageClientAccount(project)"
                    class="p-2 rounded-full hover:bg-[#2F3336] transition-colors duration-150"
                    :title="project.clientUser ? 'View Client Account' : 'Create Client Account'"
                  >
                    <svg class="w-5 h-5" :class="project.clientUser ? 'text-[#00BA7C]' : 'text-[#71767A]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                  <button
                    @click="editProject(project)"
                    class="p-2 rounded-full hover:bg-[#2F3336] transition-colors duration-150"
                    title="Edit project"
                  >
                    <svg class="w-5 h-5 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteProject(project._id)"
                    class="p-2 rounded-full hover:bg-[#2F3336] transition-colors duration-150"
                    title="Delete project"
                  >
                    <svg class="w-5 h-5 text-[#F4212E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Client Account Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showClientModal"
          @click.self="closeClientModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div class="bg-[#16181C] rounded-2xl max-w-lg w-full overflow-hidden border border-[#2F3336] shadow-2xl">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 border-b border-[#2F3336]">
              <h2 class="text-lg font-bold text-gray-50">
                {{ currentProject?.clientUser ? 'Client Account' : 'Create Client Account' }}
              </h2>
              <button
                @click="closeClientModal"
                class="p-2 rounded-full hover:bg-[#181919] transition-colors duration-150"
                title="Close"
              >
                <svg class="w-5 h-5 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-4">
              <div v-if="clientCredentials" class="space-y-4">
                <div class="p-4 bg-[#2F3336] rounded-lg border border-[#1D9BF0]/30">
                  <p class="text-sm text-[#71767A] mb-3">Client credentials (save these securely):</p>
                  <div class="space-y-3">
                    <div>
                      <label class="text-xs text-[#71767A] mb-1 block">Username</label>
                      <div class="flex items-center space-x-2">
                        <code class="flex-1 px-3 py-2 bg-black rounded text-[#F7F9F9] font-mono text-sm">{{ clientCredentials.username }}</code>
                        <button
                          @click="copyToClipboard(clientCredentials.username)"
                          class="px-3 py-2 bg-[#1D9BF0] text-white rounded hover:bg-[#1a8cd8] transition-colors text-sm"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div>
                      <label class="text-xs text-[#71767A] mb-1 block">Password</label>
                      <div class="flex items-center space-x-2">
                        <code class="flex-1 px-3 py-2 bg-black rounded text-[#F7F9F9] font-mono text-sm">{{ clientCredentials.password }}</code>
                        <button
                          @click="copyToClipboard(clientCredentials.password)"
                          class="px-3 py-2 bg-[#1D9BF0] text-white rounded hover:bg-[#1a8cd8] transition-colors text-sm"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                  <p class="text-xs text-[#F4212E] mt-3">⚠️ These credentials will not be shown again. Please save them now.</p>
                </div>
                <div class="flex justify-end space-x-3">
                  <button
                    @click="closeClientModal"
                    class="px-6 py-2.5 bg-[#1D9BF0] text-white font-bold rounded-full hover:bg-[#1a8cd8] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
              <div v-else-if="currentProject?.clientUser" class="space-y-4">
                <div class="p-4 bg-[#2F3336] rounded-lg">
                  <p class="text-sm text-[#71767A] mb-2">Client account exists for this project.</p>
                  <p class="text-sm text-[#F7F9F9] font-medium">{{ currentProject.clientUser.username }}</p>
                </div>
                <div class="flex justify-end space-x-3">
                  <button
                    @click="resetClientPassword"
                    class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] transition-colors border border-[#2F3336]"
                    :disabled="clientLoading"
                  >
                    {{ clientLoading ? 'Resetting...' : 'Reset Password' }}
                  </button>
                  <button
                    @click="closeClientModal"
                    class="px-6 py-2.5 bg-[#1D9BF0] text-white font-bold rounded-full hover:bg-[#1a8cd8] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div v-else class="space-y-4">
                <p class="text-sm text-[#71767A]">Create a client user account for this project. Credentials will be auto-generated.</p>
                <div v-if="clientError" class="p-3 bg-[#2F3336] border border-[#F4212E]/30 rounded-lg">
                  <p class="text-sm text-[#F4212E]">{{ clientError }}</p>
                </div>
                <div class="flex justify-end space-x-3">
                  <button
                    @click="closeClientModal"
                    class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    @click="createClientAccount"
                    class="px-6 py-2.5 bg-[#1D9BF0] text-white font-bold rounded-full hover:bg-[#1a8cd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="clientLoading"
                  >
                    {{ clientLoading ? 'Creating...' : 'Create Account' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Project Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showModal"
          @click.self="closeModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div class="bg-[#16181C] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-[#2F3336] shadow-2xl">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 border-b border-[#2F3336]">
              <h2 class="text-lg font-bold text-gray-50">{{ editingProjectId ? 'Edit Project' : 'New Project' }}</h2>
              <button
                @click="closeModal"
                class="p-2 rounded-full hover:bg-[#181919] transition-colors duration-150"
                title="Close"
              >
                <svg class="w-5 h-5 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Project URL -->
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Project URL</label>
                  <input
                    type="url"
                    id="linkUrl"
                    v-model="form.linkUrl"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="https://example.com/project"
                    required
                  />
                  <p class="mt-1 text-xs text-[#71767A]">Enter the URL of the project</p>
                </div>

                <!-- Owner -->
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Owner</label>
                  <input
                    type="text"
                    id="owner"
                    v-model="form.owner"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Enter owner name"
                    required
                  />
                  <p class="mt-1 text-xs text-[#71767A]">Name of the project owner</p>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="p-3 bg-[#2F3336] border border-[#F4212E]/30 rounded-lg">
                  <p class="text-sm text-[#F4212E]">{{ error }}</p>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end pt-2 space-x-3">
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] focus:outline-none transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-2.5 bg-[#1D9BF0] text-white font-bold rounded-full hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="loading"
                  >
                    <span v-if="loading" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                    <span v-else>{{ editingProjectId ? 'Update Project' : 'Save Project' }}</span>
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
  layout: false
})

const router = useRouter()

interface ProjectForm {
  linkUrl: string
  owner: string
}

interface Project {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  linkUrl: string
  owner: string
  clientUser?: {
    _id: string
    username: string
    email: string
  }
}

const form = ref<ProjectForm>({
  linkUrl: '',
  owner: ''
})

const editingProjectId = ref<string | null>(null)
const showModal = ref(false)

const loading = ref(false)
const projects = ref<Project[]>([])
const projectsLoading = ref(true)
const projectsError = ref<string | null>(null)
const error = ref<string | null>(null)

// Client account management
const showClientModal = ref(false)
const currentProject = ref<Project | null>(null)
const clientCredentials = ref<{ username: string; password: string } | null>(null)
const clientLoading = ref(false)
const clientError = ref<string | null>(null)

const fetchProjects = async () => {
  try {
    projectsLoading.value = true
    const response = await fetch('/api/projects')
    if (!response.ok) throw new Error('Failed to fetch projects')
    const fetchedProjects = await response.json() as Project[]
    
    // Fetch client user accounts for each project
    for (const project of fetchedProjects) {
      try {
        const clientResponse = await fetch(`/api/projects/${project._id}/client-user`)
        if (clientResponse.ok) {
          const clientUser = await clientResponse.json()
          project.clientUser = clientUser
        }
      } catch (err) {
        // No client user exists, which is fine
      }
    }
    
    projects.value = fetchedProjects
  } catch (err) {
    const error = err as Error
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

    // Validate required fields
    if (!form.value.linkUrl || !form.value.owner) {
      error.value = 'Project URL and Owner are required'
      loading.value = false
      return
    }

    // Determine if we're creating or updating
    const isEditing = editingProjectId.value !== null
    const url = isEditing ? `/api/projects/${editingProjectId.value}` : '/api/projects'
    const method = isEditing ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'save'} project`)
    }

    await fetchProjects()
    resetForm()
    closeModal()
  } catch (err) {
    const errorObj = err as Error
    console.error('Error saving project:', errorObj)
    error.value = errorObj.message || 'Failed to save project'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    linkUrl: '',
    owner: ''
  }
  editingProjectId.value = null
  error.value = null
}

const openNewProjectModal = () => {
  resetForm()
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const editProject = (project: Project) => {
  form.value = {
    linkUrl: project.linkUrl,
    owner: project.owner || ''
  }
  editingProjectId.value = project._id
  error.value = null
  showModal.value = true
}

const deleteProject = async (id: string) => {
  if (!confirm('Are you sure you want to delete this project?')) return

  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error('Failed to delete project')
    
    await fetchProjects()
  } catch (err) {
    console.error('Error deleting project:', err)
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showModal.value) {
    closeModal()
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
  window.addEventListener('keydown', handleEscape)
})

const manageClientAccount = async (project: Project) => {
  currentProject.value = project
  clientCredentials.value = null
  clientError.value = null
  
  // If client user exists, fetch it
  if (project.clientUser) {
    try {
      const response = await fetch(`/api/projects/${project._id}/client-user`)
      if (response.ok) {
        const clientUser = await response.json()
        currentProject.value.clientUser = clientUser
      }
    } catch (err) {
      console.error('Error fetching client user:', err)
    }
  }
  
  showClientModal.value = true
}

const createClientAccount = async () => {
  if (!currentProject.value) return
  
  try {
    clientLoading.value = true
    clientError.value = null
    
    const response = await fetch(`/api/projects/${currentProject.value._id}/client-user`, {
      method: 'POST'
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create client account')
    }
    
    const data = await response.json()
    clientCredentials.value = data.credentials
    
    // Update project in list
    const projectIndex = projects.value.findIndex((p: Project) => p._id === currentProject.value!._id)
    if (projectIndex !== -1) {
      projects.value[projectIndex].clientUser = data.user
    }
  } catch (err) {
    const errorObj = err as Error
    clientError.value = errorObj.message
    console.error('Error creating client account:', errorObj)
  } finally {
    clientLoading.value = false
  }
}

const resetClientPassword = async () => {
  if (!currentProject.value) return
  
  try {
    clientLoading.value = true
    clientError.value = null
    
    const response = await fetch(`/api/projects/${currentProject.value._id}/client-user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'reset-password' })
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to reset password')
    }
    
    const data = await response.json()
    clientCredentials.value = data.credentials
  } catch (err) {
    const errorObj = err as Error
    clientError.value = errorObj.message
    console.error('Error resetting password:', errorObj)
  } finally {
    clientLoading.value = false
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}

const closeClientModal = () => {
  showClientModal.value = false
  currentProject.value = null
  clientCredentials.value = null
  clientError.value = null
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
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


<template>
  <div class="min-h-screen bg-black text-[#F7F9F9]">
    <!-- Header Bar -->
    <div class="sticky top-0 z-50 bg-black border-b border-[#2F3336]">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-bold">Support Dashboard</h1>
        </div>
        <div class="relative" ref="dropdownRef">
          <!-- Avatar Button -->
          <button
            @click="toggleDropdown"
            class="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-[#181919] transition-colors duration-150"
            aria-label="User menu"
          >
            <div class="w-10 h-10 rounded-full bg-[#1D9BF0]/20 border-2 border-[#1D9BF0] flex items-center justify-center overflow-hidden">
              <Icon 
                name="lucide:user" 
                class="w-6 h-6 text-[#1D9BF0]"
              />
            </div>
            <div class="hidden md:block text-left">
              <p class="text-sm font-medium text-[#F7F9F9]">{{ userInfo?.username || 'Client' }}</p>
              <p class="text-xs text-[#71767A]">Client</p>
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
              class="absolute right-0 mt-2 w-80 bg-[#16181C]  border border-[#2F3336] rounded-lg shadow-xl overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-[#2F3336]">
                <p class="text-sm font-medium text-[#F7F9F9]">{{ userInfo?.username || 'Client' }}</p>
     
              </div>
              <div class="py-1">
                <button
                  @click="showLogoutModal = true"
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

    <!-- Main Content -->
    <div class="container mx-auto bg-black px-4 py-6">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#2F3336] border-t-[#1D9BF0]"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-4 border border-[#2F3336] rounded-lg">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-[#F4212E] mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-sm text-[#F4212E]">{{ error }}</p>
        </div>
      </div>

      <!-- Project Info and Dashboard -->
      <div v-else-if="project" class="space-y-6">
        <!-- Project Header -->
        <div class="border border-[#2F3336] rounded-lg p-6 bg-[#16181C]">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h2 class="text-2xl font-bold mb-2">{{ project.title || project.linkUrl }}</h2>
              <p v-if="project.description" class="text-sm text-[#71767A] mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap items-center gap-4 text-sm">
                <div class="flex items-center text-[#71767A]">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Owner: <span class="text-[#F7F9F9] font-medium ml-1">{{ project.owner }}</span>
                </div>
                <a 
                  :href="project.linkUrl" 
                  target="_blank"
                  class="flex items-center text-[#1D9BF0] hover:text-[#1a8cd8] transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="border border-[#2F3336] rounded-lg p-4 hover:bg-[#181919] transition-colors">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-[#71767A]">Total Tickets</span>
              <svg class="w-5 h-5 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-2xl font-bold">{{ stats.total }}</p>
          </div>
          <div class="border border-[#2F3336] rounded-lg p-4 hover:bg-[#181919] transition-colors">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-[#71767A]">Open</span>
              <svg class="w-5 h-5 text-[#F4212E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-2xl font-bold text-[#F4212E]">{{ stats.open }}</p>
          </div>
          <div class="border border-[#2F3336] rounded-lg p-4 hover:bg-[#181919] transition-colors">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-[#71767A]">In Progress</span>
              <svg class="w-5 h-5 text-[#1D9BF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-2xl font-bold text-[#1D9BF0]">{{ stats.inProgress }}</p>
          </div>
          <div class="border border-[#2F3336] rounded-lg p-4 hover:bg-[#181919] transition-colors">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-[#71767A]">Resolved</span>
              <svg class="w-5 h-5 text-[#00BA7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-2xl font-bold text-[#00BA7C]">{{ stats.resolved }}</p>
          </div>
        </div>

        <!-- Actions Bar -->
        <div class="flex items-center justify-between flex-wrap gap-4">
          <h2 class="text-lg font-bold">Your Support Tickets</h2>
          <div class="flex items-center space-x-3">
            <select
              v-model="statusFilter"
              @change="fetchTickets"
              class="px-3 py-1.5 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] text-sm focus:outline-none focus:border-[#1D9BF0] transition-colors"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              v-model="priorityFilter"
              @change="fetchTickets"
              class="px-3 py-1.5 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] text-sm focus:outline-none focus:border-[#1D9BF0] transition-colors"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            <button
              @click="openNewTicketModal"
              class="px-4 py-2 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150 inline-flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              New Ticket
            </button>
          </div>
        </div>

        <!-- Tickets List -->
        <div class="space-y-3">
          <!-- Loading State -->
          <div v-if="ticketsLoading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#2F3336] border-t-[#1D9BF0]"></div>
          </div>

          <!-- Empty State -->
          <div v-else-if="tickets.length === 0" class="p-12 text-center border border-[#2F3336] rounded-lg">
            <svg class="w-16 h-16 text-[#71767A] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-[#71767A] mb-2">No tickets found.</p>
            <button
              @click="openNewTicketModal"
              class="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150"
            >
              Create Your First Ticket
            </button>
          </div>

          <!-- Tickets List -->
          <div v-else>
            <div
              v-for="ticket in tickets"
              :key="ticket._id"
              class="border border-[#2F3336] rounded-lg p-4 hover:bg-[#181919] transition-colors duration-150"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-base font-bold">{{ ticket.title }}</h3>
                    <span
                      :class="getStatusClass(ticket.status)"
                      class="px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      {{ ticket.status }}
                    </span>
                    <span
                      :class="getPriorityClass(ticket.priority)"
                      class="px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      {{ ticket.priority }}
                    </span>
                  </div>
                  <p class="text-sm text-[#71767A] mb-3 line-clamp-2">{{ ticket.description }}</p>
                  <div class="flex items-center space-x-4 text-xs text-[#71767A]">
                    <span>Created: {{ formatDate(ticket.createdAt) }}</span>
                    <span v-if="ticket.assignee">Assigned to: {{ ticket.assignee }}</span>
                  </div>
                  <div v-if="ticket.tags && ticket.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
                    <span
                      v-for="tag in ticket.tags"
                      :key="tag"
                      class="px-2 py-0.5 bg-[#2F3336] text-[#71767A] rounded-full text-xs"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center space-x-2 ml-4">
                  <button
                    @click="editTicket(ticket)"
                    class="p-2 rounded-full hover:bg-[#2F3336] transition-colors duration-150"
                    title="Edit ticket"
                  >
                    <svg class="w-5 h-5 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ticket Modal -->
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
              <h2 class="text-lg font-bold text-gray-50">{{ editingTicketId ? 'Edit Ticket' : 'New Support Ticket' }}</h2>
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
                <!-- Ticket Title -->
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Title</label>
                  <input
                    type="text"
                    id="title"
                    v-model="form.title"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Description</label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="4"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors resize-none"
                    placeholder="Please provide detailed information about the issue..."
                    required
                  ></textarea>
                </div>

                <!-- Priority -->
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Priority</label>
                  <select
                    v-model="form.priority"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <!-- Tags -->
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Tags (optional)</label>
                  <input
                    type="text"
                    id="tags"
                    v-model="tagsInput"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="bug, feature, question"
                  />
                  <p class="mt-1 text-xs text-[#71767A]">Separate tags with commas</p>
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
                    :disabled="formLoading"
                  >
                    <span v-if="formLoading" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                    <span v-else>{{ editingTicketId ? 'Update Ticket' : 'Create Ticket' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Logout Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showLogoutModal"
          @click.self="showLogoutModal = false"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div class="bg-[#16181C] rounded-2xl max-w-md w-full overflow-hidden border border-[#2F3336] shadow-2xl">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 border-b border-[#2F3336]">
              <h2 class="text-lg font-bold text-gray-50">Confirm Logout</h2>
              <button
                @click="showLogoutModal = false"
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
              <p class="text-sm text-[#71767A] mb-6">
                Are you sure you want to logout? You will need to sign in again to access your support tickets.
              </p>
              
              <div class="flex justify-end space-x-3">
                <button
                  @click="showLogoutModal = false"
                  class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] focus:outline-none transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  @click="confirmLogout"
                  class="px-6 py-2.5 bg-[#F4212E] text-white font-bold rounded-full hover:bg-[#d91e2a] focus:outline-none focus:ring-2 focus:ring-[#F4212E] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="logoutLoading"
                >
                  {{ logoutLoading ? 'Logging out...' : 'Logout' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'client-auth'
})

const router = useRouter()

const userInfo = ref<any>(null)
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const project = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const tickets = ref<any[]>([])
const ticketsLoading = ref(false)
const statusFilter = ref('')
const priorityFilter = ref('')
const showModal = ref(false)
const showLogoutModal = ref(false)
const logoutLoading = ref(false)
const formLoading = ref(false)
const editingTicketId = ref<string | null>(null)

interface TicketForm {
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  projectId: string
  tags: string[]
  createdBy: string
}

const form = ref<TicketForm>({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
  assignee: '',
  projectId: '',
  tags: [],
  createdBy: ''
})

const tagsInput = computed({
  get: () => form.value.tags.join(', '),
  set: (value: string) => {
    form.value.tags = value.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
  }
})

const stats = computed(() => {
  return {
    total: tickets.value.length,
    open: tickets.value.filter((t: any) => t.status === 'open').length,
    inProgress: tickets.value.filter((t: any) => t.status === 'in-progress').length,
    resolved: tickets.value.filter((t: any) => t.status === 'resolved' || t.status === 'closed').length
  }
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

const fetchProject = async () => {
  try {
    loading.value = true
    error.value = null
    
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      throw new Error('User not found')
    }
    
    const user = JSON.parse(userStr)
    if (!user.projectId) {
      throw new Error('No project assigned')
    }
    
    // Fetch project details
    const response = await fetch(`/api/ticket-projects/${user.projectId}`)
    if (!response.ok) throw new Error('Failed to fetch project')
    
    project.value = await response.json()
    form.value.projectId = user.projectId
    
    // Fetch tickets for this project
    await fetchTickets()
  } catch (err) {
    const errorObj = err as Error
    error.value = errorObj.message || 'Failed to load project'
    console.error('Error fetching project:', errorObj)
  } finally {
    loading.value = false
  }
}

const fetchTickets = async () => {
  if (!project.value) return
  
  try {
    ticketsLoading.value = true
    
    let url = '/api/tickets'
    const params = new URLSearchParams()
    params.append('projectId', project.value._id)
    if (statusFilter.value) params.append('status', statusFilter.value)
    if (priorityFilter.value) params.append('priority', priorityFilter.value)
    url += '?' + params.toString()
    
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch tickets')
    tickets.value = await response.json()
  } catch (err) {
    console.error('Error fetching tickets:', err)
  } finally {
    ticketsLoading.value = false
  }
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'open': 'bg-[#F4212E]/20 text-[#F4212E]',
    'in-progress': 'bg-[#1D9BF0]/20 text-[#1D9BF0]',
    'resolved': 'bg-[#00BA7C]/20 text-[#00BA7C]',
    'closed': 'bg-[#71767A]/20 text-[#71767A]'
  }
  return classes[status] || 'bg-[#2F3336] text-[#71767A]'
}

const getPriorityClass = (priority: string) => {
  const classes: Record<string, string> = {
    'low': 'bg-[#71767A]/20 text-[#71767A]',
    'medium': 'bg-[#1D9BF0]/20 text-[#1D9BF0]',
    'high': 'bg-[#F59E0B]/20 text-[#F59E0B]',
    'urgent': 'bg-[#F4212E]/20 text-[#F4212E]'
  }
  return classes[priority] || 'bg-[#2F3336] text-[#71767A]'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleSubmit = async () => {
  try {
    formLoading.value = true
    error.value = null

    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      form.value.createdBy = user.username || 'Client'
    } else {
      form.value.createdBy = 'Client'
    }

    const isEditing = editingTicketId.value !== null
    const url = isEditing ? `/api/tickets/${editingTicketId.value}` : '/api/tickets'
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
      throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} ticket`)
    }

    await fetchTickets()
    resetForm()
    closeModal()
  } catch (err) {
    const errorObj = err as Error
    console.error('Error saving ticket:', errorObj)
    error.value = errorObj.message || 'Failed to save ticket'
  } finally {
    formLoading.value = false
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignee: '',
    projectId: project.value ? project.value._id : '',
    tags: [],
    createdBy: ''
  }
  editingTicketId.value = null
  error.value = null
}

const openNewTicketModal = () => {
  resetForm()
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const editTicket = (ticket: any) => {
  form.value = {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    assignee: ticket.assignee || '',
    projectId: typeof ticket.projectId === 'object' ? ticket.projectId._id : ticket.projectId,
    tags: ticket.tags || [],
    createdBy: ticket.createdBy
  }
  editingTicketId.value = ticket._id
  error.value = null
  showModal.value = true
}

const confirmLogout = async () => {
  try {
    logoutLoading.value = true
    
    const response = await fetch('/api/auth/logout', {
      method: 'POST'
    })

    if (!response.ok) {
      throw new Error('Logout failed')
    }

    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    
    showLogoutModal.value = false
    router.push('/support/auth')
  } catch (err) {
    console.error('Error logging out:', err)
    logoutLoading.value = false
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (showModal.value) {
      closeModal()
    } else if (showLogoutModal.value) {
      showLogoutModal.value = false
    }
    if (isDropdownOpen.value) {
      closeDropdown()
    }
  }
}

onMounted(async () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) {
    router.push('/support/auth')
    return
  }
  
  // Get user info
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      userInfo.value = user
      
      // Redirect admin users away from support dashboard
      if (user.role === 'admin') {
        router.push('/admin')
        return
      }
      
      // Check if user has a project assigned
      if (!user.projectId) {
        error.value = 'No project assigned to your account. Please contact support.'
        loading.value = false
        return
      }
    } catch (err) {
      console.error('Error parsing user data:', err)
    }
  }
  
  await fetchProject()
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
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

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>


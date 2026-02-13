<template>
  <div class="min-h-screen bg-black text-[#F7F9F9]">
    <!-- Header Bar -->
    <div class="sticky top-0 z-50 bg-black border-b border-[#2F3336]">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <h1 class="text-xl font-bold">Project Ticketing System</h1>
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
          <span class="text-[#F7F9F9] font-medium">Tickets</span>
          <svg v-if="selectedProject" class="w-4 h-4 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span v-if="selectedProject" class="text-[#F7F9F9] font-medium">{{ selectedProject.title }}</span>
        </nav>
      </div>
    </div>

    <!-- Projects List View -->
    <div v-if="!selectedProject" class="max-w-7xl mx-auto bg-black px-4 py-6">
      <div class="sticky top-[105px] z-30 bg-black border-b border-[#2F3336] px-4 py-3 -mx-4 mb-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 class="text-lg font-bold">Projects with Ticketing</h2>
            <p class="text-xs text-[#71767A] mt-1">Select a project to view and manage its tickets</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-[#71767A]">{{ projectsWithTicketing.length }} project{{ projectsWithTicketing.length !== 1 ? 's' : '' }}</span>
            <button
              @click="openNewProjectModal"
              class="px-3 py-1.5 text-xs font-medium text-[#1D9BF0] border border-[#1D9BF0] rounded-full hover:bg-[#1D9BF0]/10 transition-colors duration-150"
            >
              + Add Project
            </button>
          </div>
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
        <div v-else-if="projectsWithTicketing.length === 0" class="p-12 text-center border border-[#2F3336] rounded-lg">
          <svg class="w-16 h-16 text-[#71767A] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-[#71767A] mb-2">No projects with ticketing system enabled.</p>
          <p class="text-sm text-[#71767A] mb-4">Create a ticket project to get started:</p>
          <button
            @click="openNewProjectModal"
            class="px-6 py-2.5 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150 inline-flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Ticket Project
          </button>
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="project in projectsWithTicketing"
            :key="project._id"
            class="border border-[#2F3336] rounded-lg p-4 hover:bg-[#181919] transition-colors duration-150 group"
          >
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
                @click.stop
                class="text-sm text-[#1D9BF0] hover:underline flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {{ project.linkUrl }}
              </a>
            </div>

            <!-- Ticket Stats and Actions -->
            <div class="flex items-center justify-between pt-3 border-t border-[#2F3336]">
              <div class="flex items-center space-x-4 text-xs text-[#71767A]">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ project.ticketCount || 0 }} tickets
                </span>
                <span v-if="project.clientUser" class="flex items-center text-[#00BA7C]">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Account
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click.stop="manageClientAccount(project)"
                  class="p-2 rounded-full hover:bg-[#2F3336] transition-colors duration-150"
                  :title="project.clientUser ? 'Manage Client Account' : 'Create Client Account'"
                >
                  <svg class="w-5 h-5" :class="project.clientUser ? 'text-[#00BA7C]' : 'text-[#71767A]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button
                  @click.stop="deleteTicketProject(project._id)"
                  class="p-2 rounded-full hover:bg-[#2F3336] transition-colors duration-150"
                  title="Delete project"
                >
                  <svg class="w-5 h-5 text-[#F4212E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  @click="selectProject(project)"
                  class="flex items-center text-[#1D9BF0] text-sm font-medium hover:text-[#1a8cd8] transition-colors"
                >
                  View Tickets
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tickets View (when project is selected) -->
    <div v-else class="container mx-auto bg-black px-4 py-6">
      <!-- Back Button -->
      <div class="mb-4">
        <button
          @click="selectedProject = null"
          class="flex items-center text-[#71767A] hover:text-[#F7F9F9] transition-colors duration-150"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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

      <!-- Filters -->
      <div class="sticky top-[105px] z-30 bg-black border-b border-[#2F3336] px-4 py-3 -mx-4 mb-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <h2 class="text-lg font-bold">{{ selectedProject.title }} - Tickets</h2>
          <div class="flex items-center space-x-3">
            <button
              @click="openNewTicketModal"
              class="px-4 py-2 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150"
            >
              New Ticket
            </button>
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
          </div>
        </div>
      </div>

      <!-- Tickets List -->
      <div class="py-4">
        <!-- Loading State -->
        <div v-if="ticketsLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#2F3336] border-t-[#1D9BF0]"></div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="ticketsError" class="p-4 border border-[#2F3336] rounded-lg">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-[#F4212E] mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <p class="text-sm text-[#F4212E]">{{ ticketsError }}</p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="tickets.length === 0" class="p-12 text-center border border-[#2F3336] rounded-lg">
          <svg class="w-16 h-16 text-[#71767A] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-[#71767A] mb-2">No tickets found for this project.</p>
          <button
            @click="openNewTicketModal"
            class="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150"
          >
            Create First Ticket
          </button>
        </div>

        <!-- Tickets List -->
        <div v-else class="space-y-3">
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
                  <span>Created by: {{ ticket.createdBy }}</span>
                  <span v-if="ticket.assignee">Assigned to: {{ ticket.assignee }}</span>
                  <span>{{ formatDate(ticket.createdAt) }}</span>
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
                <button
                  @click="deleteTicket(ticket._id)"
                  class="p-2 rounded-full hover:bg-[#2F3336] transition-colors duration-150"
                  title="Delete ticket"
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
              <h2 class="text-lg font-bold text-gray-50">{{ editingTicketId ? 'Edit Ticket' : 'New Ticket' }}</h2>
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
                <!-- Project Info (read-only) -->
                <div v-if="selectedProject" class="p-3 bg-[#2F3336] rounded-lg">
                  <p class="text-xs text-[#71767A] mb-1">Project</p>
                  <p class="text-sm font-medium text-[#F7F9F9]">{{ selectedProject.title }}</p>
                </div>

                <!-- Ticket Title -->
                <div>
                  <input
                    type="text"
                    id="title"
                    v-model="form.title"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Ticket Title"
                    required
                  />
                </div>

                <!-- Description -->
                <div>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="4"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors resize-none"
                    placeholder="Describe the issue or task..."
                    required
                  ></textarea>
                </div>

                <!-- Status and Priority -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm text-[#71767A] mb-2">Status</label>
                    <select
                      v-model="form.status"
                      class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
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
                </div>

                <!-- Assignee -->
                <div>
                  <input
                    type="text"
                    id="assignee"
                    v-model="form.assignee"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Assignee (optional)"
                  />
                </div>

                <!-- Tags -->
                <div>
                  <input
                    type="text"
                    id="tags"
                    v-model="tagsInput"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="bug, feature, enhancement"
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
                    :disabled="loading"
                  >
                    <span v-if="loading" class="flex items-center">
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

    <!-- Project Creation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showProjectModal"
          @click.self="closeProjectModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div class="bg-[#16181C] rounded-2xl max-w-lg w-full overflow-hidden border border-[#2F3336] shadow-2xl">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 border-b border-[#2F3336]">
              <h2 class="text-lg font-bold text-gray-50">New Ticket Project</h2>
              <button
                @click="closeProjectModal"
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
              <form @submit.prevent="handleProjectSubmit" class="space-y-4">
                <!-- Project URL -->
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Project URL</label>
                  <input
                    type="url"
                    id="projectLinkUrl"
                    v-model="projectForm.linkUrl"
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
                    id="projectOwner"
                    v-model="projectForm.owner"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Enter owner name"
                    required
                  />
                  <p class="mt-1 text-xs text-[#71767A]">Name of the project owner</p>
                </div>

                <!-- Error Message -->
                <div v-if="projectError" class="p-3 bg-[#2F3336] border border-[#F4212E]/30 rounded-lg">
                  <p class="text-sm text-[#F4212E]">{{ projectError }}</p>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end pt-2 space-x-3">
                  <button
                    type="button"
                    @click="closeProjectModal"
                    class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] focus:outline-none transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-2.5 bg-[#1D9BF0] text-white font-bold rounded-full hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="projectLoading"
                  >
                    <span v-if="projectLoading" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                    <span v-else>Create Project</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

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
                <div v-if="currentProject" class="p-3 bg-[#2F3336] rounded-lg mb-4">
                  <p class="text-xs text-[#71767A] mb-1">Project</p>
                  <p class="text-sm font-medium text-[#F7F9F9]">{{ currentProject.title || currentProject.linkUrl }}</p>
                  <p class="text-xs text-[#71767A] mt-1">Owner: {{ currentProject.owner }}</p>
                </div>
                <p class="text-sm text-[#71767A]">Create a client user account for this project. Credentials will be auto-generated.</p>
                <div v-if="clientError" class="p-3 bg-[#2F3336] border border-[#F4212E]/30 rounded-lg">
                  <p class="text-sm text-[#F4212E]">{{ clientError }}</p>
                </div>
                <div class="flex justify-end space-x-3">
                  <button
                    @click="closeClientModal"
                    class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] transition-colors"
                  >
                    Skip
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()

const userInfo = ref<any>(null)

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

interface Ticket {
  _id: string
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  createdBy: string
  projectId: string | { _id: string; title: string }
  tags: string[]
  createdAt: string
  updatedAt: string
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
  }
  ticketCount?: number
}

interface Stats {
  total: number
  open: number
  inProgress: number
  resolved: number
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

const loading = ref(false)
const tickets = ref<Ticket[]>([])
const ticketsLoading = ref(false)
const ticketsError = ref<string | null>(null)
const error = ref<string | null>(null)
const editingTicketId = ref<string | null>(null)
const showModal = ref(false)
const showProjectModal = ref(false)
const statusFilter = ref('')
const priorityFilter = ref('')
const projectsWithTicketing = ref<Project[]>([])
const projectsLoading = ref(true)
const projectsError = ref<string | null>(null)
const selectedProject = ref<Project | null>(null)
const isAdmin = ref(false)
const userProjectId = ref<string | null>(null)
const projectLoading = ref(false)
const projectError = ref<string | null>(null)
const projectForm = ref({
  linkUrl: '',
  owner: ''
})
const showClientModal = ref(false)
const currentProject = ref<Project | null>(null)
const clientCredentials = ref<{ username: string; password: string } | null>(null)
const clientLoading = ref(false)
const clientError = ref<string | null>(null)
const stats = ref<Stats>({
  total: 0,
  open: 0,
  inProgress: 0,
  resolved: 0
})

const fetchProjectsWithTicketing = async () => {
  try {
    projectsLoading.value = true
    projectsError.value = null
    
    const response = await fetch('/api/ticket-projects')
    if (!response.ok) throw new Error('Failed to fetch ticket projects')
    
    const allProjects = await response.json() as Project[]
    
    // Check each project for client user accounts and ticket counts
    const projectsWithInfo: Project[] = []
    
    for (const project of allProjects) {
      // Check for client user
      try {
        const clientResponse = await fetch(`/api/ticket-projects/${project._id}/client-user`)
        if (clientResponse.ok) {
          const clientUser = await clientResponse.json()
          project.clientUser = clientUser
        }
      } catch (err) {
        // No client user exists yet - that's okay
        project.clientUser = undefined
      }
      
      // Get ticket count for this project
      try {
        const ticketsResponse = await fetch(`/api/tickets?projectId=${project._id}`)
        if (ticketsResponse.ok) {
          const tickets = await ticketsResponse.json()
          project.ticketCount = tickets.length || 0
        }
      } catch (err) {
        project.ticketCount = 0
      }
      
      // For client users, only show their assigned project
      if (!isAdmin.value && userProjectId.value) {
        if (project._id === userProjectId.value) {
          projectsWithInfo.push(project)
        }
      } else {
        // For admins, show all projects
        projectsWithInfo.push(project)
      }
    }
    
    projectsWithTicketing.value = projectsWithInfo
    
    // Auto-select project for client users if they only have one
    if (!isAdmin.value && projectsWithInfo.length === 1) {
      selectProject(projectsWithInfo[0])
    }
  } catch (err) {
    const error = err as Error
    projectsError.value = error.message
    console.error('Error fetching ticket projects:', error)
  } finally {
    projectsLoading.value = false
  }
}

const selectProject = (project: Project) => {
  selectedProject.value = project
  form.value.projectId = project._id
  fetchTickets()
}

const fetchTickets = async () => {
  if (!selectedProject.value) return
  
  try {
    ticketsLoading.value = true
    ticketsError.value = null
    
    let url = '/api/tickets'
    const params = new URLSearchParams()
    params.append('projectId', selectedProject.value._id)
    if (statusFilter.value) params.append('status', statusFilter.value)
    if (priorityFilter.value) params.append('priority', priorityFilter.value)
    url += '?' + params.toString()
    
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch tickets')
    tickets.value = await response.json() as Ticket[]
    
    // Calculate stats
    stats.value = {
      total: tickets.value.length,
      open: tickets.value.filter((t: Ticket) => t.status === 'open').length,
      inProgress: tickets.value.filter((t: Ticket) => t.status === 'in-progress').length,
      resolved: tickets.value.filter((t: Ticket) => t.status === 'resolved' || t.status === 'closed').length
    }
  } catch (err) {
    const error = err as Error
    ticketsError.value = error.message
    console.error('Error fetching tickets:', error)
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
    loading.value = true
    error.value = null

    // Get current user from localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      form.value.createdBy = user.username || 'Admin'
    } else {
      form.value.createdBy = 'Admin'
    }

    // Set projectId from selected project
    if (selectedProject.value) {
      form.value.projectId = selectedProject.value._id
    } else if (!isAdmin.value && userProjectId.value) {
      form.value.projectId = userProjectId.value
    }

    // Validate projectId is set
    if (!form.value.projectId) {
      error.value = 'Project is required'
      loading.value = false
      return
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
    // Update ticket count in projects list
    if (selectedProject.value) {
      const project = projectsWithTicketing.value.find((p: Project) => p._id === selectedProject.value!._id)
      if (project) {
        project.ticketCount = (project.ticketCount || 0) + (isEditing ? 0 : 1)
      }
    }
    resetForm()
    closeModal()
  } catch (err) {
    const errorObj = err as Error
    console.error('Error saving ticket:', errorObj)
    error.value = errorObj.message || 'Failed to save ticket'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignee: '',
    projectId: selectedProject.value ? selectedProject.value._id : (userProjectId.value || ''),
    tags: [],
    createdBy: ''
  }
  editingTicketId.value = null
  error.value = null
}

const openNewTicketModal = () => {
  if (!selectedProject.value) return
  resetForm()
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const editTicket = (ticket: Ticket) => {
  const projectId = typeof ticket.projectId === 'object' ? ticket.projectId._id : ticket.projectId
  form.value = {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    assignee: ticket.assignee || '',
    projectId: projectId || '',
    tags: ticket.tags || [],
    createdBy: ticket.createdBy
  }
  editingTicketId.value = ticket._id
  error.value = null
  showModal.value = true
}

const deleteTicket = async (id: string) => {
  if (!confirm('Are you sure you want to delete this ticket?')) return

  try {
    const response = await fetch(`/api/tickets/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error('Failed to delete ticket')
    
    await fetchTickets()
    // Update ticket count
    if (selectedProject.value) {
      const project = projectsWithTicketing.value.find((p: Project) => p._id === selectedProject.value!._id)
      if (project && project.ticketCount) {
        project.ticketCount--
      }
    }
  } catch (err) {
    console.error('Error deleting ticket:', err)
  }
}

const openNewProjectModal = () => {
  projectForm.value = {
    linkUrl: '',
    owner: ''
  }
  projectError.value = null
  showProjectModal.value = true
}

const closeProjectModal = () => {
  showProjectModal.value = false
  projectForm.value = {
    linkUrl: '',
    owner: ''
  }
  projectError.value = null
}

const handleProjectSubmit = async () => {
  try {
    projectLoading.value = true
    projectError.value = null

    if (!projectForm.value.linkUrl || !projectForm.value.owner) {
      projectError.value = 'Project URL and Owner are required'
      projectLoading.value = false
      return
    }

    const response = await fetch('/api/ticket-projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectForm.value)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create project')
    }

    const newProject = await response.json() as Project
    
    // Close project modal and open client account creation modal
    closeProjectModal()
    
    // Open client account creation modal for the newly created project
    currentProject.value = newProject
    clientCredentials.value = null
    clientError.value = null
    showClientModal.value = true
  } catch (err) {
    const errorObj = err as Error
    projectError.value = errorObj.message || 'Failed to create project'
    console.error('Error creating project:', errorObj)
  } finally {
    projectLoading.value = false
  }
}

const createClientAccount = async () => {
  if (!currentProject.value) return
  
  try {
    clientLoading.value = true
    clientError.value = null
    
    const response = await fetch(`/api/ticket-projects/${currentProject.value._id}/client-user`, {
      method: 'POST'
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create client account')
    }
    
    const data = await response.json()
    clientCredentials.value = data.credentials
    
    // Update project in list
    const projectIndex = projectsWithTicketing.value.findIndex((p: Project) => p._id === currentProject.value!._id)
    if (projectIndex !== -1) {
      projectsWithTicketing.value[projectIndex].clientUser = data.user
    }
    
    // Refresh projects list to include the new client account
    await fetchProjectsWithTicketing()
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
    
    const response = await fetch(`/api/ticket-projects/${currentProject.value._id}/client-user`, {
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

const manageClientAccount = async (project: Project) => {
  currentProject.value = project
  clientCredentials.value = null
  clientError.value = null
  
  // If client user exists, fetch it
  if (project.clientUser) {
    try {
      const response = await fetch(`/api/ticket-projects/${project._id}/client-user`)
      if (response.ok) {
        const clientUser = await response.json()
        currentProject.value = { ...project, clientUser }
      }
    } catch (err) {
      console.error('Error fetching client user:', err)
    }
  }
  
  showClientModal.value = true
}

const closeClientModal = () => {
  showClientModal.value = false
  currentProject.value = null
  clientCredentials.value = null
  clientError.value = null
}

const deleteTicketProject = async (id: string) => {
  if (!confirm('Are you sure you want to delete this ticket project? This will also delete all associated tickets and client accounts.')) return

  try {
    const response = await fetch(`/api/ticket-projects/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to delete project')
    }

    // If the deleted project was selected, clear selection
    if (selectedProject.value && selectedProject.value._id === id) {
      selectedProject.value = null
    }

    // Refresh projects list
    await fetchProjectsWithTicketing()
  } catch (err) {
    const errorObj = err as Error
    alert(errorObj.message || 'Failed to delete project')
    console.error('Error deleting ticket project:', errorObj)
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (showModal.value) {
      closeModal()
    } else if (showProjectModal.value) {
      closeProjectModal()
    } else if (showClientModal.value) {
      closeClientModal()
    }
  }
}

onMounted(async () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) {
    router.push('/admin/auth')
    return
  }
  
  // Get user info to determine role and projectId
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      userInfo.value = user
      isAdmin.value = user.role === 'admin'
      userProjectId.value = user.projectId || null
    } catch (err) {
      console.error('Error parsing user data:', err)
    }
  }
  
  await fetchProjectsWithTicketing()
  window.addEventListener('keydown', handleEscape)
})

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

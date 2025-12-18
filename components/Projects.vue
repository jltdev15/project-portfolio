<template>
  <section id="projects" class="relative py-24 bg-black overflow-hidden">
    <!-- Animated background pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0); background-size: 24px 24px;"></div>
    </div>

    <!-- Animated accent elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-64 h-64 bg-[#1D9BF0]/5 rounded-full blur-3xl -top-32 -right-32 animate-float-1"></div>
      <div class="absolute w-64 h-64 bg-[#1D9BF0]/5 rounded-full blur-3xl -bottom-32 -left-32 animate-float-2"></div>
    </div>

    <div class="container mx-auto px-4">
      <div 
        ref="projectsRef"
        :class="[
          'transform transition-all duration-1000',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        ]"
      >
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold mb-6 text-[#F7F9F9]">
            Featured Projects
          </h2>
          <div class="w-24 h-1 bg-[#1D9BF0] mx-auto rounded-full"></div>
          <p class="text-xl text-[#71767A] mt-6 max-w-2xl mx-auto">Explore my portfolio of innovative projects showcasing my expertise in web and mobile development</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1D9BF0]"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center text-[#F4212E] py-8">
          {{ error }}
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <div 
            v-for="(project, index) in projects" 
            :key="index"
            :class="[
              'group rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-1 relative flex flex-col h-full',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
              `delay-${index * 200}`
            ]"
          >
            <!-- Border Effect -->
            <div class="absolute inset-0 rounded-2xl border border-[#2F3336] group-hover:border-[#1D9BF0] transition-colors duration-500"></div>
            
            <div class="relative bg-[#16181C] rounded-2xl flex flex-col h-full">
              <div class="relative overflow-hidden">
                <img 
                  :src="project.image" 
                  :alt="project.title"
                  class="w-full h-56 object-cover transform transition-transform duration-700 group-hover:scale-110"
                >
                <div class="absolute inset-0 bg-[#1D9BF0]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <a 
                    :href="project.linkUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="px-8 py-3 bg-white text-[#1D9BF0] rounded-full font-semibold transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>View Project</span>
                    <Icon name="lucide:external-link" class="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div class="p-8 flex flex-col flex-grow">
                <h3 class="text-2xl font-semibold mb-4 text-[#F7F9F9] group-hover:text-[#1D9BF0] transition-colors duration-300">{{ project.title }}</h3>
                <p class="text-[#71767A] mb-6 leading-relaxed text-justify flex-grow">
                  <span v-if="project.description.length > 150">
                    {{ project.description.substring(0, 150) }}...
                  </span>
                  <span v-else>
                    {{ project.description }}
                  </span>
                  <button 
                    v-if="project.description.length > 150"
                    @click="openModal(project)"
                    class="text-[#1D9BF0] hover:text-[#1a8cd8] font-medium ml-1 transition-colors duration-300 focus:outline-none focus:underline"
                  >
                    See more
                  </button>
                </p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(tech, techIndex) in project.technologies" 
                    :key="techIndex"
                    class="px-4 py-1.5 bg-[#2F3336] text-[#71767A] rounded-full text-sm font-medium hover:bg-[#181919] transition-colors duration-300"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Description Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="selectedProject"
          @click.self="closeModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div class="bg-[#16181C] border border-[#2F3336] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all">
            <!-- Modal Header -->
            <div class="relative bg-[#1D9BF0] p-6">
              <h3 class="text-2xl font-bold text-white pr-8">{{ selectedProject.title }}</h3>
              <button
                @click="closeModal"
                class="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
                aria-label="Close modal"
              >
                <Icon name="lucide:x" class="w-6 h-6" />
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div class="mb-6">
                <img 
                  :src="selectedProject.image" 
                  :alt="selectedProject.title"
                  class="w-full h-64 object-cover rounded-lg mb-6 border border-[#2F3336]"
                >
              </div>
              <p class="text-[#71767A] leading-relaxed text-justify mb-6">
                {{ selectedProject.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="(tech, techIndex) in selectedProject.technologies" 
                  :key="techIndex"
                  class="px-4 py-1.5 bg-[#2F3336] text-[#71767A] rounded-full text-sm font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 border-t border-[#2F3336] flex justify-end">
              <a 
                :href="selectedProject.linkUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="px-6 py-2 bg-[#1D9BF0] text-white rounded-full font-semibold hover:bg-[#1a8cd8] transition-colors duration-300 flex items-center space-x-2"
              >
                <span>View Project</span>
                <Icon name="lucide:external-link" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { ref, onMounted, onUnmounted } from 'vue'

const { element: projectsRef, isVisible } = useScrollAnimation({
  threshold: 0.2,
  rootMargin: '0px'
})

const projects = ref([])
const loading = ref(true)
const error = ref(null)
const selectedProject = ref(null)

const openModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}

// Handle ESC key press
const handleEscape = (e) => {
  if (e.key === 'Escape' && selectedProject.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})

const fetchProjects = async () => {
  try {
    loading.value = true
    const response = await fetch('/api/projects')
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    const data = await response.json()
    projects.value = data.map(project => ({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies,
      linkUrl: project.linkUrl
    }))
  } catch (err) {
    error.value = err.message
    console.error('Error fetching projects:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.delay-200 {
  transition-delay: 200ms;
}
.delay-400 {
  transition-delay: 400ms;
}

.animate-float-1 {
  animation: float 20s ease-in-out infinite;
}

.animate-float-2 {
  animation: float 25s ease-in-out infinite reverse;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(30px, 30px) rotate(180deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9) translateY(-20px);
  opacity: 0;
}
</style> 
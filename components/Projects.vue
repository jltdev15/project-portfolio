<template>
  <section id="projects" class="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
    <!-- Animated background pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0); background-size: 24px 24px;"></div>
    </div>

    <!-- Animated accent elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -top-32 -right-32 animate-float-1"></div>
      <div class="absolute w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -bottom-32 -left-32 animate-float-2"></div>
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
          <h2 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Featured Projects
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p class="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">Explore my portfolio of innovative projects showcasing my expertise in web and mobile development</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center text-red-600 py-8">
          {{ error }}
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(project, index) in projects" 
            :key="index"
            :class="[
              'group bg-white rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-1 relative',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
              `delay-${index * 200}`
            ]"
          >
            <!-- Gradient Border Effect -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute inset-[2px] rounded-[14px] bg-white"></div>
            
            <div class="relative">
              <div class="relative overflow-hidden">
                <img 
                  :src="project.image" 
                  :alt="project.title"
                  class="w-full h-56 object-cover transform transition-transform duration-700 group-hover:scale-110"
                >
                <div class="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <a 
                    :href="project.linkUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-2 border-transparent hover:border-blue-400"
                  >
                    <span>View Project</span>
                    <ArrowTopRightOnSquareIcon class="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div class="p-8">
                <h3 class="text-2xl font-semibold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{{ project.title }}</h3>
                <p class="text-gray-600 mb-6 leading-relaxed text-justify">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(tech, techIndex) in project.technologies" 
                    :key="techIndex"
                    class="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-300"
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
  </section>
</template>

<script setup>
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { ref, onMounted } from 'vue'

const { element: projectsRef, isVisible } = useScrollAnimation({
  threshold: 0.2,
  rootMargin: '0px'
})

const projects = ref([])
const loading = ref(true)
const error = ref(null)

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
</style> 
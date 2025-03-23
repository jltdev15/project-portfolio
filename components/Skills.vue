<template>
  <section id="skills" class="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
    <!-- Animated background pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0); background-size: 24px 24px;"></div>
    </div>

    <!-- Animated accent elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -top-32 -left-32 animate-float-1"></div>
      <div class="absolute w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -bottom-32 -right-32 animate-float-2"></div>
    </div>

    <div class="container mx-auto px-4">
      <div 
        ref="skillsRef"
        :class="[
          'transform transition-all duration-1000',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        ]"
      >
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Skills & Technologies
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(category, index) in skillCategories" 
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
            
            <div class="relative p-8">
              <div class="relative mb-6">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                  <div v-html="category.icon" class="text-white"></div>
                </div>
              </div>
              <h3 class="text-2xl font-semibold mb-6 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {{ category.title }}
              </h3>
              <ul class="space-y-4">
                <li 
                  v-for="(skill, skillIndex) in category.skills" 
                  :key="skillIndex"
                  class="flex items-center group/item"
                >
                  <svg class="w-5 h-5 text-blue-600 mr-3 transition-transform duration-300 group-hover/item:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="text-lg text-gray-600">
                    {{ skill }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { element: skillsRef, isVisible } = useScrollAnimation({
  threshold: 0.2,
  rootMargin: '0px'
})

const skillCategories = [
  {
    title: 'Frontend',
    icon: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'React', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    icon: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    skills: ['Node.js', 'MongoDB', 'REST APIs','Google Firebase']
  },
  {
    title: 'Full Stack and Cross Platform',
    icon: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V8M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16M16 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V16M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    skills: ['Nuxt 3','Capacitor', 'Ionic' ]
  },
  {
    title: 'Soft Skills',
    icon: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.9391 15 2.9217 15.4214 2.1716 16.1716C1.4214 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    skills: ['Problem Solving', 'Team Leadership', 'Communication', 'Agile', 'Project Management']
  }
]
</script>

<style scoped>
.delay-200 {
  transition-delay: 200ms;
}
.delay-400 {
  transition-delay: 400ms;
}
.delay-600 {
  transition-delay: 600ms;
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
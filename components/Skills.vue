<template>
  <section id="skills" class="relative py-24 bg-black overflow-hidden">
    <!-- Animated background pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0); background-size: 24px 24px;"></div>
    </div>

    <!-- Animated accent elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-64 h-64 bg-[#1D9BF0]/5 rounded-full blur-3xl -top-32 -left-32 animate-float-1"></div>
      <div class="absolute w-64 h-64 bg-[#1D9BF0]/5 rounded-full blur-3xl -bottom-32 -right-32 animate-float-2"></div>
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
          <h2 class="text-5xl font-bold mb-6 text-[#F7F9F9]">
            Skills & Technologies
          </h2>
          <div class="w-24 h-1 bg-[#1D9BF0] mx-auto rounded-full"></div>
          <p class="text-xl text-[#71767A] mt-6 max-w-2xl mx-auto">A comprehensive overview of my technical expertise and professional capabilities</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          <div 
            v-for="(category, index) in skillCategories" 
            :key="index"
            :class="[
              'group rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-1 relative flex flex-col h-full',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
              `delay-${index * 200}`
            ]"
          >
            <!-- Border Effect -->
            <div class="absolute inset-0 rounded-2xl border border-[#2F3336] group-hover:border-[#1D9BF0] transition-colors duration-500"></div>
            
            <div class="relative p-8 bg-[#16181C] rounded-2xl flex flex-col h-full">
              <div class="relative mb-6">
                <div class="w-12 h-12 rounded-xl bg-[#1D9BF0]/10 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                  <Icon :name="category.icon" class="w-6 h-6 text-[#1D9BF0]" />
                </div>
              </div>
              <h3 class="text-2xl font-semibold mb-6 text-[#F7F9F9] group-hover:text-[#1D9BF0] transition-colors duration-300">
                {{ category.title }}
              </h3>
              <ul class="space-y-4 flex-grow">
                <li 
                  v-for="(skill, skillIndex) in category.skills" 
                  :key="skillIndex"
                  class="flex items-center group/item"
                >
                  <Icon name="lucide:check" class="w-5 h-5 text-[#1D9BF0] mr-3 transition-transform duration-300 group-hover/item:scale-110" />
                  <span class="text-lg text-[#71767A]">
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
    icon: 'lucide:layout',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'React', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    icon: 'lucide:server',
    skills: ['Node.js', 'MongoDB', 'REST APIs','Google Firebase','PHP','MySQL']
  },
  {
    title: 'Cross Platform',
    icon: 'lucide:smartphone',
    skills: ['Nuxt 3','Capacitor', 'Ionic','Flutter' ]
  },
  {
    title: 'Soft Skills',
    icon: 'lucide:users',
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
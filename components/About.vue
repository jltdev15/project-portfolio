<template>
  <section 
    id="about" 
    class="py-24 bg-black relative overflow-hidden"
    aria-labelledby="about-title"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0); background-size: 24px 24px;"></div>
    </div>

    <!-- Animated Accent Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-64 h-64 bg-[#1D9BF0]/5 rounded-full blur-3xl -top-32 -right-32 animate-float-1"></div>
      <div class="absolute w-64 h-64 bg-[#1D9BF0]/5 rounded-full blur-3xl -bottom-32 -left-32 animate-float-2"></div>
    </div>

    <div class="container mx-auto px-4 relative">
      <div 
        ref="aboutRef"
        :class="[
          'transform transition-all duration-1000',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        ]"
      >
        <div class="text-center mb-16">
          <h2 
            id="about-title"
            class="text-5xl font-bold mb-6 text-[#F7F9F9]"
          >
            About Me
          </h2>
          <div class="w-24 h-1 bg-[#1D9BF0] mx-auto rounded-full"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <!-- Profile Image -->
          <div class="relative group">
            <div class="absolute inset-0 bg-[#1D9BF0] rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-20"></div>
            <div class="relative bg-[#16181C] border border-[#2F3336] rounded-2xl p-4 shadow-xl">
              <img 
                src="/images/dp-2.png" 
                alt="Profile picture" 
                class="w-full h-auto rounded-xl object-cover"
                loading="lazy"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- Content -->
          <div class="space-y-6">
            <p class="text-xl text-[#71767A] leading-relaxed">
              I am a seasoned Full Stack Developer with over 5 years of experience in creating
              innovative web solutions. My expertise spans across frontend and backend technologies,
              allowing me to build comprehensive applications that deliver exceptional user experiences.
            </p>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4 mt-8">
              <div 
                v-for="(stat, index) in stats" 
                :key="index"
                class="bg-[#16181C] border border-[#2F3336] p-6 rounded-xl hover:bg-[#181919] transition-colors duration-300"
              >
                <div class="text-3xl font-bold text-[#1D9BF0] mb-2">{{ stat.value }}</div>
                <div class="text-[#71767A]">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Skills -->
            <div class="mt-8">
              <h3 class="text-2xl font-semibold text-[#F7F9F9] mb-4">Core Skills</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="skill in skills" 
                  :key="skill"`
                  class="px-4 py-2 bg-[#2F3336] text-[#71767A] rounded-full text-sm font-medium hover:bg-[#181919] transition-colors duration-200"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { ref } from 'vue'

const { element: aboutRef, isVisible } = useScrollAnimation({
  threshold: 0.2,
  rootMargin: '0px'
})

const handleImageError = (e) => {
  // Fallback to a placeholder image or remove the image element
  e.target.style.display = 'none'
}

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
]

const skills = [
  'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Nuxt 3',
  'REST APIs', 'GraphQL','Capacitor','Ionic', 'MongoDB', 'Redis'
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

/* Add smooth hover transitions */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style> 
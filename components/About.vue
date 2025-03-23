<template>
  <section id="about" class="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0); background-size: 24px 24px;"></div>
    </div>

    <!-- Animated Accent Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -top-32 -right-32 animate-float-1"></div>
      <div class="absolute w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -bottom-32 -left-32 animate-float-2"></div>
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
          <h2 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            About Me
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div class="max-w-3xl mx-auto text-center mb-20">
          <p class="text-xl text-gray-600 leading-relaxed">
            I am a seasoned Full Stack Developer with over 5 years of experience in creating
            innovative web solutions. My expertise spans across frontend and backend technologies,
            allowing me to build comprehensive applications that deliver exceptional user experiences.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { element: aboutRef, isVisible } = useScrollAnimation({
  threshold: 0.2,
  rootMargin: '0px'
})

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '10+', label: 'Countries Served' }
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
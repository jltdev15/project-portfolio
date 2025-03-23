<template>
  <section id="home"
    class="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
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

    <div class="container mx-auto px-4 text-center text-white relative z-10">
      <!-- Profile Image with enhanced styling -->
      <div class="flex justify-center mb-12">
        <div class="relative group">
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse">
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl">
          </div>
          <NuxtImg src="/images/profile.jpg" alt="Profile"
            class="w-40 h-40 rounded-full border-4 border-white/20 shadow-2xl relative z-10 transform group-hover:scale-105 transition-all duration-500"
            preset="avatar" loading="lazy" />
        </div>
      </div>

      <!-- Main Content with enhanced typography and animations -->
      <h1
        class="text-6xl md:text-8xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
        John Lerry T.
      </h1>
      <p class="text-2xl md:text-3xl mb-6 text-blue-100 font-light tracking-wide animate-fade-in-delay-1">
        Full Stack Developer
      </p>
      <p class="text-xl text-gray-200 mb-16 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2">
        Crafting exceptional digital experiences for global clients with modern web technologies
      </p>

      <!-- Social Links with enhanced styling -->
      <div class="flex justify-center space-x-8 mb-16 animate-fade-in-delay-3">
        <a href="https://github.com/jltdev15" target="_blank" rel="noopener noreferrer"
          class="group w-14 h-14 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
          aria-label="Visit my GitHub profile">
          <div class="relative">
            <svg class="w-7 h-7 text-white transform group-hover:scale-110 transition-transform duration-300"
              fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm">
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/john-lerry-taruc-148854114/" target="_blank" rel="noopener noreferrer"
          class="group w-14 h-14 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
          aria-label="Visit my LinkedIn profile">
          <div class="relative">
            <svg class="w-7 h-7 text-white transform group-hover:scale-110 transition-transform duration-300"
              fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.15.781-1.15 1.601v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm">
            </div>
          </div>
        </a>
      </div>

      <!-- CTA Buttons with enhanced styling -->
      <div class="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-in-delay-4">
        <a href="#projects"
          class="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          @click.prevent="scrollToSection('#projects')"
          aria-label="View my projects">
          <span class="relative">
            View Projects
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </span>
          <ArrowRightIcon class="w-6 h-6 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
        </a>
        <a href="#contact"
          class="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border-2 border-white/20 text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          @click.prevent="scrollToSection('#contact')"
          aria-label="Contact me">
          <span class="relative">
            Contact Me
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 group-hover:w-full transition-all duration-300"></span>
          </span>
          <EnvelopeIcon class="w-6 h-6 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'

const scrollToSection = (sectionId) => {
  const element = document.querySelector(sectionId)
  if (element) {
    const navHeight = 64
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
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

.animate-fade-in-delay-3 {
  animation: fadeIn 1s ease-out 0.6s forwards;
  opacity: 0;
}

.animate-fade-in-delay-4 {
  animation: fadeIn 1s ease-out 0.8s forwards;
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
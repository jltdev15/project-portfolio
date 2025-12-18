<template>
  <section id="services" class="py-24 bg-black relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0); background-size: 24px 24px;"></div>
    </div>

    <!-- Animated Accent Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-96 h-96 bg-[#1D9BF0]/5 rounded-full blur-3xl -top-48 -right-48 animate-float-1"></div>
      <div class="absolute w-96 h-96 bg-[#1D9BF0]/5 rounded-full blur-3xl -bottom-48 -left-48 animate-float-2"></div>
    </div>

    <div class="container mx-auto px-4 relative">
      <div 
        ref="servicesRef"
        :class="[
          'transform transition-all duration-1000',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        ]"
      >
        <!-- Header Section -->
        <div class="text-center mb-20">
          <h2 class="text-5xl font-bold mb-6 text-[#F7F9F9]">
            Offered Services
          </h2>
          <div class="w-24 h-1 bg-[#1D9BF0] mx-auto rounded-full"></div>
          <p class="text-xl text-[#71767A] mt-6 max-w-2xl mx-auto">Explore my range of professional services designed to help you achieve your development goals</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Web Development -->
          <div class="group bg-[#16181C] border border-[#2F3336] p-8 rounded-xl hover:bg-[#181919] transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-[#1D9BF0] mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#F7F9F9] mb-4 group-hover:text-[#1D9BF0] transition-colors duration-300">Web Development</h3>
            <p class="text-[#71767A] leading-relaxed mb-6">Custom website development using modern technologies and best practices to create responsive and user-friendly applications.</p>
            <div class="flex flex-wrap gap-3">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          <!-- Coding Tutor -->
          <div class="group bg-[#16181C] border border-[#2F3336] p-8 rounded-xl hover:bg-[#181919] transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-[#1D9BF0] mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#F7F9F9] mb-4 group-hover:text-[#1D9BF0] transition-colors duration-300">Coding Tutor</h3>
            <p class="text-[#71767A] leading-relaxed mb-6">One-on-one coding mentorship and tutoring to help you master programming concepts, debug issues, and improve your coding skills.</p>
            <div class="flex flex-wrap gap-3">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          <!-- Mobile Development -->
          <div class="group bg-[#16181C] border border-[#2F3336] p-8 rounded-xl hover:bg-[#181919] transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-[#1D9BF0] mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#F7F9F9] mb-4 group-hover:text-[#1D9BF0] transition-colors duration-300">Mobile Development</h3>
            <p class="text-[#71767A] leading-relaxed mb-6">Developing cross-platform mobile applications that provide seamless user experiences across different devices.</p>
            <div class="flex flex-wrap gap-3">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" alt="Android" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/capacitor/capacitor-original.svg" alt="Capacitor" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" alt="Ionic" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue" class="w-8 h-8 hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { element: servicesRef, isVisible } = useScrollAnimation({
  threshold: 0.2,
  rootMargin: '0px'
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in;
}

.animate-float-1 {
  animation: float 20s ease-in-out infinite;
}

.animate-float-2 {
  animation: float 25s ease-in-out infinite reverse;
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
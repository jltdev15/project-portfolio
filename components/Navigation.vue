<template>
  <div v-show="mounted">
    <!-- Floating Menu Button -->
    <button
      v-show="!isMenuOpen"
      @click="toggleMenu"
      class="fixed top-6 right-6 z-50 w-14 h-14 bg-[#1D9BF0] rounded-full shadow-xl flex items-center justify-center hover:bg-[#1a8cd8] transition-all duration-300 hover:scale-110 group"
      aria-label="Toggle menu"
    >
      <div class="relative">
        <Icon name="lucide:menu" class="w-7 h-7 text-white transform group-hover:rotate-90 transition-transform duration-300" />
      </div>
    </button>

    <!-- Full Screen Menu -->
    <div
      v-show="isMenuOpen"
      class="fixed inset-0 z-40 bg-black border border-[#2F3336]"
    >
      <!-- Animated background particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute w-3 h-3 bg-white/10 rounded-full animate-float-1" style="top: 20%; left: 20%"></div>
        <div class="absolute w-3 h-3 bg-white/10 rounded-full animate-float-2" style="top: 40%; right: 20%"></div>
        <div class="absolute w-3 h-3 bg-white/10 rounded-full animate-float-3" style="bottom: 30%; left: 30%"></div>
        <div class="absolute w-3 h-3 bg-white/10 rounded-full animate-float-4" style="bottom: 40%; right: 30%"></div>
      </div>

      <!-- Close Button -->
      <button
        @click="toggleMenu"
        class="absolute top-6 right-6 w-14 h-14 bg-[#1D9BF0] rounded-full shadow-xl flex items-center justify-center hover:bg-[#1a8cd8] transition-all duration-300 hover:scale-110 group"
        aria-label="Close menu"
      >
        <div class="relative">
          <Icon name="lucide:x" class="w-7 h-7 text-white transform group-hover:rotate-90 transition-transform duration-300" />
        </div>
      </button>

      <!-- Menu Content -->
      <div class="h-full flex flex-col items-center justify-center">
        <nav class="space-y-12">
          <a
            v-for="(link, index) in links"
            :key="link.href"
            :href="link.href"
            @click="handleMobileClick(link.href)"
            class="group flex items-center space-x-6 text-5xl font-medium text-[#F7F9F9] hover:text-[#1D9BF0] transition-all duration-500 transform hover:scale-105"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="relative">
              <Icon :name="link.icon" class="w-12 h-12 transform group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span class="relative">
              {{ link.text }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1D9BF0] group-hover:w-full transition-all duration-500"></span>
            </span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick, ref } from 'vue'
import { isMenuOpen, toggleMenu } from '../stores/navigation'

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const links = [
  { href: '#home', text: 'Home', icon: 'lucide:home' },
  { href: '#about', text: 'About', icon: 'lucide:user' },
  { href: '#skills', text: 'Skills', icon: 'lucide:terminal' },
  { href: '#projects', text: 'Projects', icon: 'lucide:code' },
  { href: '#contact', text: 'Contact', icon: 'lucide:mail' }
]

const handleMobileClick = async (href) => {
  await nextTick()
  const element = document.querySelector(href)
  if (element) {
    const navHeight = href === '#home' ? 0 : 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
  toggleMenu()
}

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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
<template>
  <button
    v-show="showButton && !isMenuOpen"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 z-50 transform hover:scale-110 hover:shadow-xl opacity-0 translate-y-4 animate-fade-in group"
    aria-label="Scroll to top"
  >
    <div class="relative">
      <ArrowUpIcon class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
      <div class="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUpIcon } from '@heroicons/vue/24/outline'
import { isMenuOpen } from '../stores/navigation'

const showButton = ref(false)

const checkScroll = () => {
  // Show button when user scrolls down 300px from the top
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 
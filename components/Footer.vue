<template>
  <footer class="bg-gray-900 text-white py-16 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0); background-size: 24px 24px;"></div>
    </div>

    <!-- Animated Accent Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-64 h-64 bg-blue-500/5 rounded-full -top-32 -right-32 animate-float-1"></div>
      <div class="absolute w-64 h-64 bg-purple-500/5 rounded-full -bottom-32 -left-32 animate-float-2"></div>
    </div>

    <div class="container mx-auto px-4 relative">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Contact Info -->
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-blue-400">
            Contact Info
          </h3>
          <div class="space-y-4">
            <div class="flex items-center space-x-3 group">
              <div class="w-10 h-10 bg-blue-500/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <EnvelopeIcon class="w-5 h-5 text-blue-400" />
              </div>
              <p class="text-gray-400 group-hover:text-white transition-colors duration-300">johnlerrytaruc@gmail.com</p>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-10 h-10 bg-blue-500/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PhoneIcon class="w-5 h-5 text-blue-400" />
              </div>
              <p class="text-gray-400 group-hover:text-white transition-colors duration-300">+63 977 628 1665</p>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-10 h-10 bg-blue-500/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPinIcon class="w-5 h-5 text-blue-400" />
              </div>
              <p class="text-gray-400 group-hover:text-white transition-colors duration-300">Manila , Philippines</p>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-blue-400">
            Quick Links
          </h3>
          <ul class="space-y-4">
            <li v-for="(link, index) in quickLinks" :key="index">
              <a 
                :href="link.href" 
                class="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 group"
              >
                <ChevronRightIcon class="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                <span>{{ link.text }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-blue-400">
            Follow Me
          </h3>
          <div class="flex space-x-4">
            <a 
              v-for="(social, index) in socialLinks" 
              :key="index"
              :href="social.href" 
              class="w-12 h-12 bg-blue-500/5 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg 
                class="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                v-html="social.svg"
              ></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 mt-12 pt-8 text-center">
        <p class="text-gray-400">
          &copy; {{ new Date().getFullYear() }} John Lerry T. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const quickLinks = [
  { text: 'About', href: '#about' },
  { text: 'Skills', href: '#skills' },
  { text: 'Projects', href: '#projects' },
  { text: 'Contact', href: '#contact' }
]

const socialLinks = [
  {
    href: 'https://www.facebook.com/johnlerry.taruc/',
    svg: `<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`
  },
  {
    href: 'https://github.com/jltdev15',
    svg: `<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>`
  }
]
</script>

<style scoped>
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
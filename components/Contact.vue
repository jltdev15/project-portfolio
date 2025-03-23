<template>
  <div class="contact-section">
    <section id="contact" class="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0); background-size: 24px 24px;"></div>
      </div>

      <!-- Animated Accent Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -top-48 -right-48 animate-float-1"></div>
        <div class="absolute w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -bottom-48 -left-48 animate-float-2"></div>
      </div>

      <div class="container mx-auto px-4 relative">
        <div class="max-w-6xl mx-auto">
          <!-- Header Section -->
          <div class="text-center mb-20">
            <h2 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Let's Connect
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p class="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">Have a project in mind? Let's discuss how we can work together to bring your ideas to life.</p>
          </div>

          <!-- Contact Grid -->
          <div class="grid lg:grid-cols-1 gap-16 items-start">
            <!-- Contact Form -->
            <div class="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border-2 border-gray-100 hover:border-blue-200 transform transition-all duration-500 hover:-translate-y-1 max-w-2xl mx-auto w-full">
              <h3 class="text-2xl font-semibold text-gray-900 mb-8">Send a Message</h3>
              <form class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <UserIcon class="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      id="name" 
                      class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Your name"
                    >
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <EnvelopeIcon class="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      id="email" 
                      class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="your@email.com"
                    >
                  </div>
                </div>
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <ChatBubbleLeftIcon class="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      id="subject" 
                      class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="What's this about?"
                    >
                  </div>
                </div>
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <div class="relative">
                    <div class="absolute top-4 left-4 pointer-events-none z-10">
                      <ChatBubbleLeftRightIcon class="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea 
                      id="message" 
                      rows="5" 
                      class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button 
                    type="submit" 
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group border-2 border-transparent hover:border-blue-400"
                  >
                    <PaperAirplaneIcon class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  UserIcon, 
  ChatBubbleLeftIcon, 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/vue/24/outline'
</script>

<style scoped>
.contact-section {
  width: 100%;
  position: relative;
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
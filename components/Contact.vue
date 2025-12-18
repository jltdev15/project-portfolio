<template>
  <div class="contact-section">
    <section id="contact" class="py-24 bg-black relative overflow-hidden">
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
        <div class="max-w-6xl mx-auto">
          <!-- Header Section -->
          <div class="text-center mb-20">
            <h2 class="text-5xl font-bold mb-6 text-[#F7F9F9]">
              Let's Connect
            </h2>
            <div class="w-24 h-1 bg-[#1D9BF0] mx-auto rounded-full"></div>
            <p class="text-xl text-[#71767A] mt-6 max-w-2xl mx-auto">Have a project in mind? Let's discuss how we can work together to bring your ideas to life.</p>
          </div>

          <!-- Contact Grid -->
          <div class="grid lg:grid-cols-1 gap-16 items-start">
            <!-- Contact Form -->
            <div class="bg-[#16181C] border border-[#2F3336] p-10 rounded-3xl hover:bg-[#181919] transform transition-all duration-500 hover:-translate-y-1 max-w-2xl mx-auto w-full">
              <h3 class="text-2xl font-semibold text-[#F7F9F9] mb-8">Send a Message</h3>
              <form class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-[#71767A] mb-2">Name</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Icon name="lucide:user" class="h-5 w-5 text-[#71767A]" />
                    </div>
                    <input 
                      type="text" 
                      id="name" 
                      class="block w-full pl-12 pr-4 py-3 bg-transparent border border-[#2F3336] rounded-2xl text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-all duration-300"
                      placeholder="Your name"
                    >
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-[#71767A] mb-2">Email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Icon name="lucide:mail" class="h-5 w-5 text-[#71767A]" />
                    </div>
                    <input 
                      type="email" 
                      id="email" 
                      class="block w-full pl-12 pr-4 py-3 bg-transparent border border-[#2F3336] rounded-2xl text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-all duration-300"
                      placeholder="your@email.com"
                    >
                  </div>
                </div>
                <div>
                  <label for="subject" class="block text-sm font-medium text-[#71767A] mb-2">Subject</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Icon name="lucide:message-square" class="h-5 w-5 text-[#71767A]" />
                    </div>
                    <input 
                      type="text" 
                      id="subject" 
                      class="block w-full pl-12 pr-4 py-3 bg-transparent border border-[#2F3336] rounded-2xl text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-all duration-300"
                      placeholder="What's this about?"
                    >
                  </div>
                </div>
                <div>
                  <label for="message" class="block text-sm font-medium text-[#71767A] mb-2">Message</label>
                  <div class="relative">
                    <div class="absolute top-4 left-4 pointer-events-none z-10">
                      <Icon name="lucide:message-circle" class="h-5 w-5 text-[#71767A]" />
                    </div>
                    <textarea 
                      id="message" 
                      rows="5" 
                      class="block w-full pl-12 pr-4 py-3 bg-transparent border border-[#2F3336] rounded-2xl text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-all duration-300 resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button 
                    type="submit" 
                    class="w-full bg-[#1D9BF0] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#1a8cd8] transition-all duration-300 flex items-center justify-center group"
                  >
                    <Icon name="lucide:send" class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
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
// Icons are now using @nuxt/icon with Lucide icons
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
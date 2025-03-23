<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Background overlay with blur effect -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-md px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-white/10">
        <!-- Close button -->
        <div class="absolute right-0 top-0 pr-4 pt-4">
          <button type="button" 
            class="rounded-full bg-white/5 p-2 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:rotate-90" 
            @click="closeModal">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal content -->
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <!-- Success Message -->
            <div v-if="isSuccess" class="text-center py-8 animate-fade-in">
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
                <svg class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p class="text-blue-100/80 mb-6">Your feedback has been submitted successfully.</p>
              <button @click="closeModal"
                class="group inline-flex justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <span class="relative">
                  Close
                  <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </span>
              </button>
            </div>

            <!-- Survey Form -->
            <div v-else>
              <h3 class="text-2xl font-bold leading-6 text-white mb-2 animate-fade-in" id="modal-title">
                Share Your Experience
              </h3>
              <p class="text-blue-100/80 text-sm mb-6 animate-fade-in-delay-1">Your feedback helps me improve and create better experiences.</p>
              
              <form @submit.prevent="submitSurvey" class="space-y-6">
                <!-- Name -->
                <div class="animate-fade-in-delay-2">
                  <label for="name" class="block text-sm font-medium text-blue-100 mb-1">Name</label>
                  <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <input type="text" id="name" v-model="form.name" required
                      class="relative block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 shadow-sm focus:border-blue-400 focus:ring-blue-400 sm:text-sm backdrop-blur-sm px-4 py-2.5 transition-all duration-300 group-hover:border-white/20"
                      placeholder="Enter your name">
                  </div>
                </div>

                <!-- Email -->
                <div class="animate-fade-in-delay-3">
                  <label for="email" class="block text-sm font-medium text-blue-100 mb-1">Email</label>
                  <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <input type="email" id="email" v-model="form.email" required
                      class="relative block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 shadow-sm focus:border-blue-400 focus:ring-blue-400 sm:text-sm backdrop-blur-sm px-4 py-2.5 transition-all duration-300 group-hover:border-white/20"
                      placeholder="Enter your email">
                  </div>
                </div>

                <!-- Rating -->
                <div class="animate-fade-in-delay-4">
                  <label class="block text-sm font-medium text-blue-100 mb-3">How would you rate your experience?</label>
                  <div class="flex space-x-2">
                    <button v-for="rating in 5" :key="rating" type="button"
                      @click="form.rating = rating"
                      :class="[
                        'p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12',
                        form.rating >= rating 
                          ? 'text-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20' 
                          : 'text-white/30 hover:text-yellow-400/50 hover:bg-white/5'
                      ]">
                      <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  </div>
                  <input type="hidden" v-model="form.rating" required>
                </div>

                <!-- Feedback -->
                <div class="animate-fade-in-delay-5">
                  <label for="feedback" class="block text-sm font-medium text-blue-100 mb-1">Your Feedback</label>
                  <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <textarea id="feedback" v-model="form.feedback" rows="4" required
                      class="relative block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 shadow-sm focus:border-blue-400 focus:ring-blue-400 sm:text-sm backdrop-blur-sm px-4 py-2.5 transition-all duration-300 group-hover:border-white/20 resize-none"
                      placeholder="Share your thoughts about the website..."></textarea>
                  </div>
                </div>

                <!-- Submit button -->
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse animate-fade-in-delay-6">
                  <button type="submit"
                    :disabled="isLoading"
                    class="group inline-flex w-full justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                    <span class="relative flex items-center">
                      <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>
                        {{ isLoading ? 'Submitting...' : 'Submit Feedback' }}
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </span>
                  </button>
                  <button type="button"
                    :disabled="isLoading"
                    class="group mt-3 inline-flex w-full justify-center rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 sm:mt-0 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="closeModal">
                    <span class="relative">
                      Cancel
                      <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  email: '',
  rating: 0,
  feedback: ''
})

const isLoading = ref(false)
const isSuccess = ref(false)

const closeModal = () => {
  emit('close')
  // Reset form and states when closing
  form.value = {
    name: '',
    email: '',
    rating: 0,
    feedback: ''
  }
  isSuccess.value = false
}

const submitSurvey = async () => {
  try {
    isLoading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    emit('submit', form.value)
    isSuccess.value = true
  } catch (error) {
    console.error('Error submitting feedback:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 0.5s ease-out 0.1s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.5s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 0.5s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-fade-in-delay-4 {
  animation: fadeIn 0.5s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-fade-in-delay-5 {
  animation: fadeIn 0.5s ease-out 0.5s forwards;
  opacity: 0;
}

.animate-fade-in-delay-6 {
  animation: fadeIn 0.5s ease-out 0.6s forwards;
  opacity: 0;
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

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style> 
<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-title">
        {{ error.statusCode || 'Error' }}
      </h1>
      <p class="error-message">
        {{ error.message || 'An error occurred' }}
      </p>
      <button 
        @click="handleError" 
        class="error-button"
      >
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<style>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-title {
  font-size: 6rem;
  font-weight: 700;
  color: #2563eb;
  margin: 0;
  line-height: 1;
}

.error-message {
  font-size: 1.5rem;
  color: #1f2937;
  margin: 1rem 0;
}

.error-button {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.error-button:hover {
  background-color: #1d4ed8;
}
</style> 
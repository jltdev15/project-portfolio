import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options = {}) {
  const element = ref(null)
  const isVisible = ref(false)

  const defaultOptions = {
    threshold: 0.2,
    rootMargin: '0px',
    ...options
  }

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.unobserve(entry.target)
        }
      })
    }, defaultOptions)

    if (element.value) {
      observer.observe(element.value)
    }

    onUnmounted(() => {
      if (element.value) {
        observer.unobserve(element.value)
      }
    })
  })

  return {
    element,
    isVisible
  }
} 
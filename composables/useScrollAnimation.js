import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options = {}) {
  const element = ref(null)
  const isVisible = ref(false)
  let observer = null

  const defaultOptions = {
    threshold: 0.2,
    rootMargin: '0px',
    ...options
  }

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (observer) {
          observer.unobserve(entry.target)
        }
      }
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, defaultOptions)
    if (element.value) {
      observer.observe(element.value)
    }
  })

  onUnmounted(() => {
    if (observer && element.value) {
      observer.unobserve(element.value)
    }
  })

  return {
    element,
    isVisible
  }
} 
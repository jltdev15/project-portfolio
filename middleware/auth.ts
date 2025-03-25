export default defineNuxtRouteMiddleware((to) => {
  // For demo purposes, we'll use a simple password check
  // In production, you should implement proper authentication
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true'
  }

  if (to.path.startsWith('/admin') && !isAuthenticated()) {
    return navigateTo('/admin/login')
  }
}) 
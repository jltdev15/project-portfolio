export default defineNuxtRouteMiddleware((to) => {
  // Only protect admin routes
  if (to.path.startsWith('/admin')) {
    const isAuthenticated = () => {
      if (process.client) {
        return localStorage.getItem('isAuthenticated') === 'true'
      }
      return false
    }

    if (!isAuthenticated()) {
      return navigateTo('/admin/login')
    }
  }
}) 
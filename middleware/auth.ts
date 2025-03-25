export default defineNuxtRouteMiddleware((to) => {
  // Only protect admin routes
  if (to.path.startsWith('/admin')) {
    if (process.client && localStorage.getItem('isAuthenticated') !== 'true') {
      return navigateTo('/admin/login')
    }
  }
}) 
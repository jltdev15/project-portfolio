export default defineNuxtRouteMiddleware((to) => {
  // Only check admin routes
  if (to.path.startsWith('/admin')) {
    const runtimeConfig = useRuntimeConfig()
    
    // Client-side check
    if (runtimeConfig.app.client) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
      const token = useCookie('auth_token').value
      const user = localStorage.getItem('user')

      // If any authentication state exists and trying to access login/register
      if ((isAuthenticated || token || user) && (to.path === '/admin/auth/login' || to.path === '/admin/auth/register')) {
        return navigateTo('/admin')
      }

      // If no authentication state exists and trying to access protected routes
      if (!isAuthenticated && !token && !user && !(to.path === '/admin/auth/login' || to.path === '/admin/auth/register')) {
        return navigateTo('/admin/auth/login')
      }
    }
    
    // Server-side check
    if (!runtimeConfig.app.client) {
      const token = useCookie('auth_token').value
      
      // If authenticated and trying to access login/register
      if (token && (to.path === '/admin/auth/login' || to.path === '/admin/auth/register')) {
        return navigateTo('/admin')
      }

      // If not authenticated and trying to access protected routes
      if (!token && !(to.path === '/admin/auth/login' || to.path === '/admin/auth/register')) {
        return navigateTo('/admin/auth/login')
      }
    }
  }
}) 
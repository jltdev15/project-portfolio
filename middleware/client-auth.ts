export default defineNuxtRouteMiddleware((to) => {
  const runtimeConfig = useRuntimeConfig()
  
  // Check support routes - prevent admin users from accessing
  if (to.path.startsWith('/support')) {
    // Client-side check
    if (runtimeConfig.app.client) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
      const token = useCookie('auth_token').value
      const user = localStorage.getItem('user')

      // Check if user is an admin trying to access support routes
      if (user) {
        try {
          const userData = JSON.parse(user)
          if (userData.role === 'admin') {
            // Admin users cannot access support routes - redirect to admin dashboard
            return navigateTo('/admin')
          }
        } catch (e) {
          // Error parsing user, continue with normal auth check
        }
      }

      // If no authentication state exists, redirect to support login
      if (!isAuthenticated && !token && !user && to.path !== '/support/auth') {
        return navigateTo('/support/auth')
      }
    }
  }
})


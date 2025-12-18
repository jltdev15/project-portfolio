export default defineNuxtRouteMiddleware((to) => {
  const runtimeConfig = useRuntimeConfig()
  
  // Check admin routes - prevent client users from accessing
  if (to.path.startsWith('/admin')) {
    // Client-side check
    if (runtimeConfig.app.client) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
      const token = useCookie('auth_token').value
      const user = localStorage.getItem('user')

      // Check if user is a client (non-admin) trying to access admin routes
      if (user) {
        try {
          const userData = JSON.parse(user)
          if (userData.role === 'user' && to.path !== '/admin/auth' && to.path !== '/admin/auth/register') {
            // Client users cannot access admin routes - redirect to support dashboard
            return navigateTo('/support/dashboard')
          }
        } catch (e) {
          // Error parsing user, continue with normal auth check
        }
      }

      // If any authentication state exists and trying to access login/register
      if ((isAuthenticated || token || user) && (to.path === '/admin/auth' || to.path === '/admin/auth/register')) {
        // Check user role to redirect appropriately
        if (user) {
          try {
            const userData = JSON.parse(user)
            if (userData.role === 'user') {
              return navigateTo('/support/dashboard')
            }
          } catch (e) {
            // Error parsing, default to admin
          }
        }
        return navigateTo('/admin')
      }

      // If no authentication state exists and trying to access protected routes
      if (!isAuthenticated && !token && !user && !(to.path === '/admin/auth' || to.path === '/admin/auth/register')) {
        return navigateTo('/admin/auth')
      }
    }
    
    // Server-side check
    if (!runtimeConfig.app.client) {
      const token = useCookie('auth_token').value
      
      // If authenticated and trying to access login/register
      if (token && (to.path === '/admin/auth' || to.path === '/admin/auth/register')) {
        return navigateTo('/admin')
      }

      // If not authenticated and trying to access protected routes
      if (!token && !(to.path === '/admin/auth' || to.path === '/admin/auth/register')) {
        return navigateTo('/admin/auth')
      }
    }
  }
}) 
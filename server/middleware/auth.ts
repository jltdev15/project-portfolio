import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default defineEventHandler(async (event) => {
  // Skip auth for login, register, and public endpoints
  if (event.path.startsWith('/api/auth/') || 
      (event.path.startsWith('/api/projects') && event.method === 'GET')) {
    return
  }

  // Handle admin page routes
  if (event.path.startsWith('/admin')) {
    const token = getCookie(event, 'auth_token')
    
    // If trying to access auth pages while having a valid token
    if (token && (event.path === '/admin/auth' || event.path === '/admin/auth/register')) {
      return sendRedirect(event, '/admin')
    }

    // If trying to access protected pages without a token
    if (!token && !(event.path === '/admin/auth' || event.path === '/admin/auth/register')) {
      return sendRedirect(event, '/admin/auth')
    }

    // Verify token for protected admin pages
    if (token && !(event.path === '/admin/auth' || event.path === '/admin/auth/register')) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET)
        event.context.auth = decoded
      } catch (error) {
        return sendRedirect(event, '/admin/auth')
      }
    }
  }

  // Protect all other admin API routes
  if (event.path.startsWith('/api/')) {
    const token = getCookie(event, 'auth_token')

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'No token provided'
      })
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      event.context.auth = decoded
    } catch (error) {
      throw createError({
        statusCode: 401,
        message: 'Invalid token'
      })
    }
  }
}) 
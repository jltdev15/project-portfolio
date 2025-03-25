import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default defineEventHandler(async (event) => {
  // Skip auth for login and register endpoints
  if (event.path.startsWith('/api/auth/')) {
    return
  }

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
}) 
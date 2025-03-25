import { defineEventHandler, deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
  // Delete the auth token cookie
  deleteCookie(event, 'auth_token')
  
  return {
    message: 'Logged out successfully'
  }
}) 
import { defineEventHandler, readBody, getCookie, createError } from 'h3'
import { User } from '~/server/models/User'
import { connectDB } from '~/server/utils/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default defineEventHandler(async (event) => {
  await connectDB()

  // Get token from cookie
  const token = getCookie(event, 'auth_token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  let decoded: any
  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }

  const userId = decoded.userId

  if (event.method === 'GET') {
    try {
      const user = await User.findById(userId).select('-password')
      
      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found'
        })
      }

      return user
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.message || 'Failed to fetch profile'
      })
    }
  }

  if (event.method === 'PUT') {
    try {
      const body = await readBody(event)

      // Find user
      const user = await User.findById(userId)
      
      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found'
        })
      }

      // Update allowed fields
      if (body.username !== undefined) user.username = body.username
      if (body.email !== undefined) user.email = body.email
      if (body.avatar !== undefined) user.avatar = body.avatar
      if (body.firstName !== undefined) user.firstName = body.firstName
      if (body.lastName !== undefined) user.lastName = body.lastName
      if (body.bio !== undefined) user.bio = body.bio
      if (body.phone !== undefined) user.phone = body.phone
      if (body.location !== undefined) user.location = body.location
      
      user.updatedAt = new Date()

      await user.save()

      // Return user without password
      const userObj = user.toObject()
      delete userObj.password

      return {
        success: true,
        user: userObj
      }
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.message || 'Failed to update profile'
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})


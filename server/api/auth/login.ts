import { defineEventHandler, readBody, setCookie, getCookie, createError } from 'h3'
import { connectDB } from '../../utils/db'
import { User } from '../../models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const body = await readBody(event)

    // Find user by username
    const user = await User.findOne({ username: body.username })
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    // Check password
    const isValidPassword = await user.comparePassword(body.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        role: user.role,
        projectId: user.projectId ? user.projectId.toString() : null
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Set cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    // Return user data without password
    const userResponse = user.toObject()
    delete userResponse.password

    return {
      user: {
        ...userResponse,
        projectId: user.projectId ? user.projectId.toString() : null
      },
      token
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error logging in'
    })
  }
}) 
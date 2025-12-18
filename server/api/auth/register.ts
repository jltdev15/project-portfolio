import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../../utils/db'
import { User } from '../../models/User'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const body = await readBody(event)

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: body.email }, { username: body.username }]
    })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'User with this email or username already exists'
      })
    }

    // Create new user
    const user = new User({
      username: body.username,
      email: body.email,
      password: body.password,
      role: body.role || 'user'
    })

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    return userResponse
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating user'
    })
  }
}) 
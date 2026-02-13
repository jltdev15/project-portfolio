import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { connectDB } from '../../../utils/db'
import { TicketProject } from '../../../models/TicketProject'
import { User } from '../../../models/User'
import crypto from 'crypto'

// Helper function to generate secure random password
function generateSecurePassword(length: number = 12): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const allChars = uppercase + lowercase + numbers
  
  // Ensure at least one of each type
  let password = ''
  const randomBytes = crypto.randomBytes(length)
  
  // Get one of each required type
  password += uppercase[randomBytes[0] % uppercase.length]
  password += lowercase[randomBytes[1] % lowercase.length]
  password += numbers[randomBytes[2] % numbers.length]
  
  // Fill the rest randomly using crypto
  for (let i = password.length; i < length; i++) {
    password += allChars[randomBytes[i] % allChars.length]
  }
  
  // Shuffle the password using crypto
  const passwordArray = password.split('')
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = randomBytes[i] % (i + 1)
    ;[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]
  }
  
  return passwordArray.join('')
}

// Helper function to generate unique username
async function generateUsername(projectTitle: string): Promise<string> {
  const baseUsername = projectTitle
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  
  let username = `${baseUsername}-client`
  let counter = 1
  
  while (await User.findOne({ username })) {
    username = `${baseUsername}-client-${counter}`
    counter++
  }
  
  return username
}

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const projectId = getRouterParam(event, 'id')
    
    if (!projectId) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required'
      })
    }

    // Verify ticket project exists
    const project = await TicketProject.findById(projectId)
    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Ticket project not found'
      })
    }

    // GET - Get client user account for project (null when none exists)
    if (event.method === 'GET') {
      const clientUser = await User.findOne({ projectId, role: 'user' }).select('-password')
      return clientUser ?? null
    }

    // POST - Create client user account for project
    if (event.method === 'POST') {
      // Check if client user already exists for this project
      const existingUser = await User.findOne({ projectId, role: 'user' })
      if (existingUser) {
        throw createError({
          statusCode: 400,
          message: 'Client user account already exists for this project'
        })
      }

      // Generate username and password
      const username = await generateUsername(project.title || project.linkUrl)
      const password = generateSecurePassword(12)
      
      // Generate email based on username
      const email = `${username}@project.local`

      // Create client user
      const clientUser = new User({
        username,
        email,
        password,
        role: 'user',
        projectId,
        credentialsGenerated: true
      })

      await clientUser.save()

      // Return credentials (only time they'll be visible)
      return {
        success: true,
        credentials: {
          username,
          password
        },
        user: {
          _id: clientUser._id,
          username: clientUser.username,
          email: clientUser.email,
          projectId: clientUser.projectId,
          credentialsGenerated: clientUser.credentialsGenerated
        }
      }
    }

    // PUT - Reset password for client user
    if (event.method === 'PUT') {
      const body = await readBody(event)
      
      // Check if this is a password reset request
      if (body.action === 'reset-password') {
        const clientUser = await User.findOne({ projectId, role: 'user' })
        
        if (!clientUser) {
          throw createError({
            statusCode: 404,
            message: 'No client user account found for this project'
          })
        }

        // Generate new password
        const newPassword = generateSecurePassword(12)
        clientUser.password = newPassword
        clientUser.credentialsGenerated = true
        
        await clientUser.save()

        // Return new credentials
        return {
          success: true,
          credentials: {
            username: clientUser.username,
            password: newPassword
          }
        }
      }

      throw createError({
        statusCode: 400,
        message: 'Invalid action'
      })
    }

    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error: any) {
    console.error('API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})


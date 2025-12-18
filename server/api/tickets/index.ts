import { defineEventHandler, readBody, createError, getQuery } from 'h3'
import { connectDB } from '../../utils/db'
import { Ticket } from '../../models/Ticket'
import mongoose from 'mongoose'

// GET all tickets or POST new ticket
export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    // Get authenticated user from context (set by auth middleware)
    const auth = event.context.auth as any
    if (!auth) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    const userRole = auth.role
    const userProjectId = auth.projectId
    
    if (event.method === 'GET') {
      const query = getQuery(event)
      const status = query.status as string | undefined
      const priority = query.priority as string | undefined
      const projectId = query.projectId as string | undefined
      
      const filter: any = {}
      
      // For client users, filter by their projectId
      if (userRole === 'user' && userProjectId) {
        filter.projectId = new mongoose.Types.ObjectId(userProjectId)
      }
      // For admins, allow filtering by projectId if provided
      else if (userRole === 'admin' && projectId) {
        filter.projectId = new mongoose.Types.ObjectId(projectId)
      }
      
      if (status) filter.status = status
      if (priority) filter.priority = priority
      
      const tickets = await Ticket.find(filter).populate('projectId', 'title').sort({ createdAt: -1 })
      return tickets
    }

    // POST new ticket
    if (event.method === 'POST') {
      const body = await readBody(event)
      
      // Validate required fields
      if (!body.title || !body.description) {
        throw createError({
          statusCode: 400,
          message: 'Title and description are required'
        })
      }

      // Determine projectId based on user role
      let projectId: mongoose.Types.ObjectId | null = null
      
      if (userRole === 'user') {
        // Client users: use their assigned projectId
        if (!userProjectId) {
          throw createError({
            statusCode: 400,
            message: 'User is not assigned to a project'
          })
        }
        projectId = new mongoose.Types.ObjectId(userProjectId)
      } else if (userRole === 'admin') {
        // Admins: require projectId in request body
        if (!body.projectId) {
          throw createError({
            statusCode: 400,
            message: 'projectId is required for admin users'
          })
        }
        projectId = new mongoose.Types.ObjectId(body.projectId)
      }

      // Get createdBy from authenticated user
      const createdBy = auth.username || 'Unknown'

      // Create new ticket
      const ticket = new Ticket({
        title: body.title,
        description: body.description,
        status: body.status || 'open',
        priority: body.priority || 'medium',
        assignee: body.assignee || '',
        createdBy: createdBy,
        projectId: projectId,
        tags: body.tags || []
      })

      try {
        const savedTicket = await ticket.save()
        await savedTicket.populate('projectId', 'title')
        return savedTicket
      } catch (saveError: any) {
        console.error('Ticket save error:', saveError)
        throw createError({
          statusCode: 500,
          message: saveError.message || 'Failed to save ticket'
        })
      }
    }
  } catch (error: any) {
    console.error('API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})


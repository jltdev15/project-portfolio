import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/db'
import { Ticket } from '../../models/Ticket'
import mongoose from 'mongoose'

// Helper function to validate project access
async function validateProjectAccess(ticket: any, auth: any): Promise<void> {
  if (auth.role === 'admin') {
    // Admins can access all tickets
    return
  }
  
  // Client users can only access tickets for their project
  if (auth.role === 'user') {
    const userProjectId = auth.projectId
    const ticketProjectId = ticket.projectId?.toString()
    
    if (!userProjectId || ticketProjectId !== userProjectId) {
      throw createError({
        statusCode: 403,
        message: 'You do not have access to this ticket'
      })
    }
  }
}

// GET, PUT, or DELETE a specific ticket
export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Ticket ID is required'
      })
    }

    // Get authenticated user from context
    const auth = event.context.auth as any
    if (!auth) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    if (event.method === 'GET') {
      const ticket = await Ticket.findById(id).populate('projectId', 'title')
      if (!ticket) {
        throw createError({
          statusCode: 404,
          message: 'Ticket not found'
        })
      }
      
      // Validate project access
      await validateProjectAccess(ticket, auth)
      
      return ticket
    }

    if (event.method === 'PUT') {
      const body = await readBody(event)
      
      // Get ticket first to validate access
      const existingTicket = await Ticket.findById(id)
      if (!existingTicket) {
        throw createError({
          statusCode: 404,
          message: 'Ticket not found'
        })
      }
      
      // Validate project access
      await validateProjectAccess(existingTicket, auth)
      
      // For client users, ensure they can't change projectId
      if (auth.role === 'user' && body.projectId) {
        delete body.projectId
      }
      
      const ticket = await Ticket.findByIdAndUpdate(
        id,
        {
          ...body,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      ).populate('projectId', 'title')

      if (!ticket) {
        throw createError({
          statusCode: 404,
          message: 'Ticket not found'
        })
      }

      return ticket
    }

    if (event.method === 'DELETE') {
      // Get ticket first to validate access
      const ticket = await Ticket.findById(id)
      if (!ticket) {
        throw createError({
          statusCode: 404,
          message: 'Ticket not found'
        })
      }
      
      // Validate project access
      await validateProjectAccess(ticket, auth)
      
      await Ticket.findByIdAndDelete(id)
      return { message: 'Ticket deleted successfully' }
    }
  } catch (error: any) {
    console.error('API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})


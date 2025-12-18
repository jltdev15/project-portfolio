import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/db'
import { TicketProject } from '../../models/TicketProject'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required'
      })
    }

    // GET single ticket project
    if (event.method === 'GET') {
      const project = await TicketProject.findById(id)
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Ticket project not found'
        })
      }
      return project
    }

    // PUT update ticket project
    if (event.method === 'PUT') {
      const body = await readBody(event)
      
      // Only update allowed fields
      const updateData: any = {}
      if (body.linkUrl !== undefined) updateData.linkUrl = body.linkUrl
      if (body.owner !== undefined) updateData.owner = body.owner
      if (body.title !== undefined) updateData.title = body.title
      if (body.description !== undefined) updateData.description = body.description
      
      const project = await TicketProject.findByIdAndUpdate(id, updateData, { new: true })
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Ticket project not found'
        })
      }
      return project
    }

    // DELETE ticket project
    if (event.method === 'DELETE') {
      const project = await TicketProject.findByIdAndDelete(id)
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Ticket project not found'
        })
      }
      return { message: 'Ticket project deleted successfully' }
    }
  } catch (error: any) {
    console.error('API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})


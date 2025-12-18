import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../../utils/db'
import { TicketProject } from '../../models/TicketProject'

// GET all ticket projects or POST new ticket project
export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    if (event.method === 'GET') {
      const projects = await TicketProject.find().sort({ createdAt: -1 })
      return projects
    }

    // POST new ticket project
    if (event.method === 'POST') {
      const body = await readBody(event)
      
      // Validate required fields
      if (!body.linkUrl || !body.owner) {
        throw createError({
          statusCode: 400,
          message: 'Project URL and Owner are required'
        })
      }

      // Extract domain name from URL for title if not provided
      let title = body.title || ''
      if (!title && body.linkUrl) {
        try {
          const url = new URL(body.linkUrl)
          title = url.hostname.replace('www.', '')
        } catch (e) {
          title = 'New Project'
        }
      }

      // Create new ticket project with auto-generated fields
      const project = new TicketProject({
        title: title || 'New Project',
        description: body.description || `Project owned by ${body.owner}`,
        linkUrl: body.linkUrl,
        owner: body.owner
      })

      try {
        const savedProject = await project.save()
        return savedProject
      } catch (saveError: any) {
        console.error('Ticket project save error:', saveError)
        throw createError({
          statusCode: 500,
          message: saveError.message || 'Failed to save project'
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


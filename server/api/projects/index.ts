import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../../utils/db'
import { Project } from '../../models/Project'

// GET all projects
export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    if (event.method === 'GET') {
      const projects = await Project.find().sort({ createdAt: -1 })
      return projects
    }

    // POST new project
    if (event.method === 'POST') {
      const body = await readBody(event)
      
      // Validate required fields
      if (!body.title || !body.description || !body.image || !body.technologies || !body.linkUrl) {
        throw createError({
          statusCode: 400,
          message: 'Title, description, image, technologies, and linkUrl are required'
        })
      }

      // Create new project
      const project = new Project({
        title: body.title,
        description: body.description,
        image: body.image,
        technologies: body.technologies,
        linkUrl: body.linkUrl
      })

      try {
        const savedProject = await project.save()
        return savedProject
      } catch (saveError: any) {
        console.error('Project save error:', saveError)
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
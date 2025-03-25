import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/db'
import { Project } from '../../models/Project'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const id = event.context.params?.id

    // GET single project
    if (event.method === 'GET') {
      const project = await Project.findById(id)
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Project not found'
        })
      }
      return project
    }

    // PUT update project
    if (event.method === 'PUT') {
      const body = await readBody(event)
      const project = await Project.findByIdAndUpdate(id, body, { new: true })
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Project not found'
        })
      }
      return project
    }

    // DELETE project
    if (event.method === 'DELETE') {
      const project = await Project.findByIdAndDelete(id)
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Project not found'
        })
      }
      return { message: 'Project deleted successfully' }
    }
  } catch (error) {
    console.error('API Error:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}) 
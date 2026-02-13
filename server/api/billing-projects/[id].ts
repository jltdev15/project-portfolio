import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../../utils/db'
import { BillingProject } from '../../models/BillingProject'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const id = event.context.params?.id

    if (event.method === 'GET') {
      const project = await BillingProject.findById(id)
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Billing project not found'
        })
      }
      return project
    }

    if (event.method === 'PUT') {
      const body = await readBody(event)

      const updateData: Record<string, string> = {}
      if (body.title !== undefined) updateData.title = body.title.trim()
      if (body.owner !== undefined) updateData.owner = body.owner.trim()
      if (body.linkUrl !== undefined) updateData.linkUrl = body.linkUrl.trim()

      const project = await BillingProject.findByIdAndUpdate(id, updateData, { new: true })
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Billing project not found'
        })
      }
      return project
    }

    if (event.method === 'DELETE') {
      const project = await BillingProject.findByIdAndDelete(id)
      if (!project) {
        throw createError({
          statusCode: 404,
          message: 'Billing project not found'
        })
      }
      return { message: 'Billing project deleted successfully' }
    }
  } catch (error: any) {
    console.error('Billing project API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})

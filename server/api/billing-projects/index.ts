import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../../utils/db'
import { BillingProject } from '../../models/BillingProject'

// GET all billing projects | POST create one
export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    if (event.method === 'GET') {
      const projects = await BillingProject.find().sort({ createdAt: -1 })
      return projects
    }

    if (event.method === 'POST') {
      const body = await readBody(event)

      if (!body.title || !body.owner) {
        throw createError({
          statusCode: 400,
          message: 'Title and Owner are required'
        })
      }

      const project = new BillingProject({
        title: body.title.trim(),
        owner: body.owner.trim(),
        linkUrl: body.linkUrl ? body.linkUrl.trim() : ''
      })

      const saved = await project.save()
      return saved
    }
  } catch (error: any) {
    console.error('Billing projects API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})

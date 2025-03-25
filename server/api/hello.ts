import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // Handle GET request
  if (event.method === 'GET') {
    return {
      message: 'Hello from Nitro API!',
      timestamp: new Date().toISOString()
    }
  }

  // Handle POST request
  if (event.method === 'POST') {
    const body = await readBody(event)
    return {
      message: 'Received POST request',
      data: body,
      timestamp: new Date().toISOString()
    }
  }
}) 
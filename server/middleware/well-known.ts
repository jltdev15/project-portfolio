/**
 * Respond to /.well-known/* requests (e.g. Chrome DevTools) with 404
 * so they never hit the client router and avoid "No match found" warnings.
 */
export default defineEventHandler((event) => {
  if (event.path.startsWith('/.well-known/')) {
    throw createError({ statusCode: 404, message: 'Not Found' })
  }
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.payload = {
    ...nuxtApp.payload,
    _serialized: true
  }
}) 
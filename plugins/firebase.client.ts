import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Check if Firebase config is available
  if (!config.public.firebaseApiKey || !config.public.firebaseProjectId) {
    console.warn('Firebase configuration is missing. Please add Firebase environment variables to your .env file.')
    return {
      provide: {
        firebase: null as FirebaseApp | null,
        firebaseStorage: null as FirebaseStorage | null
      }
    }
  }

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  // Initialize Firebase Storage
  const storage = getStorage(app)

  return {
    provide: {
      firebase: app,
      firebaseStorage: storage
    }
  }
})


import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ref } from 'vue'

export const useFirebaseStorage = () => {
  // Client-side only
  if (process.server) {
    return {
      uploadImage: () => Promise.resolve(''),
      uploading: ref(false),
      uploadProgress: ref(0),
      error: ref(null)
    }
  }

  const { $firebaseStorage } = useNuxtApp()
  const uploading = ref(false)
  const uploadProgress = ref(0)
  const error = ref(null)

  if (!$firebaseStorage) {
    console.warn('Firebase Storage is not initialized. Please check your Firebase configuration.')
    return {
      uploadImage: () => Promise.resolve(''),
      uploading: ref(false),
      uploadProgress: ref(0),
      error: ref(null)
    }
  }

  const uploadImage = async (file, path = 'projects') => {
    if (!file) {
      throw new Error('No file provided')
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a JPEG, PNG, or WebP image.')
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit. Please upload a smaller image.')
    }

    try {
      uploading.value = true
      uploadProgress.value = 0
      error.value = null

      // Generate unique filename
      const timestamp = Date.now()
      const filename = `${timestamp}_${file.name}`
      const fullPath = `${path}/${filename}`

      // Create storage reference
      const fileRef = storageRef($firebaseStorage, fullPath)

      // Upload file
      const uploadTask = uploadBytesResumable(fileRef, file)

      // Return a promise that resolves with the download URL
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Track upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            uploadProgress.value = progress
          },
          (err) => {
            // Handle errors
            uploading.value = false
            error.value = err.message
            reject(err)
          },
          async () => {
            // Upload completed successfully
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              uploading.value = false
              uploadProgress.value = 100
              resolve(downloadURL)
            } catch (err) {
              uploading.value = false
              error.value = err.message
              reject(err)
            }
          }
        )
      })
    } catch (err) {
      uploading.value = false
      error.value = err.message
      throw err
    }
  }

  return {
    uploadImage,
    uploading,
    uploadProgress,
    error
  }
}


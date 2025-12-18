// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true, // Explicitly enable SSR
  pages: true, // Explicitly enable pages feature
  nitro: {
    routeRules: {
      '/api/**': {
        cors: true
      }
    },
    prerender: {
      crawlLinks: false
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'John Lerry T.',
      meta: [
        { name: 'description', content: 'Welcome to my portfolio website showcasing my projects, skills, and experience.' },
        { name: 'keywords', content: 'portfolio, web developer, projects, skills' },
        // Facebook Open Graph meta tags
        { property: 'og:title', content: 'John Lerry T.' },
        { property: 'og:description', content: 'Welcome to my portfolio website showcasing my projects, skills, and experience.' },
        { property: 'og:image', content: 'https://johnlerryt.vercel.app/images/tb.jpg' },
        { property: 'og:url', content: 'https://johnlerryt.vercel.app' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'John Lerry T.' },
        { property: 'fb:app_id', content: '1086768433255411' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image', '@nuxtjs/sitemap', '@nuxt/icon'],
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
    public: {
      siteUrl: 'https://www.johnlerryt.com/',
      firebaseApiKey: process.env.FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.FIREBASE_APP_ID || ''
    }
  },
  sitemap: {
    defaults: {
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  },
  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 150,
          height: 150,
          fit: 'cover'
        }
      },
      project: {
        modifiers: {
          format: 'webp',
          width: 600,
          height: 400,
          fit: 'cover'
        }
      }
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})

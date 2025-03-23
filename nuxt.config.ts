// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true, // Explicitly enable SSR
  app: {
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
        { property: 'og:image', content: '/images/tb.jpg' }, // Replace with your actual thumbnail path
        { property: 'og:url', content: 'https://johnlerryt.vercel.app' }, // Replace with your actual domain
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'John Lerry T.' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image'],
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

<template>
  <div>
    <Navigation />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Services />
    <Contact />
    <Footer />
    <ScrollToTop />
  </div>
</template>

<script setup>
// Import components
import Navigation from '~/components/Navigation.vue'
import Hero from '~/components/Hero.vue'
import About from '~/components/About.vue'
import Skills from '~/components/Skills.vue'
import Projects from '~/components/Projects.vue'
import Services from '~/components/Services.vue'
import Contact from '~/components/Contact.vue'
import Footer from '~/components/Footer.vue'
import ScrollToTop from '~/components/ScrollToTop.vue'

// SEO Meta Tags
useHead({
  title: 'John Lerry T.',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Welcome to my portfolio website showcasing my projects, skills, and experience.' },
    { name: 'keywords', content: 'portfolio, web developer, projects, skills' },
    { property: 'og:title', content: 'John Lerry T. ' },
    { property: 'og:description', content: 'Welcome to my portfolio website showcasing my projects, skills, and experience.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>

<style>
.animate-fade-in {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
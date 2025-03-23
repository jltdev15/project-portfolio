<template>
  <div>
    <Navigation />
    <Hero />
    <About />
    <Skills />
    <Projects />
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
import Contact from '~/components/Contact.vue'
import Footer from '~/components/Footer.vue'
import ScrollToTop from '~/components/ScrollToTop.vue'
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
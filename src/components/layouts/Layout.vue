<template>
  <section>
    <Header />
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="px-4 py-8 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
    <Footer />
  </section>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

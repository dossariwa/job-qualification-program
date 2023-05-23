<script setup>
import Layout from "../components/Layout.vue";
</script>

<template>
  <main class="home-view">
    <Layout>
      <h1 :class="appClass">{{ $t("messages.content") }}</h1>
      <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
      <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
    </Layout>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  // Other component options...
};
</script>

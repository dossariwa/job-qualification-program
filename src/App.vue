<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<script>
import Wrapper from "./components/layouts/Wrapper.vue";

export default {
  name: "App",
  components: {
    Wrapper,
  },
  // Other component options...
};
</script>
<template>
  <wrapper>
    <main class="content">
      <RouterView />
    </main>
  </wrapper>
</template>

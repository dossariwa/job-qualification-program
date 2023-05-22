<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<script>
import Wrapper from "./components/Wrapper.vue";

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
    <main>
      <RouterView />
    </main>
  </wrapper>
</template>

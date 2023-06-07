<script setup></script>

<script>
import Wrapper from "./components/layouts/Wrapper.vue";

export default {
  name: "App",
  components: {
    Wrapper,
  },
};
</script>

<template>
  <wc-toast></wc-toast>
  <wrapper>
    <main class="content">
      <RouterView />
    </main>
  </wrapper>
</template>

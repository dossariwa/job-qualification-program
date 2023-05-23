<script setup>
import Layout from "../components/Layout.vue";
import Task from "../components/Task.vue";
import TaskCreate from "../components/TaskCreate.vue";
</script>

<template>
  <main class="home-view">
    <Layout>
      <TaskCreate />
    </Layout>
  </main>
</template>

<script>
export default {
  name: "TaskView",
  // Other component options...
};
</script>

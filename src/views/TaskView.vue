<script setup>
import Layout from "../components/Layout.vue";
import Task from "../components/Task.vue";
import TaskCreate from "../components/TaskCreate.vue";
import TaskSteps from "../components/TaskSteps.vue";
import Stepper from "../components/Stepper.vue";
</script>

<template>
  <main class="home-view">
    <Layout>
      <TaskSteps />
      <TaskCreate />
    </Layout>
  </main>
</template>

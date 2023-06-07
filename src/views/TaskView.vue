<script setup>
import Layout from "../components/layouts/Layout.vue";
import Task from "../components/tasks/Task.vue";
import TaskTest from "../components/tasks/TaskTest.vue";
import TaskDetail from "../components/tasks/TaskDetail.vue";
import TaskCreate from "../components/tasks/TaskCreate.vue";
import TaskForm from "../components/tasks/TaskForm.vue";
import text from "../components/text.vue";
</script>

<template>
  <main class="home-view">
    <Layout>
      <!-- <TaskForm /> -->
      <TaskTest />

      <!-- <TaskDetail /> -->
      <!-- <TaskTest /> -->
    </Layout>
  </main>
</template>

<script setup>
import Layout from "../components/layouts/Layout.vue";
import Task from "../components/tasks/Task.vue";
import TaskTest from "../components/tasks/TaskTest.vue";
import TaskDetail from "../components/tasks/TaskDetail.vue";
</script>

<template>
  <main class="home-view">
    <Layout>
      <TaskDetail />
      <TaskTest />
    </Layout>
  </main>
</template>

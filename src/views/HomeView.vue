<script setup>
import Layout from "../components/Layout.vue";
import Task from "../components/Task.vue";
import Status from "../components/Status.vue";
</script>

<template>
  <main class="home-view">
    <Layout>
      <div class="px-4 py-4 sm:px-6 justify-end items-end flex">
        <div
          class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
        >
          <div class="ml-4 mt-4 flex-shrink-0">
            <RouterLink to="/task/create">
              <button
                type="button"
                class="relative inline-flex items-center rounded-md bg-primary-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green/50"
              >
                {{ $t("actions.create new task") }}
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
      <Status />
    </Layout>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  // Other component options...
};
</script>

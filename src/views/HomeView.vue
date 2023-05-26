<script setup>
import Layout from "../components/layouts/Layout.vue";
import Task from "../components/tasks/Task.vue";
import Status from "../components/Status.vue";
import { EyeIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <main class="home-view">
    <Layout>
      <div class="px-4 py-4 sm:px-6 flex">
        <div class="flex-1 inline-flex">
          <span
            class="relative inline-block shadow-lg font-semibold text-sm bg-gray-100 rounded-r-none rounded-md px-2 py-2"
            >{{ $t("messages.there are four tasks pending") }}
            <span
              class="absolute animate-ping left-0 top-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"
            />
          </span>
          <button
            class="text-white shadow-lg inline-flex items-center justify-center font-semibold text-sm bg-primary-green/50 rounded-l-none rounded-md px-2 py-2"
          >
            <!-- {{ $t("actions.show") }} -->
            <span class="inline-flex">
              <EyeIcon
                class="h-5 w-5 text-gray-800 items-center justify-center"
              />
            </span>
          </button>
        </div>
        <RouterLink to="/task/create">
          <button
            type="button"
            class="relative inline-flex items-center rounded-md bg-primary-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green/50"
          >
            {{ $t("actions.create new task") }}
          </button>
        </RouterLink>
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

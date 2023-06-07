<template>
  <div class="mt-4">
    <!-- <h3 class="text-base font-semibold leading-6 text-gray-900">
      {{ $t("text.last 30 days") }}
    </h3> -->
    <div class="flex mb-4">
      <label for="number" class="sr-only">Badge number</label>
      <input
        type="text"
        name="number"
        id="number"
        @input="handleSearch"
        v-model="search"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-green/50 sm:text-sm sm:leading-6"
        :placeholder="$t('text.enter a badge number')"
      />
      <button
        type="submit"
        @click="handleSearch"
        class="ml-4 flex-shrink-0 rounded-md bg-primary-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green/50"
      >
        <FunnelIcon class="h-4 w-5 text-white" />
      </button>
    </div>

    <ul role="list" class="divide-y divide-gray-100">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        class="flex items-center justify-between gap-x-6 py-5"
      >
        <div class="min-w-0">
          <div class="flex items-start gap-x-3">
            <p class="text-sm font-semibold leading-6 text-gray-900">
              {{ task.badgeNumber }}
            </p>
            <p
              :class="[
                getStatusClass(task.status),
                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
              ]"
            >
              {{ getStatusMessage(task.status) }}
            </p>
          </div>
          <div
            class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
          >
            <p class="whitespace-nowrap">
              {{ $t("text.due on") }}:
              <time :datetime="task.dueDateTime">{{ task.dueDate }}</time>
            </p>
            <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <p class="truncate">
              {{ $t("text.created by") }}: {{ task.createdBy }}
            </p>
          </div>
        </div>
        <div class="flex flex-none items-center gap-x-4">
          <Menu as="div" class="relative flex-none">
            <MenuButton
              class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
            >
              <span class="sr-only">Open options</span>
              <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                    ]"
                    @click="openModal(task)"
                    >{{ $t("actions.view")
                    }}<span class="sr-only">, {{ task.badgeNumber }}</span></a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                    ]"
                    >{{ $t("actions.edit")
                    }}<span class="sr-only">, {{ task.badgeNumber }}</span></a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-secondary-red/5' : '',
                      'block px-3 py-1 text-sm leading-6 text-secondary-red',
                    ]"
                    @click="deleteTask(task)"
                  >
                    {{ $t("actions.delete")
                    }}<span class="sr-only">, {{ task.badgeNumber }}</span>
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </li>
    </ul>
    <div
      v-if="filteredTasks.length === 0"
      class="px-6 py-14 text-center text-sm sm:px-14"
    >
      <RectangleStackIcon
        class="mx-auto h-6 w-6 text-gray-400"
        aria-hidden="true"
      />
      <p class="mt-4 font-semibold text-gray-900">
        {{ $t("messages.no task found") }}
      </p>
      <p class="mt-2 text-gray-500">
        {{ $t("messages.we could not find anything with that term") }}.
        {{ $t("messages.please try again") }}
      </p>
    </div>
  </div>
  <TaskDetail
    :selectedTask="selectedTask"
    :isOpen="modalOpen"
    @update:isOpen="modalOpen = $event"
    @close="closeModal"
  />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import { FunnelIcon, RectangleStackIcon } from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";
import TaskDetail from "./tasks/TaskDetail.vue";
import Tasks from "../api/tasks/Tasks.js";
import Swal from "sweetalert2";

const tasks = ref([]);

onMounted(async () => {
  try {
    const response = await Tasks.getTasks();
    tasks.value = response.data;
    filteredTasks.value = tasks.value;
  } catch (error) {
    console.log(error);
  }
});

const { t } = useI18n();

const statuses = {
  Complete: [
    "messages.complete",
    "text-green-700 bg-green-50 ring-green-600/20",
  ],
  "In progress": [
    "messages.in progress",
    "text-gray-600 bg-gray-50 ring-gray-500/10",
  ],
  Pending: [
    "messages.pending",
    "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  ],
};

// Define helper functions to access translated status and class
const getStatusMessage = (status) => t(statuses[status][0]);
const getStatusClass = (status) => statuses[status][1];

const search = ref("");
const filteredTasks = ref([]);

function handleSearch() {
  if (!search.value) {
    filteredTasks.value = tasks.value; // Access tasks.value
  } else {
    const searchQuery = search.value.toLowerCase();
    filteredTasks.value = tasks.value.filter((task) =>
      task.badgeNumber.toLowerCase().includes(searchQuery)
    );
  }
}

watch(search, handleSearch); // Perform search on input change

handleSearch(); // Initially perform search

const selectedTask = ref(null);
const modalOpen = ref(false);

function openModal(task) {
  selectedTask.value = task;
  modalOpen.value = true;
}

function closeModal(task) {
  modalOpen.value = false;
}
// Add the deleteTask method to your script setup
async function deleteTask(task) {
  const result = await Swal.fire({
    title: t("messages.are you sure"),
    text: t("messages.you will not be able to recover this task"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#8D3F2B",
    cancelButtonColor: "#0093B2",
    confirmButtonText: t("actions.delete"),
    cancelButtonText: t("actions.cancel"),
  });

  if (result.isConfirmed) {
    // Perform the delete operation
    try {
      // Make the API request to delete the task
      await Tasks.deleteTask(task.id);

      // Remove the deleted task from the tasks array
      tasks.value = tasks.value.filter((t) => t.id !== task.id);

      Swal.fire({
        icon: "success",
        titel: t("messages.deleted"),
        text: t("messages.the task has been deleted"),
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("messages.error"),
        text: t("messages.an error occurred while deleting the task"),
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
  }
}
</script>

<style>
body {
  font-family: "Cairo", sans-serif;
}
</style>

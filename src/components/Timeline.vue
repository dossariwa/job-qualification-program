<template>
  <div class="flex">
    <div
      v-for="(task, index) in tasks"
      :key="index"
      :class="[
        'flex-1',
        'border-t-2',
        'border-gray-300',
        'py-4',
        'pr-4',
        index < completedTasks ? 'bg-green-500' : 'bg-gray-300 ',
      ]"
    >
      <div class="flex items-center">
        <div
          class="w-4 h-4 rounded-full mr-4"
          :class="{
            'bg-white': index < completedTasks,
            'bg-gray-400': index >= completedTasks,
          }"
        ></div>
        <div>
          <h3 class="text-lg font-bold">{{ task.title }}</h3>
          <p class="text-gray-700">{{ task.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          title: "Task 1",
          description: "Description for Task 1",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
        },
        {
          title: "Task 3",
          description: "Description for Task 3",
        },
        // Add more tasks as needed
      ],
      completedTasks: 1, // Number of completed tasks
    };
  },
};
</script>

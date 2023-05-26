<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Task Management System</h1>
    <form @submit.prevent="generateTask">
      <label for="badgeNumber" class="block mb-2">Badge Number:</label>
      <input
        v-model="badgeNumber"
        type="text"
        id="badgeNumber"
        class="border border-gray-300 px-2 py-1 mb-2"
      />

      <label for="selectedTask" class="block mb-2">Select a Task:</label>
      <select
        v-model="selectedTask"
        id="selectedTask"
        class="border border-gray-300 px-2 py-1 mb-2"
      >
        <option value="">-- Select Task --</option>
        <!-- Add your task options here -->
        <option>POST 1</option>
        <option>POST 2</option>
        <option>POST 3</option>
      </select>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
      >
        Generate Task
      </button>
    </form>
    <div v-if="taskGenerated" class="mt-4">
      <h2 class="text-lg font-bold mb-2">Generated Task:</h2>
      <p>Start Date: {{ startDate }}</p>
      <p>End Date: {{ endDate }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useTaskStore } from "../../stores/task";

export default defineComponent({
  name: "App",
  setup() {
    const task = useTaskStore();

    const generateTask = () => {
      // Get the entered badge number and selected task from the task
      const badgeNumber = task.badgeNumber;
      const selectedTask = task.selectedTask;

      // Perform the necessary logic to generate the task
      // For simplicity, let's assume the start date is the current date and the end date is 12 months from the start date
      const startDate = new Date().toLocaleDateString();
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      const competencyPassed = checkCompetency(badgeNumber, selectedTask); // Implement the competency check logic

      // Update the task state with the generated task
      task.startDate = startDate;
      task.endDate = endDate.toLocaleDateString();
      task.competencyPassed = competencyPassed;
      task.assessmentPassed = false; // Set initial assessment status to false
      task.taskGenerated = true;
    };

    return {
      badgeNumber: task.badgeNumber,
      selectedTask: task.selectedTask,
      startDate: task.startDate,
      endDate: task.endDate,
      taskGenerated: false,
      generateTask,
    };
  },
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

import { defineStore } from "pinia";

export const useTaskStore = defineStore({
  id: "main",
  state: () => ({
    badgeNumber: "",
    selectedTask: "",
    startDate: "",
    endDate: "",
    competencyPassed: false,
    assessmentPassed: false,
    taskGenerated: false,
  }),
});

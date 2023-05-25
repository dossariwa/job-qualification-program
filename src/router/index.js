import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TaskView.vue";
import ProfileView from "../views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/task/create",
      name: "task",
      component: TaskView,
    },
  ],
});

export default router;

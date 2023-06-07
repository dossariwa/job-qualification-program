import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TaskView.vue";
import ProfileView from "../views/ProfileView.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Upload from "../views/Upload.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
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
    {
      path: "/upload",
      name: "upload",
      component: Upload,
    },
  ],
});

export default router;

import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import { firebaseApp } from "./firebase.js";

import App from "./App.vue";
import router from "./router";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

const forceScrollbar = window.addEventListener("DOMContentLoaded", function () {
  // Add a class to force the scrollbar to be visible
  var contentElement = document.querySelector(".content");
  if (contentElement) {
    contentElement.classList.add("force-scrollbar");
  }
});

const app = createApp(App);

app.use(firebaseApp);

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language") || "en",
  messages: {
    en,
    ar,
  },
  globalInjection: true,
  fallbackLocale: "en",
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.use(forceScrollbar);

app.mount("#app");

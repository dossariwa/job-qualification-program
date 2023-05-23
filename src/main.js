import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { createAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";
import router from "./router";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

const app = createApp(App);
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
app.use(
  createAuth0({
    domain: "maaden.us.auth0.com",
    clientId: "t3BFB9FupHkGqX9O20QEuVUMNcngUrxm",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
);

app.mount("#app");

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: this.$auth0.user,
  }),
  actions: {
    login(user) {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },

    isAuth() {
      return this.user !== null;
    },
  },
});

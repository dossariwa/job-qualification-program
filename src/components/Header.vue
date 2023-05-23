<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Maaden</span>
          <img
            class="h-8 w-auto"
            src="../assets/images/maaden.png"
            alt="Maaden"
          />
        </a>
      </div>
      <div class="lg:inline hidden">
        <h1 class="font-bold text-2xl">
          {{ $t("messages.Job Qualification Program") }}
        </h1>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="text-sm font-semibold leading-6 text-gray-900"
          >{{ item.name }}</a
        >
      </div>

      <div class="flex flex-1 items-center justify-end gap-x-8">
        <div class="relative lg:inline md:inline hidden">
          <div
            class="absolute left-1/2 top-0 -ml-6 w-0.5 h-full bg-gray-200"
          ></div>
          <LanguageDropdown />
          <div
            class="absolute left-1/2 top-0 ml-5 w-0.5 h-full bg-gray-200"
          ></div>
        </div>

        <button
          v-if="!user"
          @click.prevent="login"
          class="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
        >
          {{ $t("actions.login") }}
          <span aria-hidden="true">&rarr;</span>
        </button>

        <button
          v-if="user"
          @click.prevent="logout"
          class="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
        >
          {{ $t("actions.logout") }}
        </button>
        <Dropdown v-if="user" />
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </nav>
    <Dialog
      as="div"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center gap-x-6">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Maaden</span>
            <img
              class="h-8 w-auto"
              src="../assets/images/maaden.png"
              alt="Maaden"
            />
          </a>

          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >{{ item.name }}</a
              >
            </div>
            <div class="py-6">
              <button
                @click.prevent="login"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {{ $t("actions.login") }}
              </button>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center"></div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import LanguageDropdown from "./LanguageDropdown.vue";
import Dropdown from "./Dropdown.vue";

// const navigation = [
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];

const mobileMenuOpen = ref(false);
</script>

<script>
export default {
  data() {
    return {
      user: this.$auth0.user,
    };
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },

    logout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
  },
};
</script>

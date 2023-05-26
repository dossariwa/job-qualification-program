<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Maaden</span>
          <img
            class="h-8 w-auto"
            src="../../assets/images/maaden.png"
            alt="Maaden"
          />
        </RouterLink>
      </div>
      <div class="lg:inline hidden">
        <h1 class="font-bold text-2xl">
          {{ $t("messages.Job Qualification Program") }}
        </h1>
      </div>

      <div class="flex flex-1 items-center justify-end gap-x-8">
        <div class="relative lg:inline md:inline hidden">
          <LanguageDropdown />
        </div>

        <button
          v-if="!user"
          @click.prevent="login"
          class="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
        >
          {{ $t("actions.login") }}
          <span aria-hidden="true">&rarr;</span>
        </button>

        <Menu
          as="div"
          class="relative text-left sm:hidden md:hidden lg:inline-block"
        >
          <div>
            <MenuButton
              v-if="user"
              class="inline-flex w-full justify-center gap-x-1.5 px-2 py-0.1 text-sm font-semibold lg:inline-block"
            >
              <div href="#" class="group block flex-shrink-0">
                <div class="flex items-center">
                  <div>
                    <img
                      class="inline-block h-9 w-9 rounded-full"
                      :src="user.picture"
                      alt=""
                    />
                  </div>
                  <div
                    class="ml-2 space-x-0 group block flex-shrink-0 text-start items-start justify-start"
                  >
                    <p
                      class="text-sm text-start font-medium text-gray-700 group-hover:text-gray-900"
                    >
                      {{ user.nickname }}
                    </p>
                    <p
                      class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                    >
                      {{ user.email }}
                    </p>
                  </div>
                </div>
              </div>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-50 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <RouterLink
                  @click.prevent="logout(item.id)"
                  v-for="(item, index) in navigation"
                  :key="item.id"
                  :to="item.href"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span class="mr-3 h-5 w-5">
                    <component
                      :is="item.icon"
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span>{{ $t(item.translation) }}</span>
                </RouterLink>
              </div>
            </MenuItems>
          </transition>
        </Menu>
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
              src="../../assets/images/maaden.png"
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
            <div v-if="user" class="space-y-2 py-6">
              <RouterLink
                @click.prevent="logout(item.id)"
                v-for="(item, index) in links"
                :key="item.id"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >{{ $t(item.translation) }}</RouterLink
              >
            </div>
            <div class="py-6">
              <button
                v-if="!user"
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
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import LanguageDropdown from "../LanguageDropdown.vue";

const links = [
  {
    id: 1,
    name: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
    translation: "actions.profile",
  },
  {
    id: 2,
    name: "logout",
    icon: ArrowRightOnRectangleIcon,
    translation: "actions.logout",
  },
];

const navigation = [
  {
    id: 1,
    name: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
    translation: "actions.profile",
  },
  {
    id: 2,
    name: "logout",
    href: "#",
    icon: ArrowRightOnRectangleIcon,
    translation: "actions.logout",
  },
];

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

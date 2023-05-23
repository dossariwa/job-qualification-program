<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center gap-x-1.5 px-2 py-0.1 text-sm font-semibold"
      >
        <div href="#" class="group block flex-shrink-0">
          <div class="flex items-center">
            <div>
              <img
                class="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="ml-3 flex space-x-2">
              <p
                class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
              >
                Wasmi A. Aldossari
              </p>
              <span
                class="w-4 h-4 text-gray-500 items-center text-center justify-center py-1"
              >
                <ChevronDownIcon
                  class="w-4 h-4 items-center justify-center text-center"
                />
              </span>
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
          <MenuItem v-for="nav in navigation" :key="nav.id" v-slot="{ active }">
            <button
              @click.prevent="logout(nav.id)"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : '',
                'group flex items-center px-4 py-2 text-sm w-full',
                nav.fontClass || '',
              ]"
            >
              <span class="mr-3 h-5 w-5">
                <component :is="nav.icon" class="h-5 w-5" aria-hidden="true" />
              </span>
              {{ nav.name }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

import { getUser } from "../auth/auth.js";

const navigation = [
  { id: 1, name: "Profile", icon: UserCircleIcon },
  {
    id: 2,
    name: "logout",
    icon: ArrowRightOnRectangleIcon,
  },
];
</script>

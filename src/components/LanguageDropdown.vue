<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center gap-x-1.5 px-2 py-2 text-sm font-semibold bg-gray-100 rounded-full"
      >
        <LanguageIcon class="h-4 w-4 scale-125 text-black" aria-hidden="true" />
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
          <MenuItem
            v-for="lang in languages"
            :key="lang.code"
            v-slot="{ active }"
          >
            <button
              @click.prevent="changeLocale(lang.code)"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : '',
                'group flex items-center px-4 py-2 text-sm w-full',
                lang.fontClass || '',
              ]"
            >
              <span class="mr-3 h-5 w-5">
                <component :is="lang.icon" class="h-5 w-5" aria-hidden="true" />
              </span>
              {{ lang.name }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { LanguageIcon } from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";

import UnitedStatesIcon from "../components/icons/IconUnitedStates.vue";
import SaudiArabiaIcon from "../components/icons/IconSaudiArabia.vue";

const { locale, availableLocales } = useI18n();

const languages = [
  { code: "en", name: "English", icon: UnitedStatesIcon },
  {
    code: "ar",
    name: "Arabic",
    icon: SaudiArabiaIcon,
    fontClass: "font-cairo",
  },
];

const changeLocale = (selectedLocale) => {
  localStorage.setItem("language", selectedLocale);
  locale.value = selectedLocale;
};
</script>

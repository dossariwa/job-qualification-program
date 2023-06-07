<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="lg:col-start-3 lg:row-end-1">
                <h2 class="sr-only">Summary</h2>
                <div class="rounded-lg shadow-sm ring-1 ring-gray-900/5">
                  <dl class="flex flex-wrap">
                    <div class="flex-auto pl-6 pt-6">
                      <dt class="text-sm font-semibold leading-6 text-gray-900">
                        Mobile Equipment A/C
                      </dt>
                      <dd
                        class="mt-1 text-base font-bold leading-6 text-gray-900"
                      >
                        5020445
                      </dd>
                    </div>
                    <div class="flex-none self-end px-6 pt-4">
                      <dt class="sr-only">Status</dt>
                      <dd
                        class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20"
                      >
                        In progress
                      </dd>
                    </div>
                    <div
                      class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6"
                    >
                      <dt class="flex-none">
                        <span class="sr-only">Client</span>
                        <UserCircleIcon
                          class="h-6 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd class="text-sm font-medium leading-6 text-gray-900">
                        Khalid Moushbab Sultan ALSubaie
                      </dd>
                    </div>
                    <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                      <dt class="flex-none">
                        <span class="sr-only">Status</span>
                        <AtSymbolIcon
                          class="h-6 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd class="text-sm leading-6 text-gray-500">
                        subaiekhm@maaden.com.sa
                      </dd>
                    </div>
                    <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                      <dt class="flex-none">
                        <span class="sr-only">Due date</span>
                        <CalendarDaysIcon
                          class="h-6 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd class="text-sm leading-6 text-gray-500">
                        <time datetime="2023-01-31">March 17, 2023</time>
                      </dd>
                    </div>
                  </dl>
                  <div class="mt-2 px-2 py-2" />
                </div>
              </div>
              <div
                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
              >
                <button
                  type="button"
                  class="inline-flex w-full font-cairo justify-center rounded-md bg-primary-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green/50 sm:col-start-2"
                  @click="openModal"
                >
                  {{ $t("actions.approve") }}
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full font-cairo justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  @click="closeModal"
                >
                  {{ $t("actions.cancel") }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/24/outline";
import {
  CalendarDaysIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from "@heroicons/vue/20/solid";

const open = ref(true);
const modalOpen = ref(true);

const props = defineProps({
  selectedTask: Object,
  isOpen: Boolean,
});

const { emit } = getCurrentInstance();

function openModal() {
  open.value = true;
}

const closeModal = () => {
  emit("update:isOpen", false);
};
</script>

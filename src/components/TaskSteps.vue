<template>
  <nav class="mx-auto max-w-lg mb-4" aria-label="Progress">
    <ol role="list" class="flex items-center justify-center">
      <li
        v-for="(step, stepIdx) in steps"
        :key="step.name"
        :class="[
          stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
          'relative',
        ]"
      >
        <template v-if="step.status === 'complete'">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-primary-green" />
          </div>
          <a
            href="#"
            class="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary-green"
          >
            <CheckIcon class="h-4 w-4 text-white" aria-hidden="true" />
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </template>
        <template
          v-else-if="step.status === 'current'"
          condition="step.status === 'current'"
        >
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            href="#"
            class="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-green bg-white"
            aria-current="step"
          >
            <span
              class="h-2 w-2 rounded-full bg-primary-green animate-ping"
              aria-hidden="true"
            />
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </template>
        <template v-else>
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            href="#"
            class="group relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
          >
            <span
              class="h-2 w-2 rounded-full bg-transparent group-hover:bg-gray-300"
              aria-hidden="true"
            />
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { CheckIcon } from "@heroicons/vue/20/solid";

const steps = [
  { name: "Step 1", href: "#", status: "complete" },
  { name: "Step 3", href: "#", status: "current" },
  { name: "Step 4", href: "#", status: "upcoming" },
];
</script>

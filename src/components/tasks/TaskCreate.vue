<template>
  <TaskForm />
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
        <template v-if="stepIdx <= progress">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div
              class="h-0.5 w-full"
              :class="[
                stepIdx === progress ? 'bg-primary-green' : 'bg-primary-green',
              ]"
            ></div>
          </div>
          <a
            href="#"
            class="relative flex h-6 w-6 items-center justify-center rounded-full"
            :class="[
              stepIdx === progress ? 'bg-primary-yellow' : 'bg-primary-green',
            ]"
          >
            <template v-if="stepIdx === progress && step.status === 'complete'">
              <CheckIcon class="h-4 w-4 text-white" aria-hidden="true" />
            </template>
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </template>
        <template v-else>
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-gray-200"></div>
          </div>
          <a
            href="#"
            class="group relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
          >
            <span
              class="h-2 w-2 rounded-full bg-transparent group-hover:bg-gray-300"
              aria-hidden="true"
            ></span>
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </template>
      </li>
    </ol>
  </nav>
  <div class="mx-auto max-w-lg">
    <div>
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-primary-yellow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        <h2 class="mt-2 text-base font-semibold leading-6 text-gray-900">
          {{ $t("text.add employee task") }}
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{
            $t(
              "text.you have not added any employees to the program yet as the manager of this employee you can manage employee tasks"
            )
          }}
        </p>
      </div>
      <form action="#" class="mt-6 flex">
        <label for="number" class="sr-only">Badge number</label>
        <input
          type="text"
          name="number"
          id="number"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-green/50 sm:text-sm sm:leading-6"
          :placeholder="$t('text.enter a badge number')"
        />
        <button
          @click="handleClick"
          type="submit"
          class="ml-4 flex-shrink-0 rounded-md bg-primary-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green/50"
        >
          {{ $t("actions.create task") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup></script>

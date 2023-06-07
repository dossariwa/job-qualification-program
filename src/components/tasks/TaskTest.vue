<template>
  <wc-toast></wc-toast>
  <div class="mx-auto max-w-lg mb-4 h-1/2">
    <!-- Stepper -->
    <div class="flex items-center justify-between w-50 relative z-0 mb-6">
      <div class="absolute bg-gray-300 h-1 z-[-1] left-0 right-0 mx-auto">
        <div
          class="absolute inset-0 flex items-center left-0 h-full bg-primary-green transition-all duration-500"
          :style="'width:' + stepperProgress"
        ></div>
      </div>

      <div
        class="flex flex-col items-center text-gray-300 transition-all duration-500"
        v-for="(item, index) in 3"
        :key="index"
      >
        <div
          :class="{
            'border-green-500 bg-green-500 text-white font-semibold rounded-full':
              index < step - 1,
            'border-green-500 text-white font-semibold bg-primary-green':
              index === step - 1,
          }"
          class="relative flex h-8 w-8 items-center justify-center bg-white rounded-full border-gray-300"
        >
          <transition name="checkmark-transition">
            <CheckIcon
              class="absolute transform text-primary-green w-6"
              v-if="circleStatus[index] === 'complete'"
            />
          </transition>
          <span class="text-lg transition-all duration-500">{{
            index + 1
          }}</span>
        </div>
      </div>
    </div>
    <!-- / Stepper -->

    <!-- Step 1 -->
    <div v-if="step === 1">
      <!-- Form fields for Step 1 -->
      <div
        class="rounded-xl bg-white p-3"
        :class="[
          'rounded-xl bg-white p-3',
          'ring-white ring-opacity-60 focus:outline-none ',
        ]"
      >
        <div class="mx-auto max-w-lg">
          <div>
            <div class="text-center">
              <UsersIcon class="mx-auto h-12 w-12 text-primary-yellow" />

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
            <form action="#" class="mt-6">
              <div class="grid grid-cols-1 md:grid-cols-3 md:gap-3 gap-4">
                <div class="md:col-span-3">
                  <div class="mt-1 flex">
                    <input
                      type="text"
                      name="number"
                      id="number"
                      class="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-green/50 focus:border-primary-green/50 sm:text-sm placeholder-gray-500 focus:placeholder-gray-400"
                      :placeholder="$t('text.enter a badge number')"
                    />
                  </div>
                </div>
                <div class="md:col-span-1">
                  <select
                    required
                    v-model="selectedDepartment"
                    id="department"
                    class="mt-1 block w-full py-2 px-3 border-gray-300 bg-white rounded-md shadow-sm focus:ring-primary-green/50 focus:border-primary-green/50 sm:text-sm"
                    @change="updateAreaOptions"
                  >
                    <option value="" disabled selected>
                      {{ $t("text.department") }}
                    </option>
                    <option
                      v-for="department in departmentOptions"
                      :value="department"
                      :key="department"
                      selected
                    >
                      {{ department }}
                    </option>
                  </select>
                </div>
                <div class="md:col-span-1">
                  <select
                    required
                    v-model="selectedArea"
                    id="area"
                    class="mt-1 block w-full py-2 px-3 border-gray-300 bg-white rounded-md shadow-sm focus:ring-primary-green/50 focus:border-primary-green/50 sm:text-sm"
                    @change="updateTaskOptions"
                  >
                    <option value="" disabled selected>
                      {{ $t("text.area") }}
                    </option>
                    <option
                      v-for="area in areaOptions"
                      :value="area"
                      :key="area"
                    >
                      {{ area }}
                    </option>
                  </select>
                </div>
                <div class="md:col-span-1">
                  <select
                    required
                    v-model="selectedTask"
                    id="task"
                    class="mt-1 block w-full py-2 px-3 border-gray-300 bg-white rounded-md shadow-sm focus:ring-primary-green/50 focus:border-primary-green/50 sm:text-sm"
                  >
                    <option value="" disabled selected>
                      {{ $t("text.task") }}
                    </option>
                    <option
                      v-for="task in taskOptions"
                      :value="task"
                      :key="task"
                    >
                      {{ task }}
                    </option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div v-if="step === 2">
      <div class="items-center justify-center">
        <div class="my-4 mb-6">
          <form>
            <input
              hidden
              type="file"
              name="file"
              id="file-input"
              ref="fileInput"
              class="sr-only"
              @change="uploadFile"
            />
            <label
              for="file-input"
              class="relative flex min-h-[200px] items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 p-12 text-center"
            >
              <div>
                <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                  <DocumentPlusIcon
                    class="mx-auto h-12 w-12 text-primary-yellow cursor-pointer"
                  />
                </span>
                <span class="mt-2 block text-sm font-semibold">
                  {{ $t("messages.upload the documents") }}
                </span>
                <span class="mb-2 block text-sm text-[#6B7280]">
                  {{
                    $t(
                      "messages.upload the documents assigned to your assignment as it is"
                    )
                  }}: {{ $t("text.demonstration skills") }}
                  {{ $t("text.and") }}
                  {{ $t("text.oral/presentation skills") }}
                </span>
              </div>
            </label>
          </form>

          <section class="mt-3 loading-area" v-if="showProgress">
            <li
              v-for="(file, index) in files"
              :key="index"
              class="row flex items-center justify-between p-2 mt-2 bg-primary-green/5 rounded-lg shadow-sm"
            >
              <ExcelFileIcon class="h-6 w-6 text-primary-green" />
              <div class="content">
                <div class="details">
                  <span class="name text-sm font-semibold text-gray-900">
                    {{ file.name }}
                  </span>
                  <span class="percent text-xs text-gray-500">
                    {{ file.loaded }}
                  </span>
                </div>
                <div class="loading-bar">
                  <div
                    class="loading"
                    :style="{ width: file.loading + '%' }"
                  ></div>
                </div>
              </div>
            </li>
          </section>

          <section class="uploaded-area">
            <li
              v-for="(file, index) in uploadFiles"
              :key="index"
              class="row flex items-center justify-between p-2 mt-2 bg-primary-green/5 rounded-lg shadow-sm"
            >
              <div class="content upload flex items-center justify-center">
                <ExcelFileIcon
                  class="h-6 w-6 text-primary-green items-center justify-center"
                />
                <div class="details">
                  <span class="name text-sm font-semibold text-gray-900">
                    {{ file.name }}
                  </span>
                  <span class="size text-xs text-gray-500">
                    {{ file.size }}
                  </span>
                </div>
              </div>
              <CheckCircleIcon class="h-6 w-6 text-primary-green" />
              <!-- <XCircleIcon class="h-6 w-6 text-secondary-red" /> -->
            </li>
          </section>
        </div>
        <!-- Showing while checking the competency training -->
        <!-- <div>
            <Loading class="text-gray-300" />
            {{ $t("messages.checking for competency record") }}...
          </div> -->
        <!-- / Showing while checking the competency training -->
      </div>
    </div>

    <!-- Step 3 -->
    <div v-if="step === 3">
      <!-- Form fields for Step 3 -->
      <div class="items-center justify-center">
        <div class="my-4 mb-6">
          <div class="items-center justify-center">
            <EllipsisLoader />
            <div class="items-center justify-center text-center">
              <span class="flex-col">
                <p>Please wait...</p>
                <p>Documents are now being uploaded and verified</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Buttons for navigation -->
    <div class="flex mt-6">
      <button
        v-if="step > 1 && step < 3"
        class="flex justify-center items-center px-6 py-2 border text-center select-none transition-all duration-150 rounded-md text-sm text-gray-700 bg-primary-gray hover:bg-primary-gray/90 border-gray-200"
        :class="{
          'bg-primary-green border-primary-green text-white':
            circleStatus[step - 2] === 'complete',
        }"
        @click="previousStep"
        :disabled="step === 1"
      >
        {{ $t("actions.previous") }}
      </button>

      <button
        v-if="step < 3"
        :class="{
          'flex justify-center items-center px-6 py-2 border text-center text-white select-none transition-all duration-150 rounded-md text-sm bg-primary-green hover:bg-primary-green/90 border-primary-green hover:border-primary-green/90 mx-auto ':
            step === 1,
          'flex justify-center items-center px-6 py-2 border text-center text-white select-none transition-all duration-150 rounded-md text-sm bg-primary-green hover:bg-primary-green/90 border-primary-green hover:border-primary-green/90 ml-auto':
            step !== 1,
        }"
        @click="nextStep"
      >
        {{ $t(step === 1 ? "actions.nextStep1" : "actions.next") }}
      </button>
      <button
        v-on:click="handleSuccessToast"
        v-if="step === 3"
        class="flex justify-center items-center px-6 py-2 border text-center select-none transition-all duration-150 rounded-md text-sm text-white ml-auto bg-primary-green hover:bg-primary-green/90 border-primary-green hover:border-primary-green/90 mx-auto"
        @click="finish"
      >
        {{ $t("actions.finish") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { CheckIcon, CheckCircleIcon } from "@heroicons/vue/20/solid";
import { DocumentPlusIcon } from "@heroicons/vue/24/outline";
import UsersIcon from "../icons/IconUsers.vue";
import ExcelFileIcon from "../icons/IconExcelFile.vue";
import EllipsisLoader from "../EllipsisLoader.vue";
import axios from "axios";

const departmentOptions = ref(["Operation", "Maintenance", "Technical"]); // Mock department options
const selectedDepartment = ref("");
const selectedTask = ref("");
const selectedArea = ref("");
const areaOptions = ref([]);
const taskOptions = ref([]);

const departmentTasks = {
  Operation: {
    Reduction: ["Anode Change", "Metal Tapping", "Miscellaneous"], // Mock area options for Reduction Operation
    Casthouse: ["MTV", "Casting", "Metal coordinator"], // Mock area options for Casthouse Operation
    Carbon: ["Rodding", "ABF", "Carbon A"], // Mock area options for Carbon Operation
  },
  Maintenance: {
    Reduction: ["A/C", "Hydrulic", "Maint A"], // Mock area options for Reduction Maintenance
    Casthouse: ["Alignment", "Maint B", "Electical"], // Mock area options for Casthouse Maintenance
    Carbon: ["Maint C", "Mechnical", "Maint D"], // Mock area options for Carbon Maintenance
  },
  Technical: {
    Reduction: ["Tech A", "Tech B", "Tech C"], // Mock area options for Reduction Technical
    Casthouse: ["Tech D", "Tech E", "Tech F"], // Mock area options for Casthouse Technical
    Carbon: ["Tech G", "Tech H", "Tech I"], // Mock area options for Carbon Technical
  },
};

function updateAreaOptions() {
  const areas = departmentTasks[selectedDepartment.value];
  areaOptions.value = Object.keys(areas);
  selectedArea.value = "";
  selectedTask.value = "";
  taskOptions.value = [];
}

function updateTaskOptions() {
  const tasks = departmentTasks[selectedDepartment.value][selectedArea.value];
  taskOptions.value = tasks || [];
  selectedTask.value = "";
}

watch(selectedDepartment, updateAreaOptions);
watch(selectedArea, updateTaskOptions);
</script>

<script>
import axios from "axios";
import { toast } from "wc-toast";

export default {
  data() {
    return {
      step: 1,
      files: [],
      uploadFiles: [],
      showProgress: false,
      circleStatus: ["incomplete", "incomplete", "incomplete"], // Add this line
    };
  },
  methods: {
    stepperProgress() {
      const completedSteps = this.circleStatus.filter(
        (status) => status === "complete"
      ).length;
      return ((100 / 2) * completedSteps).toFixed(2) + "%";
    },
    nextStep() {
      if (this.step < 3) {
        this.step++; // Increment step
        this.circleStatus[this.step - 1] = "complete"; // Set completion status of current step
      }
    },
    previousStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    finish() {
      // Handle form submission or finalization logic here
    },

    uploadFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      const fileName = file.name;

      const formData = new FormData();
      formData.append("file", file);
      this.files.push({ name: fileName, loading: 0 });
      this.showProgress = true;

      axios
        .post("http://localhost:3000/uploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: ({ loaded, total }) => {
            this.files[this.files.length - 1].loading = Math.floor(
              (loaded / total) * 100
            );
            if (loaded === total) {
              const fileSize =
                total < 1024
                  ? total + " KB"
                  : (loaded / (1024 * 1024)).toFixed(2) + " MB";
              this.uploadFiles.push({ name: fileName, size: fileSize });
              this.files = [];
              this.showProgress = false;
            }
          },
        })
        .catch((error) => {
          console.error(error);
          // Handle error here
        });
    },

    handleSuccessToast() {
      toast.success("Application reloaded", {
        theme: {
          type: "custom",
          style: { background: "white", color: "black" },
        },
      });
    },
  },
  computed: {
    stepperProgress() {
      return ((100 / 2) * (this.step - 1)).toFixed(2) + "%";
    },
  },
};
</script>

<style scoped>
select:required:invalid {
  color: #6b7280;
}
option[value=""][disabled] {
  display: none;
}
option {
  color: black;
}

.section .row {
  margin-bottom: 10px;
  background: #fff;
  list-style: none;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section .details span {
  font-size: 12px;
}

.loading-area .row .content {
  width: 100%;
  margin-left: 15px;
}

.loading-area .details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
}

.loading-area .content .loading-bar {
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}

.content .loading-bar .loading {
  height: 100%;
  width: 20%;
  border-radius: inherit;
  background: #006a52;
}

.uploaded-area {
  max-height: 232px;
  overflow-y: scroll;
}

.uploaded-area.onprogress {
  max-height: 150px;
}

.uploaded-area::-webkit-scrollbar {
  width: 0px;
}

.uploaded-area .row .content {
  display: flex;
  align-items: center;
}

.uploaded-area .row .details {
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}

.uploaded-area .row .details .size {
  color: #6b7280;
  font-size: 11px;
}
</style>

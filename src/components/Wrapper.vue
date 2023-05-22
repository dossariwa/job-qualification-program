<template>
  <div :class="appClass">
    <slot></slot>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "AppWrapper",
  setup() {
    const { locale } = useI18n();
    const appClass = ref("");

    // Update the appClass value based on the selected locale
    const updateAppClass = () => {
      appClass.value = locale.value === "ar" ? "font-cairo" : "";
    };

    onMounted(updateAppClass);
    watch(locale, updateAppClass);

    return {
      appClass,
    };
  },
};
</script>

<template>
  <div class="wrapper-stepper mx-auto max-w-lg">
    <div class="stepper mx-auto max-w-lg">
      <div class="stepper-progress">
        <div
          class="stepper-progress-bar"
          :style="'width:' + stepperProgress"
        ></div>
      </div>

      <div
        class="stepper-item w-16 h-16"
        :class="{ current: step == item, success: step > item }"
        v-for="item in 4"
        :key="item"
      >
        <div class="stepper-item-counter">
          <CheckIcon class="icon-success" />
          <span class="number">
            {{ item }}
          </span>
        </div>
        <span class="stepper-item-title"> Paso {{ item }} </span>
      </div>
    </div>

    <div class="stepper-content" v-for="item in 4" :key="item">
      <div class="stepper-pane" v-if="step == item">
        Estas en el paso <span class="tx-green-1">{{ item }}</span> aqui
        mostrarás el contenido :D
      </div>
    </div>

    <div class="controls">
      <button class="btn" @click="step--" :disabled="step == 1">
        Anterior
      </button>
      <button class="btn btn--green-1" @click="step++" :disabled="step == 4">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { CheckIcon } from "@heroicons/vue/24/outline";

const step = ref(1);
const stepperProgress = computed(() => (100 / 3) * (step.value - 1) + "%");
</script>

<style lang="scss" scoped>
$default: #c5c5c5;
$green-1: #75cc65;
$transition: all 500ms ease;

body {
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
  color: #ffffff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
}

.tx-green-1 {
  color: $green-1;
  font-weight: 600;
}

.wrapper-stepper {
  background-color: #fff;
  padding: 40px;
  border-radius: 32px;
  box-shadow: rgba($color: #000000, $alpha: 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 660px;
  position: relative;
  z-index: 0;
  margin-bottom: 24px;

  &-progress {
    position: absolute;
    background-color: $default;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: $green-1;
      transition: $transition;
    }
  }
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $default;
  transition: $transition;

  &-counter {
    height: 68px;
    width: 68px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid $default;
    position: relative;

    .icon-success {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      width: 24px;
      transition: $transition;
    }

    .number {
      font-size: 22px;
      transition: $transition;
    }
  }

  &-title {
    position: absolute;
    font-size: 14px;
    bottom: -24px;
  }
}

.stepper-item.success {
  .stepper-item-counter {
    border-color: $green-1;
    background-color: #c8ebc1;
    color: #fff;
    font-weight: 600;

    .icon-success {
      opacity: 1;
      transform: scale(1);
    }

    .number {
      opacity: 0;
      transform: scale(0);
    }
  }

  .stepper-item-title {
    color: $green-1;
  }
}

.stepper-item.current {
  .stepper-item-counter {
    border-color: $green-1;
    background-color: $green-1;
    color: #fff;
    font-weight: 600;
  }

  .stepper-item-title {
    color: #818181;
  }
}

.stepper-pane {
  color: #333;
  text-align: center;
  padding: 120px 60px;
  box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.09);
  margin: 40px 0;
}

.controls {
  display: flex;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  border: 1px solid;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.5;
  transition: all 150ms;
  border-radius: 4px;
  width: fit-content;
  font-size: 0.75rem;
  color: #333;
  background-color: #f0f0f0;
  border-color: #f0f0f0;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--green-1 {
    background-color: $green-1;
    border-color: $green-1;
    color: #fff;
    margin-left: auto;
  }
}
</style>

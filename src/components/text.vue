<template>
  <div class="mx-auto max-w-lg mb-4">
    <section class="step-wizard">
      <ul class="step-wizard-list">
        <li :class="{ 'step-wizard-item': true, 'current-item': step === 1 }">
          <span class="progress-count">1</span>
          <span class="progress-label">Payment Method</span>
        </li>
        <li :class="{ 'step-wizard-item': true, 'current-item': step === 2 }">
          <span class="progress-count">2</span>
          <span class="progress-label">Checkout</span>
        </li>
        <li :class="{ 'step-wizard-item': true, 'current-item': step === 3 }">
          <span class="progress-count">3</span>
          <span class="progress-label">Success</span>
        </li>
      </ul>
    </section>
    <div class="flex mt-6">
      <button
        v-if="step > 1"
        class="flex justify-center items-center px-6 py-2 border text-center select-none transition-all duration-150 rounded-md text-sm text-gray-700 bg-primary-gray hover:bg-primary-gray/90 border-gray-200"
        @click="previousStep"
      >
        Previous
      </button>
      <button
        v-if="step < 3"
        class="flex justify-center items-center px-6 py-2 border text-center text-white select-none transition-all duration-150 rounded-md text-sm bg-primary-green hover:bg-primary-green/90 border-primary-green hover:border-primary-green/90 mx-auto"
        @click="nextStep"
      >
        Next
      </button>
      <button
        v-if="step === 3"
        class="flex justify-center items-center px-6 py-2 border text-center select-none transition-all duration-150 rounded-md text-sm text-white ml-auto bg-primary-green hover:bg-primary-green/90 border-primary-green hover:border-primary-green/90 mx-auto"
        @click="finish"
      >
        Finish
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    nextStep() {
      if (this.step < 3) {
        this.step++;
      }
    },
    previousStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    finish() {
      // Handle finish logic here
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Poppins", sans-serif;
}

.step-wizard {
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.step-wizard-list {
  background: #fff;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  color: #333;
  list-style-type: none;
  border-radius: 10px;
  display: flex;
  padding: 20px 10px;
  position: relative;
  z-index: 10;
}

.step-wizard-item {
  padding: 0 20px;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 170px;
  position: relative;
}
.step-wizard-item + .step-wizard-item:after {
  content: "";
  position: absolute;
  left: 0;
  top: 19px;
  background: #21d4fd;
  width: 100%;
  height: 2px;
  transform: translateX(-50%);
  z-index: -10;
}
.progress-count {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  color: transparent;
}
.progress-count:after {
  content: "";
  height: 40px;
  width: 40px;
  background: #21d4fd;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: -10;
}
.progress-count:before {
  content: "";
  height: 10px;
  width: 20px;
  border-left: 3px solid #fff;
  border-bottom: 3px solid #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%) rotate(-45deg);
  transform-origin: center center;
}
.progress-label {
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
}
.current-item .progress-count:before,
.current-item ~ .step-wizard-item .progress-count:before {
  display: none;
}
.current-item ~ .step-wizard-item .progress-count:after {
  height: 10px;
  width: 10px;
}
.current-item ~ .step-wizard-item .progress-label {
  opacity: 0.5;
}
.current-item .progress-count:after {
  background: #fff;
  border: 2px solid #21d4fd;
}
.current-item .progress-count {
  color: #21d4fd;
}
</style>

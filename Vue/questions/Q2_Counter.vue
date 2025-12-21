<!-- Q2_Counter.vue -->
<!-- Create a Counter component with increment and decrement buttons -->

<template>
  <div class="counter">
    <h1>Counter: {{ count }}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => count.value++;
const decrement = () => count.value--;
const reset = () => count.value = 0;
</script>

<style scoped>
.counter {
  text-align: center;
  padding: 20px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #42b983;
  color: white;
}

button:hover {
  background: #359268;
}
</style>

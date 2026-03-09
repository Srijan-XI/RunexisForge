<!-- Q3_TodoApp.vue -->
<!-- Create a Todo app with add and remove functionality -->

<template>
  <div class="todo-app">
    <h1>Todo App</h1>
    <div class="input-section">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Add a new todo"
      />
      <button @click="addTodo">Add</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const todos = ref([]);
const newTodo = ref('');

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({ id: Date.now(), text: newTodo.value });
    newTodo.value = '';
  }
};

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
};
</script>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.input-section {
  margin-bottom: 20px;
}

input {
  padding: 8px;
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  margin-left: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #42b983;
  color: white;
}

button:hover {
  background: #359268;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 5px 0;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}
</style>

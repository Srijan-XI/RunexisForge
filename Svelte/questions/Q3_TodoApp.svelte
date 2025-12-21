<!-- Q3_TodoApp.svelte -->
<!-- Create a Todo app with add and remove functionality -->

<main>
  <h1>Todo App</h1>
  <div class="input-section">
    <input
      bind:value={newTodo}
      on:keydown={handleKeydown}
      placeholder="Add a new todo"
    />
    <button on:click={addTodo}>Add</button>
  </div>
  <ul>
    {#each todos as todo (todo.id)}
      <li>
        {todo.text}
        <button on:click={() => removeTodo(todo.id)}>Remove</button>
      </li>
    {/each}
  </ul>
</main>

<script>
  let todos = [];
  let newTodo = '';

  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { id: Date.now(), text: newTodo }];
      newTodo = '';
    }
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  }
</script>

<style>
  main {
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
    background: #ff3e00;
    color: white;
  }

  button:hover {
    background: #e63300;
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

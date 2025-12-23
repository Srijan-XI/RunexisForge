<!-- Q2_Counter.svelte -->
<!-- Create a Counter component with increment and decrement buttons -->

<main>
  <h1>Counter: {count}</h1>
  <button on:click={increment}>Increment</button>
  <button on:click={decrement}>Decrement</button>
  <button on:click={reset}>Reset</button>
</main>

<script>
  let count = 0;

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }

  function reset() {
    count = 0;
  }
</script>

<style>
  main {
    text-align: center;
    padding: 20px;
  }

  button {
    margin: 5px;
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #ff3e00;
    color: white;
  }

  button:hover {
    background: #e63300;
  }
</style>

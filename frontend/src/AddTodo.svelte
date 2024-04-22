<script>
  import { writable } from 'svelte/store';

  let newTodo = writable('');
  async function addTodo() {
    const title = $newTodo;
    if (title.trim() !== '') {
      const response = await fetch(`${API_URL}/todos/${title}`, {
        method: 'POST'
      });
      if (response.ok) {
        newTodo.set('');
        window.location.reload()
      }
    }
  }
</script>

<div class="add-todo">
  <input type="text" bind:value={$newTodo} placeholder="Neue aufgabe">
  <button on:click={addTodo}>Hinzufügen</button>
</div>

<style>
  .add-todo {
    display: flex;
    gap: 10px;
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  input[type="text"] {
    flex-grow: 1;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>


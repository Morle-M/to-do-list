<!-- AddTodo.svelte -->
<script>
  import { writable } from 'svelte/store';

  // Store für das Eingabefeld für das neue To-Do
  let newTodo = writable('');

  // Funktion zum Hinzufügen eines neuen To-Dos
  async function addTodo() {
    const title = $newTodo;
    if (title.trim() !== '') {
      const response = await fetch(`http://localhost:3000/todos/${title}`, {
        method: 'POST'
      });
      if (response.ok) {
        newTodo.set(''); // Eingabefeld leeren, wenn das To-Do hinzugefügt wurde
      }
    }
  }
</script>

<div>
  <input type="text" bind:value={$newTodo} placeholder="Add a new todo">
  <button on:click={addTodo}>Add</button>
</div>

<style>
  /* Stile für das Hinzufügen von To-Dos */
</style>

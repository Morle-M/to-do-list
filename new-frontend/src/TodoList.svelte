<!-- TodoList.svelte -->
<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Ein leeres Array, um die To-Dos zu speichern
  let todos = writable([]);

  // Funktion zum Abrufen der To-Dos vom Backend
  async function fetchTodos() {
    const response = await fetch('http://localhost:3000/todos');
    const data = await response.json();
    todos.set(data);
  }

  // Bei der Initialisierung der Komponente die To-Dos abrufen
  onMount(fetchTodos);
</script>

<ul>
  {#each $todos as todo}
    <li>{todo.title}</li>
  {/each}
</ul>

<style>
  /* Stile für die To-Do-Liste */
</style>

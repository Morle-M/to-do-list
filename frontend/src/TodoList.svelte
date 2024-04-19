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
  
    // Funktion zum Löschen eines To-Dos
    async function deleteTodo(todoId) {
      const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // To-Do aus der Liste entfernen
        todos.update(existingTodos => existingTodos.filter(todo => todo.todo_id !== todoId));
      }
    }
  
    // Funktion zum Aktualisieren des Namens eines To-Dos
    async function updateTodoName(todoId, newName) {
      const response = await fetch(`http://localhost:3000/todos/${todoId}/${newName}`, {
        method: 'PUT'
      });
      if (response.ok) {
        // To-Do in der Liste aktualisieren
        todos.update(existingTodos => {
          return existingTodos.map(todo => {
            if (todo.todo_id === todoId) {
                window.location.reload()
              return { ...todo, text: newName };
            } else {
                window.location.reload()
              return todo;
            }
            
          });
        });
      }
    }
  </script>
  
  <ul>
    {#each $todos as todo}
      <li class="todo-list">
        {#if todo.editMode}
          <input type="text" bind:value={todo.text} />
          <button on:click={() => updateTodoName(todo.todo_id, todo.text)}>Speichern</button>
        {:else}
          {todo.text}
          <div>
            <button on:click={() => todo.editMode = true}>Bearbeiten</button>
            <button on:click={() => deleteTodo(todo.todo_id)}>Löschen</button>
          </div>
        {/if}
      </li>
    {/each}
  </ul>
  
  <style>
    .todo-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      max-width: 800px;
      margin: auto;
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

  ul {
    padding: 0;
    list-style-type: none;
  }
</style>
  
  
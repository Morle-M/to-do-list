<script>
  export let todo;
</script>

<div>
  <input type="checkbox" bind:checked={todo.completed}>
  <span>{todo.title}</span>
  <!-- Hier könnten weitere Optionen wie Bearbeiten und Löschen des To-Dos hinzugefügt werden -->
</div>


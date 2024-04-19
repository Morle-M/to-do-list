<script>
  export let todo;
</script>

<div>
  <input type="checkbox" bind:checked={todo.completed}>
  <span>{todo.title}</span>
</div>


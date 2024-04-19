<script>
  import TodoList from './TodoList.svelte';
  import AddTodo from './AddTodo.svelte';
</script>

<main>
  <h1>My Todo App</h1>
  <TodoList />
  <AddTodo />
</main>

<style>
  h1 {
    display: flex;
    justify-content: center;
    margin: 20px;
    margin-bottom: 100px;
    font-family: fantasy;
  }
</style>

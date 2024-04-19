import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    // Hier könntest du Props übergeben, die deine To-Do-Liste benötigt
    // z.B. Daten für die initialen To-Dos
  }
});

export default app;

import { defineStore } from "pinia";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    id: 0,
    todos: [],
    newTodo: "",
    loading: false,
  }),
  actions: {
    addTodo() {
      if (this.newTodo.trim() === "") {
        alert("Please enter a todo item.");
        return;
      }
      this.todos.push({
        id: this.id++,
        text: this.newTodo,
        completed: false,
      });
      this.newTodo = "";
      alert("Todo added successfully!");
    },
    removeTodo(todoId) {
      const index = this.todos.findIndex((todo) => todo.id === todoId);
      this.todos.splice(index, 1);
      alert("Todo removed successfully!");
    },
  },
});

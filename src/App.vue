<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useTodosStore } from "./stores/todos";

const todosStore = useTodosStore();

const isDark = ref(false);

const hideCompleted = ref(false);

// Optional: saat buka ulang, baca preferensi dari localStorage
onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});

// Simpan preferensi ke localStorage setiap kali toggle
watch(isDark, (val) => {
  localStorage.setItem("theme", val ? "dark" : "light");
});

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  const html = document.documentElement;
  html.classList.toggle("dark", isDark.value);
};

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todosStore.todos.filter((t) => (t = !t.completed))
    : todosStore.todos;
});
</script>

<template>
  <main
    class="bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300 py-10"
  >
    <div
      class="max-w-xl mx-auto p-8 shadow-xl rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-colors duration-300 border border-gray-200 dark:border-gray-700"
    >
      <section class="mb-8 text-center">
        <h1 class="text-4xl font-extrabold dark:text-gray-200 text-gray-800 tracking-tight drop-shadow">
          📋 My Todo App
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-2">A simple todo app built with Vue + Pinia</p>
        <div class="text-center mt-4">
          <button
            @click="toggleDarkMode"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 transition font-medium shadow"
          >
            <span v-if="isDark">🌞</span>
            <span v-else>🌙</span>
            Toggle {{ isDark ? "Light" : "Dark" }} Mode
          </button>
        </div>
      </section>

      <section class="mb-8">
        <form @submit.prevent="todosStore.addTodo" class="flex gap-2">
          <input
            v-model="todosStore.newTodo"
            placeholder="What do you need to do?"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 text-white dark:placeholder-white placeholder-gray-900 transition-colors"
          />
          <button
            type="submit"
            class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
          >
            Add
          </button>
        </form>
      </section>

      <section>
        <ul class="space-y-3">
          <li
            v-if="filteredTodos.length === 0"
            class="text-center text-red-400 italic py-6"
          >
            No todos found.
          </li>
          <li
            v-for="(todo, index) in filteredTodos"
            :key="todo.id"
            class="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center gap-3">
              <input type="checkbox" v-model="todo.completed" class="accent-blue-600 w-5 h-5" />
              <span :class="{ 'line-through text-gray-400': todo.completed, 'font-medium': !todo.completed }">
                {{ index + 1 }}. {{ todo.text }}
              </span>
            </div>
            <button
              @click="todosStore.removeTodo(todo.id)"
              class="text-red-500 hover:text-red-700 font-bold text-lg transition"
              title="Delete"
            >
              ✕
            </button>
          </li>
        </ul>

        <div v-if="todosStore.todos.length > 0" class="mt-6 text-center">
          <button
            @click="hideCompleted = !hideCompleted"
            class="text-blue-600 dark:text-blue-300 hover:underline text-sm font-medium"
          >
            {{
              hideCompleted ? "Show completed todos" : "Hide completed todos"
            }}
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

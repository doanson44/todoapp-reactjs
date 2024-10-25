import { create } from "zustand";
import { produce } from "immer";

const getTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const useTodoStore = create((set) => ({
  todos: getTodosFromLocalStorage(),
  filter: "all",

  addTodo: (text) =>
    set(
      produce((state) => {
        state.todos.push({ id: Date.now(), text, completed: false });
        saveTodosToLocalStorage(state.todos);
      })
    ),

  toggleTodo: (id) =>
    set(
      produce((state) => {
        const todo = state.todos.find((todo) => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
          saveTodosToLocalStorage(state.todos);
        }
      })
    ),

  deleteTodo: (id) =>
    set(
      produce((state) => {
        state.todos = state.todos.filter((todo) => todo.id !== id);
        saveTodosToLocalStorage(state.todos);
      })
    ),

  toggleAllTodos: () =>
    set(
      produce((state) => {
        const allCompleted = state.todos.every((todo) => todo.completed);
        state.todos.forEach((todo) => (todo.completed = !allCompleted));
        saveTodosToLocalStorage(state.todos);
      })
    ),

  clearCompleted: () =>
    set(
      produce((state) => {
        state.todos = state.todos.filter((todo) => !todo.completed);
        saveTodosToLocalStorage(state.todos);
      })
    ),

  setFilter: (filter) =>
    set(
      produce((state) => {
        state.filter = filter;
      })
    ),
}));

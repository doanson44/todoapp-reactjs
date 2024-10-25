import React, { useMemo, useState, useCallback } from "react";
import { useTodoStore } from "../helpers/store";

const TodoApp = () => {
  const [newTodo, setNewTodo] = useState("");

  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleAllTodos = useTodoStore((state) => state.toggleAllTodos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const setFilter = useTodoStore((state) => state.setFilter);

  const handleInputChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const handleAddTodo = useCallback(() => {
    if (newTodo.trim() !== "") {
      addTodo(newTodo);
      setNewTodo("");
    }
  }, [newTodo, addTodo]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleAddTodo();
      }
    },
    [handleAddTodo]
  );

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case "active":
          return !todo.completed;
        case "completed":
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">todos</h1>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="input-group mb-3">
            <span className="input-group-text" onClick={toggleAllTodos}>
              <i className="fa-solid fa-check-double"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" onClick={handleAddTodo}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <ul className="list-group">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`list-group-item d-flex align-items-center ${
                  todo.completed ? "list-group-item-success" : ""
                }`}
              >
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  className="flex-grow-1"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <i className="fa fa-remove" />
                </button>
              </li>
            ))}
          </ul>

          {todos.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="text-muted">
                {todos.filter((todo) => !todo.completed).length} items left
              </span>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${
                    filter === "all" ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filter === "active" ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => setFilter("active")}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filter === "completed"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </button>
              </div>
              <button
                className="btn btn-link text-danger"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleAllTodos = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    setTodos(
      todos.map((todo) => ({
        ...todo,
        completed: !allCompleted
      }))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

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
            <button className="btn btn-primary" onClick={addTodo}>
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
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <i className="fa fa-remove"/>
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
                    filter === "active"
                      ? "btn-primary"
                      : "btn-outline-secondary"
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
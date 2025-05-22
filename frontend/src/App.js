import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TodoItem from "./components/TodoItem.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [message, setMessage] = useState("");

  const API_BASE = "http://localhost:4000"; // change if needed

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(`${API_BASE}/todos`);
    setTodos(res.data.Data);
  };

  const addTodo = async () => {
    if (!taskInput.trim()) return;
    await axios.post(`${API_BASE}/todos`, { task: taskInput });
    setTaskInput("");
    fetchTodos();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_BASE}/todos_status/${id}`, { status });
    fetchTodos();
  };

  const updateTask = async (id, updateTask) => {
    await axios.put(`${API_BASE}/todos/${id}`, { task: updateTask });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_BASE}/todos/${id}`);
    fetchTodos();
  };

  const summarizeTodos = async () => {
    setMessage("Generating summary...");
    try {
      await axios.post(`${API_BASE}/summarize`);
      setMessage("Summary sent to Slack!");
    } catch (err) {
      setMessage("Failed to send summary.");
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo Summary Assistant</h1>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {Array.isArray(todos) && todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onStatusChange={updateStatus}
            onUpdate={updateTask}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      <button className="summary-button" onClick={summarizeTodos}>
        Generate & Send Summary to Slack
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

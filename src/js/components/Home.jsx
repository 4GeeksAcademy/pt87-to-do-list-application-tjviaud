import React, { useEffect, useState } from "react";
const Home = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const loadUser = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/tj");
    if (!response.ok) {
      await fetch("https://playground.4geeks.com/todo/users/tj", { method: "POST" });
      return;
    }
    const data = await response.json();
    setTask(data.todos);
  };
  useEffect(() => {
    loadUser();
  }, []);
  const addTask = async (event) => {
    if (event.key === "Enter" && newTask.trim() !== "") {
      const newTaskObject = { label: newTask, is_done: false };
      const response = await fetch("https://playground.4geeks.com/todo/todos/tj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskObject),
      });
      const data = await response.json();
      // Changed: update the list state (not the input) and use functional form so React re-renders immediately.
      setTask((prev) => [...prev, data]);
      // Clear the input after adding.
      setNewTask("");
    }
  };
  const deleteTask = async (taskId) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, { method: "DELETE" });
      // Changed: functional update to remove the item from state without stale closures.
      setTask((prev) => prev.filter((t) => taskId !== t.id));
    } catch (error) {
      console.error("error deleting task", error);
    }
  };
  return (
    <div className="todo-container">
      <h1 className="title">To do list</h1>
      <input
        type="text"
        placeholder="Add a task and click enter"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={addTask}
        className="task-input"
      />
      <ul className="task-list">
        {task.length === 0 ? (
          <li className="no-tasks">No tasks</li>
        ) : (
          // Changed: use API id as key to keep list stable.
          task.map((t) => (
            <li key={t.id} className="task-item">
              {t.label}
              <button className="delete-button" onClick={() => deleteTask(t.id)}>
                ✖
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default Home;
Collapse
















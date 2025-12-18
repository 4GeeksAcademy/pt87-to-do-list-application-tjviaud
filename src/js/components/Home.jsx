import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  
  const loadUser=async() => {
    const response=await fetch ("https://playground.4geeks.com/todo/users/tj")
    if (!response.ok) {
      const response=await fetch ("https://playground.4geeks.com/todo/users/tj",{method:"post"})
      return 
    }
    const data=await response.json()
    setTask(data.todos)
  }
  useEffect(()=>{loadUser()},[])
  const addTask=async(event)=>{
    if (event.key ==="Enter"&& newTask.trim()!=="") {
      const newTaskObject= {label:newTask,is_done:false};

      const response=await fetch("https://playground.4geeks.com/todo/todos/tj", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTaskObject),
      });
      const data=await response.json ();
      setNewTask([...task,data]);
      setNewTask("");
    }
  };
  const deleteTask=async(taskId)=>{
    try{await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`,
      {method:"delete"}
    );
    setTask(task.filter((task)=> taskId !== task.id));
    console.log(`task with id ${taskId} deleted`);
  }catch (error) {console.error("error deleting task", error);}
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
          task.map((task, index) => (
            <li key={index} className="task-item">
              {task.label}
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                ✖
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
export default Home;

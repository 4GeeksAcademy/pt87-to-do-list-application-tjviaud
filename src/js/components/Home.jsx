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
    <div className="container">
      <h1>My ToDo List</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setTask(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setNewTask(todos.concat(inputValue));
                setTask("");
              }
            }}
            placeholder="Add a task"
            
          ></input>
          
        </li>
        {visibleTodos.map((item, index) => (
          <li>
            {item}{" "}
            <i
              class="fas fa-trash-alt"
              onClick={() =>
                setNewTask(
                  todos.filter((t, currentIndex) => index != currentIndex)
                )
              }
            ></i>
          </li>
        ))}
      </ul>
      <div className="Counters">
      <p>Total tasks: {todos.length}</p>
      <p>Visible tasks: {visibleTodos.length}</p>
      {hiddenCount > 0 && <p>{hiddenCount} tasks hidden</p>}</div>
    </div>
  );
};

export default Home;

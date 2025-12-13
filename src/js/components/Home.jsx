import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  

  const visibleTodos=todos.slice(-5);
  const hiddenCount=Math.max(todos.length - visibleTodos.length, 0);
  return (
    <div className="container">
      <h1>My ToDo List</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setTodos(todos.concat(inputValue));
                setInputValue("");
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
                setTodos(
                  todos.filter((t, currentIndex) => index != currentIndex)
                )
              }
            ></i>
          </li>
        ))}
      </ul>
      <div className="Counters">
      <p>total tasks: {todos.length}</p>
      <p>visible tasks: {visibleTodos.length}</p>
      {hiddenCount > 0 && <p>{hiddenCount} tasks hidden</p>}</div>
    </div>
  );
};

export default Home;

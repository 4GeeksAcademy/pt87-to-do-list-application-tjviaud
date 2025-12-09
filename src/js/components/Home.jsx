import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

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
				}
            }}
            placeholder="Add a task"></input>
        </li>
		{todos.map((t) => (
		<li>
          Pack for trip <i class="fa-solid fa-x"></i>
        </li>
		))}
		
      </ul>
      <div>10 tasks</div>
    </div>
  );
};  
       
        

export default Home;

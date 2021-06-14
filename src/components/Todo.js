import React, { useState } from "react";
import Timer from "./Timer";

let min = 1;
let sec = 10;

const Todo = ({ text, todo, todos, setTodos }) => {
  const [cnt, setCnt] = useState(0); //tomato cnt
  const [isActive, setIsActive] = useState(false);
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };
  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };
  const TimerHandler = () => {
    console.log("change active");
    setIsActive(!isActive);
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {text}
      </li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button
        onClick={() => {
          if (window.confirm("Delete the item?")) {
            deleteHandler();
          }
        }}
        className="trash-btn"
      >
        <i className="fas fa-trash"></i>
      </button>
      <button
        onClick={TimerHandler}
        className={`timer-btn ${isActive ? "actived" : ""}`}
      >
        <i className="fas fa-clock">
          <span className="text_bottom">&nbsp; {cnt} </span>
        </i>
      </button>
      <li className="todo-item">
        <Timer
          initialMinute={min}
          initialSeconds={sec}
          isActive={isActive}
          cnt={cnt}
          setCnt={setCnt}
          setIsActive={setIsActive}
        />
      </li>
    </div>
  );
};

export default Todo;

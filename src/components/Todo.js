import React, { useState } from "react";
import Timer from "./Timer";

let min = 0;
let sec = 5;

const Todo = ({ text, todo, todos, setTodos, focusMode, setFocusMode }) => {
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
    // time start
    setIsActive(!isActive);
    setFocusMode(true);
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            active: true,
          };
        }
        return item;
      })
    );
  };

  const TimeUpHandler = () => {
    // time end
    setIsActive(false);
    setFocusMode(false);
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            active: false,
          };
        }
        return item;
      })
    );
  };

  if (!focusMode) {
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
      </div>
    );
  } else {
    // focus mode
    return (
      <div className="todo">
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {text}
        </li>
        <button
          onClick={TimerHandler}
          className={`timer-btn ${isActive ? "actived" : ""}`}
        >
          <i className="fas fa-clock">
            <span className="text_bottom">&nbsp; {cnt} </span>
          </i>
        </button>
        <Timer
          initialMinute={min}
          initialSeconds={sec}
          isActive={isActive}
          cnt={cnt}
          setCnt={setCnt}
          setIsActive={setIsActive}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          TimeUpHandler={TimeUpHandler}
        />
      </div>
    );
  }
};

export default Todo;

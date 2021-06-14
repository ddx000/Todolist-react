import React, { useState } from "react";
import Timer from "./Timer";

let min = 0;
let sec = 5;

const Todo = ({
  text,
  todo,
  todos,
  todoCnt,
  setTodos,
  focusMode,
  setFocusMode,
}) => {
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

  const countHandler = () => {
    console.log("djkfko");
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            cnt: todo.cnt + 1,
          };
        }
        return item;
      })
    );
  };

  const statusHandler = (status) => {
    // status == true or false
    setIsActive(status);
    setFocusMode(status);
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            active: status,
          };
        }
        return item;
      })
    );
  };

  if (!focusMode) {
    // LIST MODE
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
          onClick={() => statusHandler(true)}
          className={`timer-btn ${isActive ? "actived" : ""}`}
        >
          <i className="fas fa-clock">
            <span className="text_bottom">{todoCnt}</span>
          </i>
        </button>
      </div>
    );
  } else {
    // FOCUS MODE
    return (
      <div className="todo">
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {text}
        </li>
        <button
          onClick={() => statusHandler(true)}
          className={`timer-btn ${isActive ? "actived" : ""}`}
        >
          <i className="fas fa-clock">
            <span className="text_bottom">&nbsp; {todoCnt} </span>
          </i>
        </button>
        <Timer
          initialMinute={min}
          initialSeconds={sec}
          isActive={isActive}
          cnt={todoCnt}
          countHandler={countHandler}
          setIsActive={setIsActive}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          statusHandler={statusHandler}
        />
      </div>
    );
  }
};

export default Todo;

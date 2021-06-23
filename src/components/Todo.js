import React from "react";
import Timer from "./Timer";
import { Draggable } from "react-beautiful-dnd";

let sec = 0;

const Todo = ({
  text,
  todo,
  todos,
  setTodos,
  focusMode,
  setFocusMode,
  mins,
  index,
  todoActive,
}) => {
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
    setFocusMode(!focusMode);
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            active: !todo.active,
          };
        }
        return item;
      })
    );
  };

  const TimeUpHandler = () => {
    // time end
    setFocusMode(false);
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            active: false, // set active to false
            cnt: todo.cnt + 1, // add cnt
          };
        }
        return item;
      })
    );
  };

  if (!focusMode) {
    return (
      <Draggable key={index} draggableId={index + " "} index={index}>
        {(provided) => (
          <div
            className="todo"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
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
              className={`timer-btn ${todoActive ? "actived" : ""}`}
            >
              <i className="fas fa-clock">
                <span className="text_bottom">&nbsp; {todo.cnt} </span>
              </i>
            </button>
          </div>
        )}
      </Draggable>
    );
  } else {
    // focus mode, only show one item
    return (
      <div className="todo">
        <Timer
          initialMinute={mins}
          initialSeconds={sec}
          todoActive={todoActive}
          TimeUpHandler={TimeUpHandler}
        />
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {text}
        </li>
        <button
          onClick={TimerHandler}
          className={`timer-btn ${todoActive ? "actived" : ""}`}
        >
          <i className="fas fa-clock">
            <span className="text_bottom"> Give Up </span>
          </i>
        </button>
      </div>
    );
  }
};

export default Todo;

import React from "react";
import Todo from "./Todo";

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  focusMode,
  setFocusMode,
  mins,
}) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            text={todo.text}
            todos={todos}
            todo={todo}
            setTodos={setTodos}
            focusMode={focusMode}
            setFocusMode={setFocusMode}
            mins={mins}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

import React from "react";
import Todo from "./Todo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  focusMode,
  setFocusMode,
  mins,
}) => {
  const onDragEnd = (result) => {
    console.log("onDragEnd", result);
    const { destination, source, reason } = result;
    // Not a thing to do...
    if (!destination || reason === "CANCEL") {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todo-container">
        <ul className="todo-list">
          <Droppable droppableId="dp1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filteredTodos.map((todo, index) => (
                  <Todo
                    key={todo.id}
                    text={todo.text}
                    todos={todos}
                    todo={todo}
                    setTodos={setTodos}
                    focusMode={focusMode}
                    setFocusMode={setFocusMode}
                    mins={mins}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      </div>
    </DragDropContext>
  );
};

export default TodoList;

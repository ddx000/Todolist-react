import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
//import InputNumber from "react-input-number";

import InputNumber from "rc-input-number";

import Form from "./components/Form";
import TodoList from "./components/ToDoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [focusMode, setFocusMode] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [mins, setMins] = useState(25);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, focusMode]);

  const filterHandler = () => {
    switch (focusMode) {
      case true:
        setFilteredTodos(todos.filter((todo) => todo.active === true));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>DDX ToDo List</h1>
      </header>
      <InputNumber
        defaultValue={25}
        min={10}
        max={50}
        step={5}
        placeholder={"Minutes"}
        onChange={setMins}
      />

      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos} // for render
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        mins={mins}
      />
    </div>
  );
}

export default App;

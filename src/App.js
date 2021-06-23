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
    console.log("getLocalTodos");
    getLocalTodos();
  }, []);

  useEffect(() => {
    console.log("saveLocalTodos");
    filterHandler();
    saveLocalTodos();
  }, [todos, focusMode]);

  const filterHandler = () => {
    switch (focusMode) {
      case true:
        console.log("filter by true");
        setFilteredTodos(todos.filter((todo) => todo.active === true));
        console.log(filteredTodos);
        break;
      default:
        console.log("filter by default");
        setFilteredTodos(todos);
        console.log(filteredTodos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("focusmode", focusMode);
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
      localStorage.setItem("focusmode", false);
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
      setFocusMode(localStorage.getItem("focusmode"));
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

      {!focusMode && (
        <Form
          inputText={inputText}
          todos={todos}
          setTodos={setTodos}
          setInputText={setInputText}
        />
      )}
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

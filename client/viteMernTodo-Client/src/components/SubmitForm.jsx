// import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

function SubmitForm({ getAllTodos }) {
  const [toDo, setToDo] = useState({
    todo: "",
    isCompleted: false,
  });

  function handleInputChange(e) {
    setToDo({ ...toDo, todo: e.target.value });  
  }


  const addNewTodo = async () => {
    if (!toDo.todo.trim()) {
      alert("Cannot add empty todo!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/todo/create", {
        todo: toDo.todo,
      });
      setToDo({ todo: "", isCompleted: false });
      getAllTodos();
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  return (
    <div className="flex justify-center bg-sky-200">
      <input
        type="text"
        placeholder="Add a task..."
        onChange={handleInputChange}
        value={toDo.text} className="bg-gray-100 border border-gray-500 focus:border-2 focus:border-blue-500 focus:outline-none p-2 text-sm rounded-lg m-2.5 w-100 p-2.5 shadow-md"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2.5 px-3 rounded" onClick={addNewTodo}>Add</button>
    </div>
  );
}

SubmitForm.propTypes = {
  getAllTodos: PropTypes.func.isRequired,
};

export default SubmitForm;

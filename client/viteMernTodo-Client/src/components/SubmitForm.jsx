import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Plus } from "lucide-react";

function SubmitForm({ getAllTodos }) {
  const [toDo, setToDo] = useState({
    todo: "",
    isCompleted: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(e) {
    setToDo({ ...toDo, todo: e.target.value });  
  }

  const addNewTodo = async () => {
    if (!toDo.todo.trim()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/todo/create", {
        todo: toDo.todo,
      });
      setToDo({ todo: "", isCompleted: false });
      getAllTodos();
    } catch (error) {
      console.log("Error adding todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNewTodo();
    }
  };

  return (
    <div className="submit-form">
      <div className="submit-form-container">
        <input
          type="text"
          placeholder="Add a new task..."
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={toDo.todo}
          className="submit-input"
          disabled={isLoading}
        />
        <button 
          className="submit-button"
          onClick={addNewTodo}
          disabled={isLoading || !toDo.todo.trim()}
        >
          {isLoading ? (
            <div className="submit-button-spinner" />
          ) : (
            <Plus />
          )}
        </button>
      </div>
    </div>
  );
}

SubmitForm.propTypes = {
  getAllTodos: PropTypes.func.isRequired,
};

export default SubmitForm;
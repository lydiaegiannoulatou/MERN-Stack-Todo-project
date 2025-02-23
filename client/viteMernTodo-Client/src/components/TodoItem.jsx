import axios from "axios";
import PropTypes from "prop-types";
import 'material-icons/iconfont/material-icons.css';

function TodoItem({ getAllTodos, todos }) {
  console.log(todos);

  async function deleteTodo(id) {
    try {
      await axios.delete(`http://localhost:5000/todo/delete/${id}`);
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
    getAllTodos();
  }

  async function updateTodo(id) {
    // Add your logic to update a todo item here
    const newTodo = prompt("Enter new todo text:");
    if (newTodo && newTodo.trim() !== "") {
      try {
        await axios.put(`http://localhost:5000/todo/update/${id}`, {
          todo: newTodo,
        });
        getAllTodos(); // Fetch updated list
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      console.log("Invalid text");
    }
  }

  function toggleStatus(id) {
    const todo = todos.find((todo) => todo._id === id);

    if (todo) {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      axios
        .put(`http://localhost:5000/todo/update/${id}`, updatedTodo)
        .then(() => getAllTodos()) // Fetch updated todos
        .catch((err) => console.error("Error updating todo status", err));
    }
  }

  return (
    <div className=" flex flex-col items-center mt-5 ">
      {todos.map((task) => (
        <div
          key={task._id}
          className="flex items-center justify-between bg-amber-100 border-b min-w-9/10 max-w-9/10"
        >
          <input
          className="mx-5"
            type="checkbox"
            onChange={() => toggleStatus(task._id)}
            checked={task.isCompleted}
          />
          <span
            className={task.isCompleted ? "line-through text-gray-500" : ""}
          >
            {task.todo}
          </span>
          <div>
            <button onClick={() => deleteTodo(task._id)}>
              <i className="material-icons">delete</i>
            </button>
            <button className="p-2 mx-5" onClick={() => updateTodo(task._id)}>
            <i className="material-icons">edit</i></button>
          </div>
        </div>
      ))}
    </div>
  );
}

TodoItem.propTypes = {
  getAllTodos: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
};

export default TodoItem;

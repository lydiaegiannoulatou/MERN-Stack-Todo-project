import SubmitForm from "./components/SubmitForm";
import TodoList from "./components/TodoList";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [todos, setTodos] = useState([]);

  // Function to get all the tasks from the database
  async function getAllTodos() {
    // Your code to fetch todos from the database should go here
    try {
      let res = await axios.get("http://localhost:5000/todo");
        
      setTodos(res.data.todos);

    } catch (error) {
      console.log(error);
    }
  }

  // Render all the tasks on the screen once you open the app
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="App ">
      <h1 className="mt-10 mb-5 flex justify-center text-2xl">My Todo App</h1>
      <SubmitForm getAllTodos={getAllTodos} />
      <TodoList todos={todos} getAllTodos={getAllTodos} />
    </div>
  );
}

export default App;

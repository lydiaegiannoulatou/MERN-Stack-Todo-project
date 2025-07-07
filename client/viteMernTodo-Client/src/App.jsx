import SubmitForm from "./components/SubmitForm";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  // Function to get all the tasks from the database
  async function getAllTodos() {
    try {
      setError(null);
      let res = await axios.get("http://localhost:5000/todo");
      setTodos(res.data.todos || []);
    } catch (error) {
      console.log(error);
      setError("Unable to load tasks");
    } finally {
      setIsLoading(false);
    }
  }

  // Render all the tasks on the screen once you open the app
  useEffect(() => {
    getAllTodos();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className={`app-container ${isDark ? 'dark' : ''}`}>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      
      <div className="app-content">
        {/* Header */}
        <div className="app-header">
          <h1 className="app-title">Today</h1>
          <p className="app-date">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {error && (
          <div className="error-container">
            <p className="error-text">{error}</p>
            <button 
              onClick={getAllTodos}
              className="error-button"
            >
              Try again
            </button>
          </div>
        )}

        <SubmitForm getAllTodos={getAllTodos} />
        <TodoList todos={todos} getAllTodos={getAllTodos} />
      </div>
    </div>
  );
}

export default App;
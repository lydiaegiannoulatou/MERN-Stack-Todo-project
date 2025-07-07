import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Trash2, Edit3, Check, X } from "lucide-react";

function TodoItem({ getAllTodos, todos }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (id, isLoading) => {
    setLoadingStates(prev => ({ ...prev, [id]: isLoading }));
  };

  async function deleteTodo(id) {
    setLoading(id, true);
    try {
      await axios.delete(`http://localhost:5000/todo/delete/${id}`);
      getAllTodos();
    } catch (error) {
      console.log("Error deleting todo:", error);
    } finally {
      setLoading(id, false);
    }
  }

  function startEdit(id, currentText) {
    setEditingId(id);
    setEditText(currentText);
  }

  async function saveEdit(id) {
    if (!editText.trim()) return;
    
    setLoading(id, true);
    try {
      await axios.put(`http://localhost:5000/todo/update/${id}`, {
        todo: editText,
      });
      setEditingId(null);
      setEditText("");
      getAllTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(id, false);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  async function toggleStatus(id) {
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) return;

    setLoading(id, true);
    try {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      await axios.put(`http://localhost:5000/todo/update/${id}`, updatedTodo);
      getAllTodos();
    } catch (err) {
      console.error("Error updating todo status", err);
    } finally {
      setLoading(id, false);
    }
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <div className="empty-state-icon-inner"></div>
        </div>
        <p className="empty-state-text">
          No tasks yet. Add one above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="todo-items">
      {todos.map((task, index) => (
        <div
          key={task._id}
          className={`todo-item ${task.isCompleted ? 'completed' : ''}`}
          style={{
            animationDelay: `${index * 100}ms`,
            animation: 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* Checkbox */}
          <button
            onClick={() => toggleStatus(task._id)}
            disabled={loadingStates[task._id]}
            className={`todo-checkbox ${task.isCompleted ? 'completed' : ''}`}
          >
            {loadingStates[task._id] ? (
              <div className="todo-checkbox-spinner" />
            ) : task.isCompleted ? (
              <Check />
            ) : null}
          </button>

          {/* Content */}
          <div className="todo-content">
            {editingId === task._id ? (
              <div className="todo-edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') saveEdit(task._id);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  className="todo-edit-input"
                  autoFocus
                />
                <button
                  onClick={() => saveEdit(task._id)}
                  disabled={loadingStates[task._id]}
                  className="todo-edit-button save"
                >
                  <Check />
                </button>
                <button
                  onClick={cancelEdit}
                  className="todo-edit-button cancel"
                >
                  <X />
                </button>
              </div>
            ) : (
              <p className={`todo-text ${task.isCompleted ? 'completed' : ''}`}>
                {task.todo}
              </p>
            )}
          </div>

          {/* Actions */}
          {editingId !== task._id && (
            <div className="todo-actions">
              <button
                onClick={() => startEdit(task._id, task.todo)}
                className="todo-action-button edit"
              >
                <Edit3 />
              </button>
              <button
                onClick={() => deleteTodo(task._id)}
                disabled={loadingStates[task._id]}
                className="todo-action-button delete"
              >
                {loadingStates[task._id] ? (
                  <div className="todo-action-spinner" />
                ) : (
                  <Trash2 />
                )}
              </button>
            </div>
          )}
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
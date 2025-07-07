import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

function TodoList({ todos, getAllTodos }) {
  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;

  return (
    <div>
      {/* Simple Stats */}
      {totalCount > 0 && (
        <div className="todo-stats">
          <p className="todo-stats-text">
            {completedCount} of {totalCount} completed
          </p>
        </div>
      )}

      {/* Todo Items */}
      <TodoItem todos={todos} getAllTodos={getAllTodos} />
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  getAllTodos: PropTypes.func.isRequired,
};

export default TodoList;
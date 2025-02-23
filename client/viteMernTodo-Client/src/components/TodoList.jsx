import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

function TodoList({ todos, getAllTodos }) {
  return (
    <>
      <div>
        {/* Render the TodoItem component with todos and getAllTodos function */}
        <TodoItem todos={todos} getAllTodos={getAllTodos} />
      </div>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  getAllTodos: PropTypes.func.isRequired,
};

export default TodoList;
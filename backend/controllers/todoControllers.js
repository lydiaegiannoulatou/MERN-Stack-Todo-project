const Todo = require("../Models/todoModel");

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.send({todos:allTodos});
    console.log(req.body)
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
};

const addTodo = async (req, res) => {
  try {
    console.log("Received:", req.body);
    if (typeof req.body.todo !== "string" || req.body.todo.trim() === "") {
      return res.status(400).json({ error: "Todo text is required" });
    }
    let newTodo = new Todo(req.body);
    await newTodo.save();
    res.send(newTodo);
  } catch (error) {
    res.status(500).send({ error: "Failed to create a new todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const isTodoFound = await Todo.findOne({ _id: req.params.id });
    if (isTodoFound) {
      await Todo.deleteOne({ _id: req.params.id });
      res.send(`Todo deleted successfully`);
    } else {
      res.status(404).send({ msg: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedTodo) {
      res.json({ message: "Todo updated successfully", updatedTodo });
;
    } else {
      res.status(404).send({ msg: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = { getAllTodos, addTodo, deleteTodo, updateTodo };

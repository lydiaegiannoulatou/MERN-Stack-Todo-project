const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const main = require("./config/connection");
const todoRoutes = require("./routes/todoRoutes");
const {
  getAllTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("./controllers/todoControllers");

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Server starts listening on port ${port}`);
});

const express = require("express");
const router = express.Router();
const {
    getAllTodos,
    addTodo,
    deleteTodo,
    updateTodo,
  } = require("../controllers/todoControllers");
  
router.get("/", getAllTodos);
router.post("/create", addTodo);
router.delete("/delete/:id", deleteTodo);
router.put("/update/:id", updateTodo);

module.exports = router;

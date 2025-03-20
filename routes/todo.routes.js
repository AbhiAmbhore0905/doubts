const { addTodo, getTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller")

const router = require("express").Router()

router
.get("/get", getTodo)
.post("/add", addTodo)
.patch("/update/:tid", updateTodo)
.delete("/delete/:tid", deleteTodo)

module.exports = router
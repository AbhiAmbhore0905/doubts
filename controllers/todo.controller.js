const Todo = require("../models/Todo")

exports.addTodo = async (req, res) => {
    try {
        await Todo.create(req.body)
        res.json({messgae : "add todo success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({
             message: "unable to add todo ",
            error: error.message})
    }
}
exports.getTodo = async (req, res) => {
    try {
        const data = await Todo.find(req.body)
        res.json({messgae : "get todo success", data})
    } catch (error) {
        console.log(error)
        res.status(500).json({
             message: "unable to get todo ",
            error: error.message})
    }
}
exports.updateTodo = async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.tid , req.body)
        res.json({messgae : "update todo success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({
             message: "unable to update todo ",
            error: error.message})
    }
}
exports.deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.tid)
        res.json({messgae : "delete todo success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({
             message: "unable to delete todo ",
            error: error.message})
    }
}
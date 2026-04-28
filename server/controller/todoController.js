const Todo = require("../models/Todo");

// GET all
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// CREATE
exports.createTodo = async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
};

// UPDATE
exports.updateTodo = async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// TOGGLE DONE
exports.toggleDone = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.done = !todo.done;
  await todo.save();
  res.json(todo);
};

// DELETE
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

exports.addTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ userId: req.user.id, title, description });
  await task.save();
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ msg: "Task deleted" });
};

import Task from "../models/Task.js";

// Smart priority
const calculatePriority = (deadline) => {
  const daysLeft =
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24);

  if (daysLeft <= 1) return "high";
  if (daysLeft <= 3) return "medium";
  return "low";
};

// CREATE TASK
export const createTask = async (req, res) => {
  const { title, deadline } = req.body;

  const priority = calculatePriority(deadline);

  const task = await Task.create({
    userId: req.user.id,
    title,
    deadline,
    priority,
  });

  res.json(task);
};

// GET TASKS
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  task.title = req.body.title || task.title;
  task.deadline = req.body.deadline || task.deadline;
  task.priority = calculatePriority(task.deadline);

  await task.save();

  res.json(task);
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

// ✅ COMPLETE TASK (THIS WAS MISSING / WRONG)
export const completeTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  task.status = "completed";

  await task.save();

  res.json(task);
};

// EDIT TASK
export const editTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title || task.title;
  task.deadline = req.body.deadline || task.deadline;
  task.priority = calculatePriority(task.deadline);

  await task.save();

  res.json(task);
};

// STATS
export const getStats = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;

  res.json({
    total,
    completed,
    pending,
    completionRate: total ? (completed / total) * 100 : 0,
  });
};
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  deadline: Date,
  priority: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask,
  getStats,
  editTask
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);

// ✅ NEW EDIT ROUTE
router.put("/:id/edit", protect, editTask);

router.delete("/:id", protect, deleteTask);
router.patch("/:id/complete", protect, completeTask);
router.get("/stats", protect, getStats);

export default router;
const router = require("express").Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskController");
const { authenticateToken } = require("../helper/authMiddleware");
// Create a new task
router.post("/", authenticateToken, createTask);
// Get all tasks
router.get("/", authenticateToken, getAllTasks);
// Get a task by ID
router.get("/:id", authenticateToken, getTaskById);
// Update
router.put("/:id", authenticateToken, updateTaskById);
// Delete
router.delete("/:id", authenticateToken, deleteTaskById);

module.exports = router;

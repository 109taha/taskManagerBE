const router = require("express").Router();
const {
  createUser,
  loginUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const { authenticateToken } = require("../helper/authMiddleware");

// Register a new user
router.post("/register", createUser);
// Login user
router.post("/login", loginUser);
// Get user profile
router.get("/profile", authenticateToken, getUserById);
// Update user profile
router.put("/profile", authenticateToken, updateUser);

router.get("/users", (req, res) => {
  res.send("User route is working");
});

module.exports = router;

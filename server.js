const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./helper/databaseConnection");

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "https://task-manager-fe-five-zeta.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ Connect DB before handling routes (for Vercel functions)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection failed:", error);
    res.status(500).json({ message: "Database connection error" });
  }
});

// ✅ Test routes
app.get("/", (req, res) => {
  res.send("Task Management System Backend is running ✅");
});

app.post("/check", (req, res) => {
  console.log(req.body);
  res.json({ message: "POST received", data: req.body });
});

// ✅ Your routes
app.use("/user", require("./routes/userRoutes"));
app.use("/task", require("./routes/taskRoutes"));

// ❌ Do NOT use app.listen() — Vercel handles this
// app.listen(PORT, () => { ... });

// ✅ Instead, export the app for Vercel
module.exports = app;

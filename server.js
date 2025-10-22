const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./helper/databaseConnection");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: [
      "https://task-manager-fe-five-zeta.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Task Management System Backend is running");
});

app.use("/user", require("./routes/userRoutes"));
app.use("/task", require("./routes/taskRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});

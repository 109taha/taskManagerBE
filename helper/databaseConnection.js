const mongoose = require("mongoose");
const { attachDatabasePool } = require("@vercel/functions");

let isConnected = false; // Global connection flag

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    attachDatabasePool(conn.connection.getClient()); // 👈 Vercel optimization
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;

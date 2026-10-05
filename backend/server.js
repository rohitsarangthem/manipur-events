const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// MongoDB Connection
// ================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// ================================
// Authentication Routes
// ================================

app.use("/api/auth", authRoutes);

// Event routes
app.use("/api/events", eventRoutes);

// ================================
// Test Route
// ================================

app.get("/", (req, res) => {
  res.json({
    message: "Manipur Events API is running!"
  });
});

// ================================
// Start Server
// ================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
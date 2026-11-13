
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// MongoDB Connection
// Reuse the connection across requests
// ================================

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!global.mongooseConnectionPromise) {
    global.mongooseConnectionPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .catch((error) => {
        global.mongooseConnectionPromise = null;
        throw error;
      });
  }

  await global.mongooseConnectionPromise;
}

// Connect to MongoDB before handling API requests
app.use(async (req, res, next) => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(503).json({
      message: "Database connection failed",
    });
  }
});

// ================================
// API Routes
// ================================

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

// ================================
// Test Route
// ================================

app.get("/", (req, res) => {
  res.json({
    message: "Manipur Events API is running!",
  });
});

// ================================
// Not Found
// ================================

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// ================================
// Local Development Server
// Vercel handles the app automatically
// ================================

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export Express app for Vercel
module.exports = app;

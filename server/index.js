
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CineBook Backend API!"
  });
});

// Health Check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CineBook server is running successfully."
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CineBook Server running on port ${PORT}`);
});

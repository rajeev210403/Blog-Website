// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db"); // Connects to MongoDB
const authRoutes = require("./routes/authRoutes");
// const postRoutes = require("./routes/postRoutes");

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS) for frontend communication
app.use(cors());

// Define API routes
app.use("/api/auth", authRoutes);  // Authentication routes
// app.use("/api/posts", postRoutes); // Post-related routes

// Define server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
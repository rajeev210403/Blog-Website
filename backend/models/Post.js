const mongoose = require("mongoose");

// Define Post Schema
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Blog post title
  content: { type: String, required: true }, // Blog content
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  createdAt: { type: Date, default: Date.now }, // Auto-set timestamp
});

// Export Post Model
module.exports = mongoose.model("Post", PostSchema);

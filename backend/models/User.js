const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Unique email
  passwordHash: { type: String, required: true }, // Secure hashed password
});

// Export User Model
module.exports = mongoose.model("User", UserSchema);

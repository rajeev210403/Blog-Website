const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Route to handle user signup
router.post("/signup", signup);

// Route to handle user login
router.post("/login", login);

module.exports = router;

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User signup handler
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ email, passwordHash });
    await user.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error registering user", error });
  }
};

// User login handler
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "❌ Error logging in", error });
  }
};

const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1); // Exit process with failure
  }
};

// Call the function to connect
connectDB();

// Export mongoose instance
module.exports = mongoose;

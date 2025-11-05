const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Stop server if DB connection fails
    }
};

// Call MongoDB connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/student"));
app.use("/api/subjects", require("./routes/subject"));
app.use("/api/attendance", require("./routes/attendance"));

// Health Check Route (optional, useful for Render/Vercel)
app.get("/", (req, res) => {
    res.send("✅ Attendance App Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));

module.exports = app;

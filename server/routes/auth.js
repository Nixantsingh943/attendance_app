const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const exists = await Student.findOne({ email });
        if (exists) return res.status(400).json({ message: "User already exists" });

        const student = await Student.create({ name, email, password });

        res.status(201).json({
            _id: student._id,
            name: student.name,
            email: student.email,
            token: generateToken(student._id),
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Registration failed. Try again later." });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (student && (await student.matchPassword(password))) {
            res.json({
                _id: student._id,
                name: student.name,
                email: student.email,
                token: generateToken(student._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login failed. Try again later." });
    }
});

module.exports = router;

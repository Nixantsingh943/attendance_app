const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.get("/me", protect, async (req, res) => {
    try {
        res.json(req.student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

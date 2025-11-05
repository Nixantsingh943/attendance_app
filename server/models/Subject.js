const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        type: { type: String, enum: ["Class", "Lab"], default: "Class" },
        totalLabs: { type: Number, default: 0 }, // Only for lab subjects

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);

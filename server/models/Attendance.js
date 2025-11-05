const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    type: { type: String, enum: ["Class", "Lab"], default: "Class" },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent"], default: "Absent" },
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);

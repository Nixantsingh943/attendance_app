import { useState } from "react";
import API from "../api/api";
import SubjectSelect from "./SubjectSelect";
import "./MarkAttendance.css";

export default function MarkAttendance() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [statusMsg, setStatusMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleMark = async (attendanceStatus) => {
        if (!selectedSubject) {
            return alert("Please select a subject!");
        }

        try {
            setLoading(true);
            setStatusMsg("Marking attendance...");

            const res = await API.post("/attendance/mark", {
                subjectId: selectedSubject._id,
                type: selectedSubject.type, // lab or class
                status: attendanceStatus, // ✅ Present or Absent
            });

            setStatusMsg(res.data.message || "Attendance marked successfully!");
        } catch (err) {
            console.error("Error marking attendance:", err.response || err);
            setStatusMsg(err.response?.data?.message || "Failed to mark attendance");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mark-attendance-container">
            <h2> Mark Attendance</h2>
            <SubjectSelect onSelect={setSelectedSubject} />

            <div className="attendance-buttons">
                <button
                    className="btn-present"
                    disabled={loading}
                    onClick={() => handleMark("Present")}
                >
                    Mark Present
                </button>

                <button
                    className="btn-absent"
                    disabled={loading}
                    onClick={() => handleMark("Absent")}
                >
                    Mark Absent
                </button>
            </div>

            {statusMsg && (
                <p className={`status-message ${statusMsg.includes("successfully") ? "success" : "error"}`}>
                    {statusMsg}
                </p>
            )}
        </div>
    );
}

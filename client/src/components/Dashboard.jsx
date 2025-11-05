import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "./Navbar";
import MarkAttendance from "./MarkAttendance";
import AttendanceAnalytics from "./AttendanceAnalytics";
import "./Dashboard.css";

export default function Dashboard() {
    const [student, setStudent] = useState({});
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resStudent = await API.get("/students/me");
                setStudent(resStudent.data);

                const resSubjects = await API.get("/subjects");
                setSubjects(resSubjects.data);
            } catch (err) {
                console.error(err);
                alert("Session expired. Please login again.");
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <h2 className="welcome-text">🎉 Welcome, {student?.name || "Student"}!</h2>

                {/* Attendance marking section */}
                <section className="dashboard-section">
                    <MarkAttendance subjects={subjects} />
                </section>

                {/* Analytics section */}
                <section className="dashboard-section">
                    <AttendanceAnalytics />
                </section>
            </div>
        </>
    );
}

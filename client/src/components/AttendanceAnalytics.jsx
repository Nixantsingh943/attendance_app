import { useEffect, useState } from "react";
import API from "../api/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import "./AttendanceAnalytics.css";

export default function AttendanceAnalytics() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get("/attendance/stats");
                // Transform backend data into chart-friendly format
                const data = Object.entries(res.data).map(([subject, obj]) => ({
                    subject,
                    Present: obj.Present || 0,
                    Absent: obj.Absent || 0,
                }));
                setStats(data);
            } catch (err) {
                console.error("Error fetching analytics:", err);
            }
        };
        fetchStats();
    }, []);

    if (!stats.length) return null;

    // Calculate totals
    const totalPresent = stats.reduce((sum, s) => sum + s.Present, 0);
    const totalAbsent = stats.reduce((sum, s) => sum + s.Absent, 0);
    const total = totalPresent + totalAbsent;
    const percentage = total ? ((totalPresent / total) * 100).toFixed(1) : 0;

    return (
        <div className="attendance-analytics-container">
            <h3>Attendance Analytics</h3>
            <p className="attendance-summary">
                Overall Attendance: <strong>{percentage}% Present</strong>
            </p>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={stats}
                    margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Present" fill="#4caf50" name="Present" />
                    <Bar dataKey="Absent" fill="#f44336" name="Absent" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

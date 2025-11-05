import { useEffect, useState } from "react";
import API from "../api/api";
import "./AttendanceHistory.css";
import Navbar from "./Navbar";

export default function AttendanceHistory() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const res = await API.get("/attendance");
            setRecords(res.data);
        };
        fetchRecords();
    }, []);

    return (
        <div><Navbar />
        <div className="history-container">
            <h2>Attendance History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(r => (
                        <tr key={r._id}>
                            <td>{r.date}</td>
                            <td>{r.subject.name}</td>
                            <td>{r.type}</td>
                            <td>{r.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

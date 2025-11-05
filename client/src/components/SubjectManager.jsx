import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "./Navbar";
import "./SubjectManager.css";

export default function SubjectManager() {
    const [subjects, setSubjects] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("Class");

    // Fetch all subjects
    const fetchSubjects = async () => {
        try {
            const res = await API.get("/subjects");
            setSubjects(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch subjects.");
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    // Add a new subject
    const handleAddSubject = async () => {
        if (!name) return alert("Please enter a subject name.");
        try {
            await API.post("/subjects", { name, type });
            setName("");
            setType("Class");
            fetchSubjects(); // Refresh list
        } catch (err) {
            console.error(err);
            alert("Failed to add subject.");
        }
    };

    // Delete a subject
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this subject?")) return;
        try {
            await API.delete(`/subjects/${id}`);
            setSubjects(subjects.filter(s => s._id !== id)); // Remove from state
        } catch (err) {
            console.error(err);
            alert("Failed to delete subject.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="subject-manager-container">
                <h2>📚 Subject Manager</h2>

                {/* Add Subject Form */}
                <div className="subject-form">
                    <input
                        type="text"
                        placeholder="Subject Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Class">Class</option>
                        <option value="Lab">Lab</option>
                    </select>
                    <button onClick={handleAddSubject}>Add Subject</button>
                </div>

                {/* List of Subjects */}
                <div className="subject-list">
                    <h3>All Subjects</h3>
                    {subjects.length === 0 && <p>No subjects found.</p>}
                    {subjects.map((s) => (
                        <div key={s._id} className="subject-card">
                            <p><strong>{s.name}</strong> — {s.type}</p>
                            <button className="delete-btn" onClick={() => handleDelete(s._id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

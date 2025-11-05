import { useEffect, useState } from "react";
import API from "../api/api";
import "./SubjectSelect.css"; // optional CSS

export default function SubjectSelect({ onSelect }) {
    const [subjects, setSubjects] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await API.get("/subjects");
                setSubjects(res.data);
            } catch (err) {
                console.error("Failed to fetch subjects:", err);
            }
        };
        fetchSubjects();
    }, []);

    const handleChange = (e) => {
        setSelected(e.target.value);
        const subject = subjects.find(s => s._id === e.target.value);
        onSelect(subject);
    };

    return (
        <select value={selected} onChange={handleChange} className="neon-select">
            <option value="">Select Subject</option>
            {subjects.map(s => (
                <option key={s._id} value={s._id}>
                    {s.name} ({s.type})
                </option>
            ))}
        </select>
    );
}

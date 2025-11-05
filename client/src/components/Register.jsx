import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Register.css";

export default function Register() {
    const [student, setStudent] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleRegister = async () => {
        const { name, email, password } = student;
        if (!name || !email || !password) return alert("Please fill in all fields.");
        try {
            await API.post("/auth/register", student);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="con">
            <div className="form-container">
                <h2>Create an Account</h2>
                <input type="text" placeholder="Full Name" onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                <input type="email" placeholder="Email" onChange={(e) => setStudent({ ...student, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setStudent({ ...student, password: e.target.value })} />
                <button onClick={handleRegister}>Register</button>
                <p>Already have an account? <span onClick={() => navigate("/login")}>Login Here</span></p>
            </div>
        </div>
    );
}

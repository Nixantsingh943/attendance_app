import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Login.css";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="con">
            <div className="form-container">
                <h2>Login</h2>
                <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button onClick={handleLogin}>Login</button>
                <p>Don't have an account? <span onClick={() => navigate("/register")}>Register Now</span></p>
            </div>
        </div>
    );
}

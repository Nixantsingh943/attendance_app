import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="logo">Attendify</div>
            <ul className="nav-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/subjects">Subjects</Link></li> {/* New */}
                <li><Link to="/history">History</Link></li>
                {/* <li><Link to="/">Home</Link></li> */}
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
}

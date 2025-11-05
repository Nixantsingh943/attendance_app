import { Link } from "react-router-dom";
import "./Home.css";


export default function Home() {
    return (
        <div className="home-container">
            <div className="overlay"></div>
            <div className="home-content">
                <h1>Welcome to Attendify</h1>
                <p>Smart attendance. Zero chaos. 100% presence.</p>
                <div className="buttons">
                    <Link to="/login" className="btn primary">Student Login</Link>
                    <Link to="/register" className="btn secondary">Register</Link>
                </div>
            </div>
            <div className="circle c1"></div>
            <div className="circle c2"></div>
            <div className="circle c3"></div>
            <div className="circle c4"></div>
            <div className="circle c5"></div>
        </div>
    );
}

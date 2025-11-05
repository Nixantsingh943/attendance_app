import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AttendanceHistory from './components/AttendanceHistory';
import SubjectManager from './components/SubjectManager';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><AttendanceHistory /></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute><SubjectManager /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

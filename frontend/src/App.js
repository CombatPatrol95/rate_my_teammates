// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import ScoreForm from './components/ScoreForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Board />} />
                <Route
                    path="/score-form"
                    element={<ScoreForm setIsAdminLoggedIn={setIsAdminLoggedIn} />}
                />
                <Route
                    path="/admin-dashboard"
                    element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/score-form" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function ScoreForm({ setIsAdminLoggedIn }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        lastName: '',
        socialScore: 5,
        groupCollaborationScore: 5,
        courseNumber: '',
        comments: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    console.log('ScoreForm component rendered');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'socialScore' || name === 'groupCollaborationScore' 
                ? parseInt(value, 10) 
                : value
        });
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form:', formData);
        
        try {
            setError(null);
            const response = await axios.post('/user-submitted-data', formData);
            console.log('API response:', response.data);
            setSuccess(true);
            setFormData({
                lastName: '',
                socialScore: 5,
                groupCollaborationScore: 5,
                courseNumber: '',
                comments: ''
            });
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Failed to submit rating. Please try again later.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Attempting login:', loginData);
        
        try {
            setError(null);
            const response = await axios.post('/login', loginData);
            console.log('Login response:', response.data);
            
            // Store token
            localStorage.setItem('token', response.data.token);
            
            // Update auth state
            setIsAdminLoggedIn(true);
            
            // Redirect to admin dashboard
            navigate('/admin-dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError(null);
    };

    if (isLoginMode) {
        return (
            <div className="container mt-5">
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h2>Admin Login</h2>
                    </div>
                    <div className="card-body">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleLoginInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginInputChange}
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-link" onClick={toggleMode}>
                            Back to Rating Form
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>Submit Teammate Rating</h2>
                </div>
                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success" role="alert">
                            Rating submitted successfully! It will be reviewed by an administrator.
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Teammate's Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="courseNumber" className="form-label">Course Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="courseNumber"
                                name="courseNumber"
                                value={formData.courseNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="socialScore" className="form-label">
                                Social Score (1-10): {formData.socialScore}
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                id="socialScore"
                                name="socialScore"
                                min="1"
                                max="10"
                                value={formData.socialScore}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="groupCollaborationScore" className="form-label">
                                Group Collaboration Score (1-10): {formData.groupCollaborationScore}
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                id="groupCollaborationScore"
                                name="groupCollaborationScore"
                                min="1"
                                max="10"
                                value={formData.groupCollaborationScore}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comments" className="form-label">Comments</label>
                            <textarea
                                className="form-control"
                                id="comments"
                                name="comments"
                                rows="3"
                                value={formData.comments}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Submit Rating</button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <button className="btn btn-link" onClick={toggleMode}>
                        Admin Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ScoreForm;
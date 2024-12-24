import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm'; // Import the LoginForm component

function ScoreForm({ setIsAdminLoggedIn }) {
    const [lastName, setLastName] = useState('');
    // ... other state variables for form inputs

    const handleSubmit = async (event) => {
        event.preventDefault();
        // ... bot check validation

        try {
            const response = await axios.post('/api/user-submitted-data/', {
                lastName,
                // ... other form data
            });

            // Handle successful submission (e.g., show a success message, clear form)
            console.log('Data submitted successfully:', response.data);
        } catch (error) {
            // Handle error (e.g., display an error message)
            console.error('Error submitting data:', error);
        }
    };

    const handleAdminLogin = (isAdmin) => {
        setIsAdminLoggedIn(isAdmin);
    };

    return (
        <div className="container">
            <h2>Rate Your Teammate</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                {/* ... other input fields similarly */}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

            {/* Conditionally render LoginForm */}
            {!isAdminLoggedIn && <LoginForm onLogin={handleAdminLogin} />}
        </div>
    );
}

export default ScoreForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        axios.get('/api/user-submitted-data/') // Fetch all submitted data
            .then(res => setFormData(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleApproveData = (data) => {
        axios.post('/api/approved-data/', {
            ...data, // Include all the data fields
            originalDataId: data.id // Add the original data ID
        })
            .then(res => {
                // ... handle success (e.g., remove data from the table, update state)
                setFormData(formData.filter(item => item.id !== data.id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    {/* ... column headers for FormData */}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {formData.map(data => (
                    <tr key={data.id}>
                        {/* ... display FormData fields */}
                        <td>
                            <button
                                className="btn btn-success"
                                onClick={() => handleApproveData(data)}
                            >
                                Approve
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
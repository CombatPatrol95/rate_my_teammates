import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

function AdminDashboard() {
    const [pendingRatings, setPendingRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('AdminDashboard component rendered');

    useEffect(() => {
        const fetchPendingRatings = async () => {
            console.log('Fetching pending ratings...');
            try {
                // Add token to request
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                setLoading(true);
                console.log('Calling API: /admin/pending-ratings');
                const response = await axios.get('/admin/pending-ratings', config);
                console.log('API response:', response.data);
                setPendingRatings(response.data);
            } catch (err) {
                console.error('Error fetching pending ratings:', err);
                setError('Failed to load pending ratings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPendingRatings();

        // Cleanup function
        return () => {
            console.log('AdminDashboard component unmounting');
        };
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            await axios.put(`/admin/approve-rating/${id}`, {}, config);
            // Remove the approved rating from the list
            setPendingRatings(pendingRatings.filter(rating => rating.id !== id));
        } catch (err) {
            console.error('Error approving rating:', err);
            setError('Failed to approve rating. Please try again.');
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            await axios.delete(`/admin/reject-rating/${id}`, config);
            // Remove the rejected rating from the list
            setPendingRatings(pendingRatings.filter(rating => rating.id !== id));
        } catch (err) {
            console.error('Error rejecting rating:', err);
            setError('Failed to reject rating. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Admin Dashboard</h1>
            <h2 className="mb-3">Pending Ratings</h2>
            
            {pendingRatings.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    No pending ratings to review.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Last Name</th>
                                <th>Social Score</th>
                                <th>Group Collaboration Score</th>
                                <th>Course Number</th>
                                <th>Comments</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRatings.map(rating => (
                                <tr key={rating.id}>
                                    <td>{rating.lastName}</td>
                                    <td>{rating.socialScore}</td>
                                    <td>{rating.groupCollaborationScore}</td>
                                    <td>{rating.courseNumber}</td>
                                    <td>{rating.comments}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleApprove(rating.id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleReject(rating.id)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
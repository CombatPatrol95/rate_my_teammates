import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

function Board() {
    const [teammates, setTeammates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('Board component rendered');

    useEffect(() => {
        const fetchTeammates = async () => {
            console.log('Fetching teammates...');
            try {
                setLoading(true);
                console.log('Calling API: /approved-data');
                const response = await axios.get('/approved-data');
                console.log('API response:', response.data);
                setTeammates(response.data);
            } catch (err) {
                console.error('Error fetching teammates:', err);
                setError('Failed to load teammate ratings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeammates();

        // Cleanup function
        return () => {
            console.log('Board component unmounting');
        };
    }, []);

    console.log('Component state:', { loading, error, teammatesCount: teammates.length });

    if (loading) {
        console.log('Rendering loading state');
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
        console.log('Rendering error state:', error);
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    console.log('Rendering teammates table');
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Teammate Scores</h1>
            {teammates.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    No approved ratings available yet.
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
                            </tr>
                        </thead>
                        <tbody>
                            {teammates.map(teammate => (
                                <tr key={teammate.id}>
                                    <td>{teammate.lastName}</td>
                                    <td>{teammate.socialScore}</td>
                                    <td>{teammate.groupCollaborationScore}</td>
                                    <td>{teammate.courseNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Board;
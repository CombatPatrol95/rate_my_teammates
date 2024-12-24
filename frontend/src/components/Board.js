import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

function Board() {
    const [teammates, setTeammates] = useState([]);

    useEffect(() => {
        axios.get('/api/approved-data/') // Fetch approved data from backend
            .then(res => setTeammates(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1>Teammate Scores</h1>
            <table className="table table-striped">
                <thead>
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
    );
}

export default Board;
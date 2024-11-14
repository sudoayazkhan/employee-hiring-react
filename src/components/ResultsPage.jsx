import React, { useEffect, useState } from 'react';
import './ResultsPage.css';

function ResultsPage({ onBack }) {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await fetch('http://localhost:5000/api/applications');
            const data = await response.json();
            setApplications(data);
        };
        fetchApplications();
    }, []);

    return (
        <div className="results-page">
            <h2>Applications</h2>
            <div className="applications-table">
                <div className="table-header">
                    <div>Forename</div>
                    <div>Surname</div>
                    <div>Decision</div>
                </div>
                <div className="table-body">
                    {applications.map((app, index) => (
                        <div className="table-row" key={index}>
                            <div>{app.forename}</div>
                            <div>{app.surname}</div>
                            <div>{app.decision}</div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="back-button" onClick={onBack}>Back</button>
        </div>
    );
}

export default ResultsPage;

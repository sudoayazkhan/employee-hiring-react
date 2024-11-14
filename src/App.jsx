import React, { useState } from 'react';
import ApplicationForm from './components/ApplicationForm';
import ResultsPage from './components/ResultsPage';

function App() {
    const [showResultsPage, setShowResultsPage] = useState(false);

    const handleFormSubmission = () => {
        setShowResultsPage(true);  
    };

    const handleBackClick = () => {
        setShowResultsPage(false);  
    };

    return (
        <div>
            <h1 style={{textAlign:"center"}}>Employee Hiring Application</h1>
            {!showResultsPage ? (
                <ApplicationForm onSubmit={handleFormSubmission} />
            ) : (
                <ResultsPage onBack={handleBackClick} />
            )}
        </div>
    );
}

export default App;

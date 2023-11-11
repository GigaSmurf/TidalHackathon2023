// components/ResultComponent.js
import React from 'react';

const ResultComponent = ({ answers }) => {
    return (
        <div>
            <h2>Results</h2>
            {/* Render your results based on answers */}
            <pre>{JSON.stringify(answers, null, 2)}</pre>
        </div>
    );
};

export default ResultComponent;

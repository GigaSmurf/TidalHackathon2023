// components/ResultComponent.js
import React from 'react';
import '../styles/Resultscomponent.css';  // Make sure the path is correct

const resources = [
    {
        title: "Understanding Algebra",
        description: "A comprehensive guide to mastering algebra.",
        link: "https://www.youtube.com/watch?v=kIq5CZlg8Rg",
        imageUrl: "https://placekitten.com/200/200"  // Replace with actual image URLs
    },
    {
        title: "Effective Study Techniques",
        description: "Tips on how to study effectively.",
        link: "https://www.example.com/study-tips",
        imageUrl: "https://placekitten.com/201/200"
    },
    // Add more resources...
];

const ResultComponent = ({ answers }) => {

    const getRecommendations = (score) => {
        let recommendation;

        switch (score) {
            case 0:
                recommendation = "It looks like you're facing some challenges. Here are some resources to help you improve.";
                break;
            case 1:
                recommendation = "You're making progress, but there's room for improvement. Consider these tips.";
                break;
            case 2:
                recommendation = "You're doing well, but you can still enhance your skills with these resources.";
                break;
            case 3:
                recommendation = "Great job! Keep up the good work. Here are some advanced resources.";
                break;
            default:
                recommendation = "Here's some general advice to help you in your studies.";
                break;
        }

        return recommendation;
    };


    const scoreToWidth = {
        0: 'indicator-0',
        1: 'indicator-1',
        2: 'indicator-2',
        3: 'indicator-3',
    };

    const recommendation = getRecommendations(answers);
    const indicatorWidthClass = scoreToWidth[answers];

    return (
        <div className="result-container">
            <h2>Results</h2>
            <div className="recommendations">
                <div className="recommendation-indicator">
                    <div className={`recommendation-indicator-inner ${indicatorWidthClass}`}></div>
                </div>
                <p>Level: {answers}</p>
                <p>{recommendation}</p>
            </div>


            <div className="resource-section">
                <h3>Additional Resources:</h3>
                <div className="resource-cards">
                    {resources.map((resource, index) => (
                        <div key={index} className="resource-card">
                            <img src={resource.imageUrl} alt={resource.title} />
                            <h4>{resource.title}</h4>
                            <p>{resource.description}</p>
                            <a href={resource.link} target="_blank" rel="noopener noreferrer">Learn More</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResultComponent;

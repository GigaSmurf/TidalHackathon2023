// components/HomePage.js
import React, { useState, useEffect } from 'react';
import Slideshow from './Slideshow';
import ResultComponent from './ResultComponent';
import '../styles/HomePage.css';

const HomePage = () => {
    const [message, setMessage] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);


    const handleFinish = async (finalAnswers) => {
        try {
            const response = await fetch('http://10.228.76.76:5000/api/getResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalAnswers),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setScore(data.message);
            setIsFinished(true);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setIsFinished(true);
        }
    };
    

    function convertToNumeric(data) {
        const numericFields = ['age', 'Medu', 'Fedu', 'traveltime', 'studytime', 'failures', 'famrel', 'freetime', 'goout', 'Dalc', 'Walc', 'health', 'absences'];
    
        let convertedData = {};
    
        for (const key in data) {
            if (numericFields.includes(key) && !isNaN(parseInt(data[key]))) {
                convertedData[key] = parseInt(data[key], 10);
            } else {
                convertedData[key] = data[key];
            }
        }
    
        return convertedData;
    }

    return (
        <div className="homepage animate-fade-in">
            <h1>Welcome to the Learnalytics Platform</h1>
            {!isFinished ? (
                <Slideshow onFinish={handleFinish} />
            ) : (
                <ResultComponent answers={score} />
            )}
        </div>
    );
};

export default HomePage;

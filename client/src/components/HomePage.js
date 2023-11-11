// components/HomePage.js
import React, { useState, useEffect } from 'react';
import Slideshow from './Slideshow';
import ResultComponent from './ResultComponent';
import '../styles/HomePage.css';

const HomePage = () => {
    const [message, setMessage] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        fetch('http://127.0.0.1:5000/hello')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleFinish = (finalAnswers) => {
        setAnswers(finalAnswers);
        setIsFinished(true);
    };

    return (
        <div className="homepage animate-fade-in">
            <h1>Welcome to the Learnalytics Platform</h1>
            <p>Message from the server: {message}</p>
            {!isFinished ? (
                <Slideshow onFinish={handleFinish} />
            ) : (
                <ResultComponent answers={answers} />
            )}
        </div>
    );
};

export default HomePage;

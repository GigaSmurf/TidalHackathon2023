// components/HomePage.js
import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css'; // Importing CSS

const HomePage = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({ age: '', subject: '', learningStyle: '' });

    useEffect(() => {
        fetch('http://127.0.0.1:5000/hello')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // You can replace this with logic to handle the form data
    };

    return (
        <div className="homepage">
            <h1>Welcome to the Learnalytics Platform</h1>
            <p>Message from the server: {message}</p>

            <form onSubmit={handleSubmit} className="input-form">
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                </label>
                <label>
                    Favorite Subject:
                    <select name="subject" value={formData.subject} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="math">Math</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                    </select>
                </label>
                <label>
                    Preferred Learning Style:
                    <input type="text" name="learningStyle" value={formData.learningStyle} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default HomePage;

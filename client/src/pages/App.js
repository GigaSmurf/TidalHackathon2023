import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/hello')  // Adjust the URL/port based on your Flask server
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);  // The empty array ensures this effect runs only once after the component mounts

  return (
    <div>
      <p>Message from the server: {message}</p>
    </div>
  );
}

export default App;

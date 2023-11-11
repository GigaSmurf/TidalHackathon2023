import React, { useEffect, useState } from 'react';
import './styles/App.css';
import HomePage from './components/HomePage';
import CanvasAnimation from './components/CanvasAnimation';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 4000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showAnimation ? <CanvasAnimation width={window.innerWidth} height={window.innerHeight} /> : <HomePage />}
    </div>
  );
}

export default App;

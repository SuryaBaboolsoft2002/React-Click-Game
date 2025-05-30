// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Help from './pages/Help';
import TopScores from './pages/TopScores';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (!savedName) {
      const inputName = prompt('Enter your name to start:');
      if (inputName) {
        setUsername(inputName);
        localStorage.setItem('username', inputName);
      }
    } else {
      setUsername(savedName);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          {username && <div className="username-box">{username}</div>}
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/help" element={<Help />} />
          <Route path="/top-scores" element={<TopScores />} />
        </Routes>

        <footer className="app-footer">⚖️ Weight Match Game</footer>
      </div>
    </Router>
  );
}

export default App;

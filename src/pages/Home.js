// Home.js
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className='fade-in'>Click Lifter ⬆️</h1>
      <p className='fade-in'>Lift the rock by clicking the mouse repeatedly and dont let the rock fall below.</p>
      
      <div className="button-group fade-in">
        <button onClick={() => navigate('/game')}>Start Game</button>
        <button onClick={() => navigate('/help')}>Help</button>
        <button onClick={() => navigate('/top-scores')}>Top Scores</button>
      </div>
    </div>
  );
}

export default Home;

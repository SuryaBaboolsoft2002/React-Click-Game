// TopScores.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './topscore.css';

function TopScores() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('topScores')) || [];
    setScores(savedScores);
  }, []);

  return (
    <div className="top-score-container">
      
      <h1>🏆 Top Scores</h1>

      {scores.length === 0 ? (
        <p>No scores yet. Play the game to get started!</p>
      ) : (
        <div className="score-scroll-container">
          <table className="score-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Time (s)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{score.name}</td>
                  <td>{score.points}</td>
                  <td>{score.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
    </div>
  );
}

export default TopScores;

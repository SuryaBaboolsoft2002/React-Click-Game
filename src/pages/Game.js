// Game.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './game.css';

function Game() {
  const [rockY, setRockY] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false); // prevent double-save

  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);
  const fallRef = useRef(null);
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'Anonymous';

  // Main Game Logic
  useEffect(() => {
    if (isGameOver) return;

    fallRef.current = setInterval(() => {
      setRockY((prevY) => {
        const maxY = window.innerHeight - 150;
        if (prevY >= maxY) {
          clearInterval(timerRef.current);
          clearInterval(fallRef.current);
          setIsGameOver(true);
          return maxY;
        }
        return prevY + 2;
      });
    }, 50);

    timerRef.current = setInterval(() => {
      setTimeAlive((t) => t + 0.05);
    }, 50);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(fallRef.current);
    };
  }, [isGameOver]);

  // Save score only once
  useEffect(() => {
    if (isGameOver && !scoreSaved) {
      const newScore = {
        name: username,
        points: parseFloat(timeAlive.toFixed(2)),
        date: new Date().toLocaleString(),
      };

      const existingScores = JSON.parse(localStorage.getItem('topScores')) || [];
      existingScores.push(newScore);
      existingScores.sort((a, b) => b.points - a.points);
      const top20 = existingScores.slice(0, 20);
      localStorage.setItem('topScores', JSON.stringify(top20));
      setScoreSaved(true);
    }
  }, [isGameOver, scoreSaved, timeAlive, username]);

  const handleGameClick = () => {
    if (isGameOver) return;
    setRockY((prevY) => Math.max(prevY - 10, 0));
  };

  const retryGame = () => {
    setRockY(0);
    setIsGameOver(false);
    setTimeAlive(0);
    setScoreSaved(false);
  };

  return (
    <div className="game-area" onClick={handleGameClick} ref={gameAreaRef}>
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <div className="timer">⏱️ {timeAlive.toFixed(2)}s</div>
        <button className="top-scores-btn" onClick={() => navigate('/top-scores')}>
          🏆 Top Scores
        </button>
      </div>

      <div className="rock" style={{ top: `${rockY}px` }}>🪨</div>
      <div className="ground-line" />

      {isGameOver && (
        <div className="game-over-message">
          <h3>💥 Rock Dropped!</h3>
          <p>You kept it up for {timeAlive.toFixed(2)} seconds.</p>
          <button onClick={retryGame} className="retry-btn">🔄 Retry</button>
        </div>
      )}
    </div>
  );
}

export default Game;

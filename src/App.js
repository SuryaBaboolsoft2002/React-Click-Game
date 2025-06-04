"use client"

import { useState, useEffect } from "react"
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"

// Game Component
function ClickGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameActive, setGameActive] = useState(false)
  const [highScore, setHighScore] = useState(Number.parseInt(localStorage.getItem("clickGameHighScore")) || 0)

  useEffect(() => {
    let interval = null
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameActive(false)
      if (score > highScore) {
        setHighScore(score)
        localStorage.setItem("clickGameHighScore", score.toString())
      }
    }
    return () => clearInterval(interval)
  }, [gameActive, timeLeft, score, highScore])

  const startGame = () => {
    setScore(0)
    setTimeLeft(10)
    setGameActive(true)
  }

  const handleClick = () => {
    if (gameActive) {
      setScore(score + 1)
    }
  }

  const resetHighScore = () => {
    setHighScore(0)
    localStorage.removeItem("clickGameHighScore")
  }

  return (
    <div className="game-container">
      <h1>React Click Game</h1>
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{timeLeft}s</span>
        </div>
        <div className="stat">
          <span className="stat-label">High Score:</span>
          <span className="stat-value">{highScore}</span>
        </div>
      </div>

      <div className="game-area">
        {!gameActive && timeLeft === 10 ? (
          <button className="start-btn" onClick={startGame}>
            Start Game
          </button>
        ) : !gameActive && timeLeft === 0 ? (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            {score === highScore && score > 0 && <p className="new-record">🎉 New High Score! 🎉</p>}
            <button className="start-btn" onClick={startGame}>
              Play Again
            </button>
          </div>
        ) : (
          <button className="click-btn" onClick={handleClick}>
            Click Me!
          </button>
        )}
      </div>

      <div className="controls">
        <button className="reset-btn" onClick={resetHighScore}>
          Reset High Score
        </button>
      </div>
    </div>
  )
}

// Home Component
function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to React Click Game</h1>
      <p>Test your clicking speed in this fun and addictive game!</p>
      <div className="home-content">
        <h2>How to Play:</h2>
        <ul>
          <li>Click the "Start Game" button to begin</li>
          <li>Click the "Click Me!" button as many times as possible</li>
          <li>You have 10 seconds to get the highest score</li>
          <li>Try to beat your high score!</li>
        </ul>
        <Link to="/game" className="play-link">
          <button className="start-btn">Play Now</button>
        </Link>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/game" className="nav-link">
            Game
          </Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<ClickGame />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

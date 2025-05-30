// Help.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Help() {
   const navigate = useNavigate();
  return (
    <div className="help-container">
    
      <h1>How to Play</h1>
      <ul>
        <li>A Rock will fall from the top screen.</li>
        <li>Repeatedly press the mouse click button to make the rock stay on top without falling.</li>
        <li>The longer the time you press buttons the longer the score time goes up.</li>
        <li>Balance perfectly to score high!</li>
      </ul>
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
    </div>
    
  );
}

export default Help;

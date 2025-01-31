import React, { useState, useEffect } from 'react';

const Results = ({ score }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const updatedLeaderboard = [...storedLeaderboard, score].sort((a, b) => b - a);
    const topScores = updatedLeaderboard.slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(topScores));
    setLeaderboard(topScores);
  }, [score]);

  return (
    <div className="results">
      <h2>Quiz Completed!</h2>
      <p>Your score is: {score}</p>

      <h3>Leaderboard</h3>
      <ol>
        {leaderboard.map((score, index) => (
          <li key={index}>Score {index + 1}: {score}</li>
        ))}
      </ol>

      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
};

export default Results;
